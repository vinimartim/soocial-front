<template>
  <div class="container">
    <h3>Cadastro</h3>
    <form @submit.prevent="submit()">
      <div class="input-field">
        <input type="text" placeholder="Nome" v-model="usuario.nome">
      </div>
      <div class="input-field">
        <input type="text" placeholder="Sobrenome" v-model="usuario.sobrenome">
      </div>
      <div class="input-field">
        <input type="text" placeholder="Username" v-model="usuario.username">
      </div>
      <div class="input-field">
        <input type="email" placeholder="E-mail" v-model="usuario.email">
      </div>
      <div class="input-field">
        <input type="password" placeholder="Senha" v-model="usuario.senha">
      </div>
      <div class="input-field">
        <input type="text" placeholder="Gênero" v-model="usuario.genero">
      </div>
      <div class="input-field">
        <input type="text" placeholder="Data nascimento" v-model="usuario.dataNascimento">
      </div>
      <div class="input-field">
        <input type="text" placeholder="Telefone" v-model="usuario.telefone">
      </div>
      <button class="btn waves-effect waves-light" type="submit">Enviar
          <i class="material-icons right">send</i>
        </button>
    </form>
  </div>
</template>

<script>
import M from 'materialize-css'

export default {
  data: () => ({
    usuario: {
      nome: '',
      sobrenome: '',
      username: '',
      email: '',
      senha: '',
      genero: '',
      dataNascimento: '',
      telefone: ''
    }
  }),
  methods: {
    submit () {
      const dadosUsuario = {
        nome: this.usuario.nome,
        sobrenome: this.usuario.sobrenome,
        username: this.usuario.username,
        email: this.usuario.email,
        senha: this.usuario.senha,
        genero: this.usuario.genero,
        dataNascimento: this.usuario.dataNascimento,
        telefone: this.usuario.telefone
      }

      this.$http.post('usuario', dadosUsuario).then(res => {
        this.$router.push({ name: 'login' })
        M.toast({ html: 'Cadastrado com sucesso!' })
      }).catch(err => {
        M.toast({ html: err.data })
      })
    }
  },
  mounted () {
    M.AutoInit()
  }
}
</script>

<style scoped>

</style>
