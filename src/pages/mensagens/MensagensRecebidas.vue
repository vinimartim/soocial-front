<template>
<div class="container">
  <NavbarMensagem :envios="this.envios"/>
  <h3>Inbox</h3>
  <table class="highlight responsive-table" >
    <thead>
      <th>Remetente</th>
      <th>Mensagem</th>
      <th>Sinalizadores</th>
      <th>Data e hora</th>
      <th></th>
    </thead>
    <tbody>
      <tr v-for="(envio, index) in envios" :key="index">
        <td class="username"><strong>{{ envio.remetente.nome }}</strong></td>
        <td class="text left-align"><a class="link" v-on:click="abreMensagem(envio)"><strong>{{ envio.mensagem.assunto }}</strong> {{ envio.mensagem.conteudo }}</a></td>
        <td class="right-align"><small> <span v-if="envio.mensagem.spam === true">SPAM | </span> <span v-if="envio.mensagem.edicao === true">EDITADA | </span>  <span v-if="envio.mensagem.visualizada === true">VISUALIZADA</span></small></td>
        <td class="right-align">{{formataDataHora(envio.dataHoraEnvio)}}</td>
        <td>
          <a class="link" @click="editar()"><i class="material-icons">edit</i></a>
          <a class="link" @click="remover(envio.mensagem.id, index)"><i class="material-icons">delete</i></a>
        </td>
      </tr>
    </tbody>
  </table>
</div>
</template>

<script>
import { mapState } from 'vuex'
import NavbarMensagem from './NavbarMensagem'
import M from 'materialize-css'

export default {
  name: 'Mensagens',
  components: {
    NavbarMensagem
  },
  data: () => ({
    envios: []
  }),
  mounted () {
    M.AutoInit()
  },
  computed: {
    ...mapState('auth', ['usuario'])
  },
  created: function () {
    this.$http.get(`envio/mensagens/destinatario/${this.usuario.id}`).then(res => {
      res.data.map(envio => {
        this.envios.push(envio)
      })
      this.envios.reverse()
    }).catch(err => {
      console.log(err)
    })
  },
  methods: {
    abreMensagem (envio) {
      if (envio.mensagem.visualizada === false) {
        envio.mensagem.visualizada = true
        M.toast({ html: 'Mensagem visualizada!' })

        this.$http.put(`mensagem/${envio.mensagem.id}`, envio.mensagem).catch(err => {
          console.log(err)
        })
      }

      this.$router.push({ name: 'mensagem', params: { id: envio.mensagem.id, mensagem: { envio }, from: this.$route.name } }).catch(() => { })
    },

    formataDataHora (data) {
      const dataFormatada = new Date(data)
      return `${dataFormatada.getUTCDate()}/${dataFormatada.getUTCMonth()}/${dataFormatada.getUTCFullYear()} às ${dataFormatada.getUTCHours()}:${String(dataFormatada.getUTCMinutes()).padStart(2, '0')}`
    },

    editar () {
      alert('TODO')
    },

    remover (id, index) {
      console.log(id, index)
      this.$http.delete(`mensagem/${id}`).then(res => {
        this.envios.splice(index, 1)
        M.toast({ html: 'Mensagem removida!' })
      }).catch(err => {
        M.toast({ html: err.data.mensagem })
      })
    }
  }
}
</script>

<style scoped>
.text {
  white-space: nowrap;
  overflow: hidden;
  width: 700px;
  text-overflow: ellipsis;
  display: inline-block
}

.username {
  max-width: 100px;
}

.link {
  cursor: pointer;
}
</style>
