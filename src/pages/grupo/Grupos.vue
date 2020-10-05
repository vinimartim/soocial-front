<template>
  <div class="container">
    <!-- Modal Structure -->
    <div id="modal1" class="modal">
      <div v-if="loadingGrupo" class="progress">
          <div class="indeterminate"></div>
      </div>
      <div class="modal-content">
        <form @submit.prevent="submit()">
          <input type="hidden" v-model="this.usuario.id">
          <div class="input-field">
            <input type="text" placeholder="Nome" v-model="grupo.nome">
          </div>
          <div class="input-field">
            <textarea class="materialize-textarea" type="text" placeholder="Descrição" v-model="grupo.descricao"></textarea>
          </div>
          <div class="input-field">
            <input class="materialize-textarea" type="text" placeholder="Privacidade" v-model="grupo.privacidade">
          </div>
          <div class="input-field">
            <input class="materialize-textarea" type="text" placeholder="Categoria" v-model="grupo.categoria">
          </div>
          <button :disabled="botaoAtivo" class="btn waves-effect waves-light " type="submit">Enviar
            <i class="material-icons right">send</i>
          </button>
        </form>
      </div>
    </div>
    <h3>Grupos de {{ usuario.username }} <a class="btn-floating waves-effect waves-light modal-trigger" href="#modal1"><i class="material-icons">add</i></a></h3>
    <h4>Dono</h4>
    <table v-if="gruposDono.length" class="highlight responsive-table">
      <thead>
        <th>Nome</th>
      </thead>
      <tbody>
        <tr v-for="grupo in gruposDono" :key="grupo.id">
          <td class="username"><a  @click="abreGrupo(grupo)"><strong>{{ grupo.nome }}</strong></a></td>
        </tr>
      </tbody>
    </table>
    <span v-else>Você ainda não criou nenhum :(</span>

    <h4>Membro</h4>
    <table v-if="gruposMembro.length" class="highlight responsive-table">
      <thead>
        <th>Nome</th>
      </thead>
      <tbody>
        <tr v-for="grupo in gruposMembro" :key="grupo.id">
          <td class="username"><a  @click="abreGrupo(grupo)"><strong>{{ grupo.nome }}</strong></a></td>
        </tr>
      </tbody>
    </table>
    <span v-else>Você ainda não entrou em nenhum grupo :(</span>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import M from 'materialize-css'

export default {
  name: 'Grupos',
  data: () => ({
    gruposDono: [],
    gruposMembro: [],
    grupo: {
      nome: '',
      descricao: '',
      privacidade: '',
      categoria: '',
      dono: {
        id: ''
      },
      adiministradores: [],
      membros: []
    },
    loadingGrupo: false,
    botaoAtivo: false
  }),
  computed: {
    ...mapState('auth', ['usuario'])
  },
  mounted () {
    M.AutoInit()
  },
  created: function () {
    this.$http.get(`grupo/dono/${this.usuario.id}`).then(res => {
      res.data.map(grupo => {
        this.gruposDono.push(grupo)
      })
    })
    this.$http.get(`grupo/membro/${this.usuario.id}`).then(res => {
      res.data.map(grupo => {
        this.gruposMembro.push(grupo)
      })
    })
  },
  methods: {
    abreGrupo (grupo) {
      this.$router.push({ name: 'grupo', params: { id: grupo.id, grupo: grupo } }).catch(() => {})
    },
    submit () {
      var elem = document.getElementById('modal1')
      var instance = M.Modal.getInstance(elem)

      this.botaoAtivo = true
      this.loadingGrupo = true
      const dadosGrupo = {
        nome: this.grupo.nome,
        descricao: this.grupo.descricao,
        privacidade: this.grupo.privacidade,
        categoria: this.grupo.categoria,
        dono: {
          id: this.usuario.id
        },
        membros: [
          {
            id: this.usuario.id
          }
        ]
      }
      console.log(dadosGrupo)
      this.$http.post('grupo', dadosGrupo).then(res => {
        this.gruposDono.push(res.data)
        this.gruposMembro.push(res.data)
        M.toast({ html: 'Grupo criado!' })
        instance.close()
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>

</style>
