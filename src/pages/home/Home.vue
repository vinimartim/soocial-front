<template>
  <div class="mt2 container">
    <!-- Modal Structure -->
    <div id="modal1" class="modal">
      <div v-if="loadingPost" class="progress">
          <div class="indeterminate"></div>
      </div>
      <div class="modal-content">
        <h4>O que você está pensando?</h4>
        <form @submit.prevent="submit()">
          <input type="hidden" v-model="this.usuario.id">
          <div class="input-field">
            <textarea class="materialize-textarea" type="text" placeholder="Conteúdo" v-model="conteudo"></textarea>
          </div>
          <div class="file-field input-field">
              <div class="btn-small">
                <span><i class="material-icons">image</i></span>
                <input @change="upload" type="file" placeholder="Anexe aqui uma imagem">
              </div>
              <div class="file-path-wrapper">
                <input class="file-path validate" type="text">
              </div>
          </div>
          <button :disabled="botaoAtivo" class="btn waves-effect waves-light " type="submit">Enviar
              <i class="material-icons right">send</i>
            </button>
        </form>
      </div>
    </div>
    <h2>Feed <!-- Modal Trigger -->
    <a class="btn-floating waves-effect waves-light modal-trigger" href="#modal1"><i class="material-icons">add</i></a></h2>
    <Post :posts="reversedPosts"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import M from 'materialize-css'
import Post from '../post/Post'

export default {
  name: 'Home',
  components: {
    Post
  },
  data: () => ({
    posts: [],
    conteudo: '',
    seguindo: [],
    errors: [],
    anexo: null,
    record: {
      file: {}
    },
    pathImagem: '',
    botaoAtivo: false,
    loadingPost: false,
    loadingFeed: false
  }),
  computed: {
    ...mapState('auth', ['usuario']),
    reversedPosts: function () {
      return [...this.posts].reverse()
    }
  },
  methods: {
    upload (e) {
      var file = e.target.files
      console.log(e.target.files)
      this.record.file = file[0]
      console.log(this.record.file)
    },
    submit () {
      var elem = document.getElementById('modal1')
      var instance = M.Modal.getInstance(elem)

      this.botaoAtivo = true
      this.loadingPost = true
      this.loadingFeed = true
      const data = new FormData()
      const dadosPost = { conteudo: this.conteudo, usuario: { id: this.usuario.id } }
      data.append('anexo', this.record.file)
      data.append('postDTO', JSON.stringify(dadosPost))
      this.$http.post('post', data).then(res => {
        this.posts.push(res.data)
        M.toast({ html: 'Post enviado!' })
        instance.close()
      }).catch(err => {
        M.toast({ html: err.body.mensagem })
        instance.close()
      }).finally(() => {
        this.botaoAtivo = false
        this.loadingPost = false
        this.loadingFeed = false
      })
    },
    formataDataHora (data) {
      const dataFormatada = new Date(data)
      return `${dataFormatada.getUTCDate()}/${dataFormatada.getUTCMonth()}/${dataFormatada.getUTCFullYear()} às ${dataFormatada.getUTCHours()}:${String(dataFormatada.getUTCMinutes()).padStart(2, '0')}`
    },
    abrePerfil (username) {
      this.$router.push({ name: 'perfilUsuario', params: { username: username } })
    }
  },
  created: function () {

  },
  mounted () {
    M.AutoInit()
    this.$http.get(`seguidores/${this.usuario.id}`).then(res => {
      res.data.map(seguidor => {
        this.seguindo.push(seguidor.estaSeguindo)
        this.$http.get(`post/usuario/${seguidor.estaSeguindo.id}`).then(res => {
          console.log(res.data)
          this.posts = res.data
        }).catch(err => {
          console.log(err.data)
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

.links {
  color: #26a69a;
  cursor: pointer;
}

.username {
  font-size: 1.5em;
}

textarea {
  resize: vertical;
}

@media only screen and (min-width: 993px) {
  .container {
      width: 50%;
  }
}
</style>
