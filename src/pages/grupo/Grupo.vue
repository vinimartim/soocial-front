<template>
  <div class="container">
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
    <h3>{{ grupo.nome }} <a class="btn-floating waves-effect waves-light modal-trigger" href="#modal1"><i class="material-icons">add</i></a></h3>
    <a @click.prevent="abrirMembros()">Membros</a>
    <div class="row">
      <form @submit.prevent="adicionaMembro(grupo)" class="col s12">
        <div class="row">
          <div class="input-field col s6">
            <input id="name" type="text" class="validate" placeholder="Adicionar membro" v-model="username">
          </div>
          <div class="input-field col s6">
            <button class="btn waves-effect waves-light" type="submit" name="action">Adicionar
            </button>
          </div>
        </div>
      </form>
    </div>
    <Post :posts="reversedPosts" />
  </div>
</template>

<script>
import M from 'materialize-css'
import { mapState } from 'vuex'
import Post from '../post/Post'

export default {
  name: 'Grupo',
  components: {
    Post
  },
  data: () => ({
    grupo: {},
    posts: [],
    membros: [],
    username: '',
    conteudo: '',
    record: {
      file: {}
    },
    haAnexo: false,
    botaoAtivo: false,
    loadingPost: false
  }),
  computed: {
    ...mapState('auth', ['usuario']),
    reversedPosts: function () {
      return [...this.posts].reverse()
    }
  },
  created: function () {
    this.grupo = this.$route.params.grupo

    this.$http.get(`post/grupo/${this.grupo.id}`).then(res => {
      this.posts = res.data
    }).catch(err => {
      console.log(err)
    })
  },
  methods: {
    upload (e) {
      var file = e.target.files
      console.log(e.target.files)
      this.record.file = file[0]
      console.log(this.record.file)
      this.haAnexo = true
    },
    submit () {
      var elem = document.getElementById('modal1')
      var instance = M.Modal.getInstance(elem)

      this.botaoAtivo = true
      this.loadingPost = true
      this.loadingFeed = true
      const data = new FormData()
      const dadosPost = { conteudo: this.conteudo, usuario: { id: this.usuario.id }, grupo: { id: this.grupo.id } }
      if (this.haAnexo === true) {
        data.append('anexo', this.record.file)
      }
      data.append('postDTO', JSON.stringify(dadosPost))
      this.$http.post('post', data).then(res => {
        this.posts.push(res.data)
        M.toast({ html: 'Post enviado!' })
        instance.close()
      }).catch(err => {
        M.toast({ html: err.body.mensagem })
        var instance = M.Modal.getInstance(elem)
        instance.close()
      }).finally(() => {
        this.botaoAtivo = false
        this.loadingPost = false
        this.loadingFeed = false
      })
    },
    adicionaMembro (grupo) {
      const dadosGrupo = grupo
      this.$http.get(`usuario/username/${this.username}`).then(res => {
        dadosGrupo.membros.push(res.data)
        console.log('dados', dadosGrupo)
        this.$http.put(`grupo/${grupo.id}`, grupo).then(res => {
          M.toast({ html: 'Adicionado!' })
        }).catch(err => {
          M.toast({ html: err.body.mensagem })
        })
      }).catch(err => {
        M.toast({ html: err.body.mensagem })
      })
    },
    formataDataHora (data) {
      const dataFormatada = new Date(data)
      return `${dataFormatada.getUTCDate()}/${dataFormatada.getUTCMonth()}/${dataFormatada.getUTCFullYear()} às ${dataFormatada.getUTCHours()}:${String(dataFormatada.getUTCMinutes()).padStart(2, '0')}`
    },
    abrirMembros () {
      this.$http.get(`grupo/membros/${this.grupo.id}`).then(res => {
        this.membros = res.data
        this.$router.push({ name: 'listaMembros', params: { membros: this.membros, grupo: this.grupo } }).catch(() => {})
      }).catch(err => {
        console.log(err)
      })
    }
  },
  mounted () {
    M.AutoInit()
  }
}
</script>

<style scoped>

@media only screen and (min-width: 993px) {
  .container {
      width: 50%;
  }
}

.username {
  font-size: 1.5em;
}

</style>
