<template>
  <div class="container">
    <div class="valign-wrapper row login-box">
      <div class="col card hoverable s10 pull-s1 m6 pull-m3 l4 pull-l4">
        <div v-if="loading" class="progress">
            <div class="indeterminate"></div>
        </div>
        <form @submit.prevent="submit()">
          <div class="card-content">
            <span class="card-title">Faça login</span>
            <div class="row">
              <div class="input-field">
                <input type="text" v-model="form.username" class="form-control" placeholder="Username">
              </div>
              <div class="input-field">
                <input type="password" v-model="form.senha" class="form-control" placeholder="Senha">
              </div>
            </div>
          </div>
          <div class="card-action right-align">
            <a class="btn-flat grey-text waves-effect" @click.prevent="abreCadastro()">Registrar</a>
            <button class="btn waves-effect waves-light" type=submit>
              Login
              <i class="material-icons right">send</i>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data: () => ({
    form: {
      username: '',
      senha: ''
    },
    loading: false
  }),
  methods: {
    ...mapActions('auth', ['ActionDoLogin']),
    async submit () {
      this.loading = true
      try {
        await this.ActionDoLogin(this.form)
        this.$router.push({ name: 'home' })
      } catch (err) {
        console.log(err)
      } finally {
        this.loading = false
      }
    },
    abreCadastro () {
      this.$router.push({ name: 'signup' }).catch(() => {})
    }
  }
}
</script>

<style scoped lang="scss">
.login-box {
  height: 100%;
}

.container  {
  position: absolute;
  height: 100%;
  width: 100%;
  max-width: 5000px;
}

.container .row {
  margin: 0;
}
</style>
