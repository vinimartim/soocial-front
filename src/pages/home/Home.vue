<template>
  <div class="mt2 container">
    <!-- Modal Structure -->
    <div id="modal1" class="modal">
      <div class="modal-content">
        <h4>O que você está pensando?</h4>
        <form @submit.prevent="submit()">
          <input type="hidden" v-model="this.usuario.id">
          <!-- <div class="input-field">
            <input type="text" placeholder="Título">
          </div> -->
          <div class="input-field">
            <textarea class="materialize-textarea" type="text" placeholder="Conteúdo" v-model="conteudo"></textarea>
          </div>
          <button class="btn waves-effect waves-light" type="submit">Enviar
            <i class="material-icons right">send</i>
          </button>
        </form>
      </div>
    </div>
    <h2>Feed <!-- Modal Trigger -->
    <a class="btn-floating waves-effect waves-light modal-trigger" href="#modal1"><i class="material-icons">add</i></a></h2>
    <div>
      <div v-for="post in posts" :key="post.conteudo">
        <div class="card">
          <div class="card-content">
            <strong>{{ post.usuario.nome }} {{ post.usuario.sobrenome }}</strong><br>
            <span><small>{{ post.dataPostagem }}</small></span>
            <span class="new badge red" v-show="post.spam === true" data-badge-caption="">SPAM</span>
            <span class="new badge" v-if="post.edicao === true"  data-badge-caption="">EDITADA</span>
            <p>{{ post.conteudo }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import M from 'materialize-css'

export default {
  name: 'Home',
  data: () => ({
    posts: [],
    conteudo: '',
    seguindo: [],
    errors: []
  }),
  computed: {
    ...mapState('auth', ['usuario'])
    // reverterPosts: function () {
    //   const teste = [...this.posts].sort((a, b) => b.dataPostagem - a.dataPostagem)
    //   console.log(teste)
    //   return this.posts.slice().sort((a, b) => b.dataPostagem - a.dataPostagem)
    // }
  },
  methods: {
    submit () {
      const dadosPost = { conteudo: this.conteudo, usuario: { id: this.usuario.id } }
      this.$http.post('post', dadosPost).then((res) => {
        console.log(res.data.usuario)
        this.posts.push(res.data)
        M.toast({ html: 'Post enviado!' })
        var elem = document.getElementById('modal1')
        var instance = M.Modal.getInstance(elem)
        instance.close()
      }).catch(err => {
        console.log(err)
      })
    }
  },
  created: function () {
  },
  mounted () {
    M.AutoInit()
    this.$http.get(`seguidores/${this.usuario.id}`).then(res => {
      res.data.map(seguidor => {
        this.seguindo.push(seguidor.estaSeguindo)
        console.log(seguidor.estaSeguindo.id)
        this.$http.get(`post/usuario/${seguidor.estaSeguindo.id}`).then(res => {
          res.data.map(post => {
            this.posts.push(post)
          })
        })
      })
    })
  }
}
</script>

<style scoped>
.mt2 {
  margin-top: 2em;
}

textarea {
  resize: vertical;
}
</style>
