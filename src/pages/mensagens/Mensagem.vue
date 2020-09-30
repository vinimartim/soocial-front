<template>
  <div class="container">
    <NavbarMensagem />
    <h4>{{ envio.mensagem.assunto }}</h4>

    <router-link v-if="from === 'recebidas'" :to="{ name: 'recebidas' }" key="recebidas">Voltar</router-link>
    <router-link v-else :to="{ name: 'enviadas' }" key="enviadas" value="">Voltar</router-link><br>

    <small>Enviado por: {{ envio.remetente.username }} em {{ formataDataHora(envio.dataHoraEnvio) }}</small>
    <p>{{ envio.mensagem.conteudo }}</p>
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
    envio: '',
    from: ''
  }),
  created: function () {
    this.envio = this.$route.params.mensagem.envio
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
