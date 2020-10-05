<template>
<div class="container">
  <NavbarMensagem :mensagens="this.mensagens"/>
  <h3>Inbox</h3>
  <table v-if="mensagens.length" class="highlight responsive-table" >
    <thead>
      <th>Remetente</th>
      <th>Mensagem</th>
      <th>Sinalizadores</th>
      <th>Data e hora</th>
      <th></th>
    </thead>
    <tbody>
      <tr v-for="(mensagem, index) in reversedMensagens" :key="index">
        <td class="username"><strong>{{ mensagem.envio.remetente.username }}</strong></td>
        <td class="text left-align"><a class="links" v-on:click="abreMensagem(mensagem)"><strong>{{ mensagem.assunto }}</strong></a></td>
        <td class="right-align"><small> <span v-if="mensagem.spam === true">SPAM </span> <span v-if="mensagem.edicao === true">EDITADA </span>  <span v-if="mensagem.visualizada === true">VISUALIZADA</span></small></td>
        <td class="right-align">{{formataDataHora(mensagem.envio.dataHoraEnvio)}}</td>
        <td>
          <a class="links" @click="naoImpl()"><i class="material-icons tiny">edit</i></a>
          <a class="links" @click="naoImpl()"><i class="material-icons tiny">delete</i></a>
        </td>
      </tr>
    </tbody>
  </table>
  <span v-else>Você ainda não recebeu nenhuma mensagem :(</span>
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
    mensagens: []
  }),
  mounted () {
    M.AutoInit()
  },
  computed: {
    ...mapState('auth', ['usuario']),
    reversedMensagens: function () {
      return [...this.mensagens].reverse()
    }
  },
  created: function () {
    console.log(this.usuario.username)
    this.$http.get(`mensagem/destinatario/${this.usuario.id}`).then(res => {
      console.log(res.data)
      this.mensagens = res.data
    }).catch(err => {
      console.log(err)
    })
  },
  methods: {
    abreMensagem (mensagem) {
      if (mensagem.visualizada === false) {
        mensagem.visualizada = true
        M.toast({ html: 'Mensagem visualizada!' })

        this.$http.put(`mensagem/${mensagem.id}`, mensagem).catch(err => {
          console.log(err)
        })
      }

      this.$router.push({ name: 'mensagem', params: { id: mensagem.id, mensagem: mensagem, from: this.$route.name } }).catch(() => { })
    },

    formataDataHora (data) {
      const dataFormatada = new Date(data)
      return `${dataFormatada.getUTCDate()}/${dataFormatada.getUTCMonth()}/${dataFormatada.getUTCFullYear()} às ${dataFormatada.getUTCHours()}:${String(dataFormatada.getUTCMinutes()).padStart(2, '0')}`
    },

    naoImpl () {
      M.toast({ html: 'Isso ainda não foi implementado :(' })
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

.links {
  color: #26a69a;
  cursor: pointer;
}
</style>
