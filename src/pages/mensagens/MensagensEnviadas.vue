<template>
<div class="container">
  <NavbarMensagem :mensagens="this.mensagens"/>
  <h3>Enviadas</h3>
  <table v-if="mensagens.length" class="highlight responsive-table">
    <thead>
      <th>Destinatário</th>
      <th>Mensagem</th>
      <th>Sinalizadores</th>
      <th>Data e hora</th>
      <th></th>
    </thead>
    <tbody>
      <tr v-for="mensagem in reversedMensagens" :key="mensagem.id">
        <td class="username"><strong>{{ mensagem.envio.destinatario.username }}</strong></td>

       <td class="text left-align"><a class="link" v-on:click="abrirMensagem(mensagem)"><strong>{{ mensagem.assunto }}</strong></a></td>

        <td class="right-align"><small> <span v-if="mensagem.spam === true">SPAM </span> <span v-if="mensagem.edicao === true">EDITADA </span>  <span v-if="mensagem.visualizada === true">VISUALIZADA</span></small></td>
        <td class="right-align">{{formataDataHora(mensagem.envio.dataHoraEnvio)}}</td>
        <td></td>
      </tr>
    </tbody>
  </table>
  <span v-else>Você ainda não enviou nenhuma mensagem :(</span>
</div>
</template>

<script>
import { mapState } from 'vuex'
import NavbarMensagem from './NavbarMensagem'

export default {
  name: 'MensagensEnviadas',
  components: {
    NavbarMensagem
  },
  data: () => ({
    mensagens: []
  }),
  computed: {
    ...mapState('auth', ['usuario']),
    reversedMensagens: function () {
      return [...this.mensagens].reverse()
    }
  },
  created: function () {
    this.$http.get(`mensagem/remetente/${this.usuario.id}`).then(res => {
      this.mensagens = res.data
    }).catch(err => {
      console.log(err)
    })
  },
  methods: {
    abrirMensagem (mensagem) {
      this.$router.push({ name: 'mensagem', params: { id: mensagem.id, mensagem: mensagem, from: this.$route.name } }).catch(() => { })
    },

    formataDataHora (data) {
      const dataFormatada = new Date(data)
      return `${dataFormatada.getUTCDate()}/${dataFormatada.getUTCMonth()}/${dataFormatada.getUTCFullYear()} às ${dataFormatada.getUTCHours()}:${String(dataFormatada.getUTCMinutes()).padStart(2, '0')}`
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
