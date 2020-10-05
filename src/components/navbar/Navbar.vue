<template>
  <div>
    <nav class="teal lighten-1">
      <div class="nav-wrapper container ">
        <a v-on:click="abreFeed()" class="brand-logo">SOOcial</a>
        <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
        <ul class="right hide-on-med-and-down">
          <li><a @click="abreInbox()">Inbox</a></li>
          <li><a @click="abreGrupos()">Grupos</a></li>
          <li><a href="">Sair, {{ this.usuario.nome }}?</a></li>
        </ul>
      </div>
    </nav>
    <ul class="sidenav" id="mobile-demo">
      <li><a @click="abreInbox()">Inbox</a></li>
      <li><a @click="abreGrupos()">Grupos</a></li>
      <li><a href="">Sair, {{ this.usuario.nome }}?</a></li>
    </ul>
  </div>
</template>

<script>
import M from 'materialize-css'
import { mapState } from 'vuex'

export default {
  name: 'Navbar',
  computed: {
    ...mapState('auth', ['usuario'])
  },
  mounted () {
    M.AutoInit()
  },
  methods: {
    abreInbox () {
      this.$router.push({ name: 'recebidas' }).catch(() => { })
    },
    abreFeed () {
      this.$router.push({ name: 'home' }).catch(() => { })
    },
    abreGrupos () {
      this.$router.push({ name: 'grupos' }).catch(() => { })
    }
  }
}
</script>
