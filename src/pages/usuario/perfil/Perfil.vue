<template>
  <div class="container">
    <h3>Perfil do {{ user.nome }}</h3>
    <p>Nome: {{ user.nome }} {{ user.sobrenome }}</p>
    <button @click="checaSeguidor()" class="btn">Seguindo</button>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Perfil',
  data: function () {
    return {
      user: { },
      seguindo: [],
      segue: false
    }
  },
  computed: {
    username () {
      return this.$route.params.username
    },
    ...mapState('auth', ['usuario'])
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
    },
    checaSeguidor () {
      if (this.segue === false) {
        this.seguir()
      } else {
        this.deixarDeSeguir()
      }
    },
    deixarDeSeguir () {
      console.log('não faz nada')
    },
    seguir () {
      const dadosSeguir = {
        quemSegue: {
          id: this.usuario.id
        },
        estaSeguindo: {
          id: this.user.id
        }
      }
      console.log(dadosSeguir)
      this.$http.post('seguidores', dadosSeguir).then(res => {
        this.segue = true
      }).catch(err => {
        console.log(err)
      })
    }
  },
  created: function () {
    this.$http.get(`seguidores/${this.usuario.id}`).then(res => {
      res.data.map(seguidor => {
        this.seguindo.push(seguidor.estaSeguindo)
        if (seguidor.estaSeguindo.id === this.user.id) this.segue = true
      })
    })
  }
}
</script>
