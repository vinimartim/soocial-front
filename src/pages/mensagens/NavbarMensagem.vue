<template>
  <div>
    <br />
    <router-link :to="{ name: 'recebidas' }">Inbox</router-link> | <router-link :to="{ name: 'enviadas' }">Enviadas</router-link> | <a class="modal-trigger" href="#modal1">Escrever</a>

    <!-- Modal Structure -->
    <div id="modal1" class="modal">
      <div v-if="loadingMensagem" class="progress">
          <div class="indeterminate"></div>
      </div>
      <div class="modal-content">
        <form @submit.prevent="submit()">
          <input type="hidden" v-model="remetente.id">
          <div class="input-field">
            <input type="text" placeholder="Para" v-model="destinatario.username">
          </div>
          <div class="input-field">
            <input type="text" placeholder="Assunto" v-model="assunto">
          </div>
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
          <button :disabled="botaoAtivo" class="btn waves-effect waves-light" type="submit">Enviar
            <i class="material-icons right">send</i>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import M from 'materialize-css'
import { mapState } from 'vuex'

export default {
  name: 'NavbarMensagem',
  props: ['mensagens'],
  data: () => ({
    remetente: { id: '' },
    destinatario: {
      username: '',
      id: ''
    },
    assunto: '',
    conteudo: '',
    record: {
      file: {}
    },
    loadingMensagem: false,
    botaoAtivo: false
  }),
  computed: {
    ...mapState('auth', ['usuario']),
    reversedMensagens: function () {
      return [...this.mensagens].reverse()
    }
  },
  mounted () {
    M.AutoInit()
  },
  methods: {
    upload (e) {
      var file = e.target.files
      this.record.file = file[0]
    },
    submit () {
      var elem = document.getElementById('modal1')
      var instance = M.Modal.getInstance(elem)

      this.loadingMensagem = true
      this.botaoAtivo = true
      this.$http.get(`usuario/username/${this.destinatario.username}`).then(async res => {
        this.destinatario.id = await res.data.id
        const data = new FormData()
        const dadosMensagem = {
          envio: {
            destinatario: {
              id: this.destinatario.id
            },
            remetente: {
              id: this.usuario.id
            }
          },
          assunto: this.assunto,
          conteudo: this.conteudo
        }
        data.append('anexo', this.record.file)
        data.append('mensagemDTO', JSON.stringify(dadosMensagem))
        this.$http.post('mensagem', data).then(res => {
          this.loadingMensagem = false
          this.botaoAtivo = false
          if (this.$route.name === 'enviada') {
            this.mensagens.push(res.data)
          }
          M.toast({ html: 'Mensagem enviada!' })
          instance.close()
        }).catch(err => {
          console.log(err)
          M.toast({ html: err.body.mensagem })
          instance.close()
        })
      }).catch(err => {
        console.log(err)
        M.toast({ html: err.body.mensagem })
        instance.close()
      })
    }
  }
}
</script>
