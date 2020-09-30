<template>
<div class="container">
  <NavbarMensagem :envios="this.envios"/>
  <h3>Enviadas</h3>
  <table class="highlight responsive-table">
    <thead>
      <th>Destinatário</th>
      <th>Mensagem</th>
      <th>Sinalizadores</th>
      <th>Data e hora</th>
      <th></th>
    </thead>
    <tbody>
      <tr v-for="envio in envios" :key="envio.mensagem.id">
        <td class="username"><strong>{{ envio.destinatario.nome }}</strong></td>

       <td class="text left-align"><a class="link" v-on:click="abrirMensagem(envio)"><strong>{{ envio.mensagem.assunto }}</strong> {{ envio.mensagem.conteudo }}</a></td>

        <td class="right-align"><small> <span v-if="envio.mensagem.spam === true">SPAM | </span> <span v-if="envio.mensagem.edicao === true">EDITADA | </span>  <span v-if="envio.mensagem.visualizada === true">VISUALIZADA</span></small></td>
        <td class="right-align">{{formataDataHora(envio.dataHoraEnvio)}}</td>
        <td></td>
      </tr>
    </tbody>
  </table>
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
    envios: []
  }),
  computed: {
    ...mapState('auth', ['usuario'])
  },
  created: function () {
    this.$http.get(`envio/mensagens/remetente/${this.usuario.id}`).then(res => {
      res.data.map(envio => {
        this.envios.push(envio)
      })
      this.envios.reverse()
    }).catch(err => {
      console.log(err)
    })
  },
  methods: {
    abrirMensagem (envio) {
      this.$router.push({ name: 'mensagem', params: { id: envio.mensagem.id, mensagem: { envio }, from: this.$route.name } }).catch(() => { })
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
