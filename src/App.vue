<template>
  <div id="app">
    <Navbar :key="$route.fullPath" v-if="this.$route.name !== 'login' && this.$route.name !== 'signup'"/>
    <router-view />
  </div>
</template>

<script>
import Navbar from './components/navbar/Navbar'

export default {
  name: 'App',
  components: {
    Navbar
  }
}
</script>

<style lang="scss">

</style>
