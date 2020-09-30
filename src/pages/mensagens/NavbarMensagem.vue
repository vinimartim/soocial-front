<template>
  <div>
    <br />
    <router-link :to="{ name: 'recebidas' }">Inbox</router-link> | <router-link :to="{ name: 'enviadas' }">Enviadas</router-link> | <a class="modal-trigger" href="#modal1">Escrever</a>

    <!-- Modal Structure -->
    <div id="modal1" class="modal">
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
          <button class="btn waves-effect waves-light" type="submit">Enviar
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
  props: ['envios'],
  data: () => ({
    remetente: { id: 0 },
    destinatario: { username: '' },
    assunto: '',
    conteudo: ''
  }),
  computed: {
    ...mapState('auth', ['usuario'])
  },
  mounted () {
    M.AutoInit()
  },
  methods: {
    submit () {
      const dadosMensagem = {
        remetente: {
          id: this.usuario.id
        },
        destinatario: {
          username: this.destinatario.username
        },
        assunto: this.assunto,
        conteudo: this.conteudo
      }
      this.$http.post('mensagem', dadosMensagem).then(res => {
        console.log(res.data.id)

        this.$http.get(`envio/mensagem/${res.data.id}`).then(res => {
          this.envios.unshift(res.data)
        }).catch(err => {
          M.toast({ html: err.data.mensagem })
        })

        M.toast({ html: 'Mensagem enviada!' })
        var elem = document.getElementById('modal1')
        var instance = M.Modal.getInstance(elem)
        instance.close()
      }).catch(err => {
        M.toast({ html: err.data.mensagem })
      })
    }
  }
}
</script>
