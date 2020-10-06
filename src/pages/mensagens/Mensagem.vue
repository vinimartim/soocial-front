<template>
  <div class="container">
    <NavbarMensagem />
    <h4>{{ mensagem.assunto }}</h4>

    <router-link v-if="from === 'recebidas'" :to="{ name: 'recebidas' }" key="recebidas">Voltar</router-link>
    <router-link v-else :to="{ name: 'enviadas' }" key="enviadas" value="">Voltar</router-link><br>
    <div class="card">
      <div class="card-content">
        <small>Enviada por: {{ mensagem.envio.remetente.username }} em {{ formataDataHora(mensagem.envio.dataHoraEnvio) }}</small>
        <p>{{ mensagem.conteudo }}</p>
        <img class="responsive-img mt1" v-if="mensagem.anexo" :src="mensagem.anexo.path">
      </div>
      <div class="card-action">
        <a><i class="material-icons tiny">delete</i></a>
        <a><i class="material-icons tiny">edit</i></a>
        <span class="new badge red" v-show="mensagem.spam === true" data-badge-caption="">SPAM</span>
        <span class="new badge" v-if="mensagem.edicao == true"  data-badge-caption="">EDITADA</span>
      </div>
    </div>
  </div>
</template>

<script>
import NavbarMensagem from './NavbarMensagem'

export default {
  name: 'Mensagem',
  components: {
    NavbarMensagem
  },
  data: () => ({
    mensagem: '',
    from: ''
  }),
  created: function () {
    this.mensagem = this.$route.params.mensagem
    this.from = this.$route.params.from
  },
  methods: {
    formataDataHora (data) {
      const dataFormatada = new Date(data)
      return `${dataFormatada.getUTCDate()}/${dataFormatada.getUTCMonth()}/${dataFormatada.getUTCFullYear()} às ${dataFormatada.getUTCHours()}:${String(dataFormatada.getUTCMinutes()).padStart(2, '0')}`
    }
  }
}
</script>

<style scoped>

@media only screen and (min-width: 993px) {
  .container {
      width: 50%;
  }
}
</style>
