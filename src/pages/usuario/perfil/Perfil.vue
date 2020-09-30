<template>
  <div class="container">
    <h3>Perfil do {{ user.nome }}</h3>
    <p>Nome: {{ user.nome }} {{ user.sobrenome }}</p>
    </div>
</template>

<script>
export default {
  name: 'Perfil',
  data: function () {
    return {
      user: { }
    }
  },
  computed: {
    username () {
      return this.$route.params.username
    }
  },
  watch: {
    $route: 'getUsuario'
  },
  mounted: function () {
    this.getUsuario()
  },
  methods: {
    getUsuario () {
      this.$http.get(`usuario/username/${this.username}`).then(res => {
        this.user = res.data
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
