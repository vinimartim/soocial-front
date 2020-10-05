<template>
  <div v-if="posts.length">
    <div v-for="post in this.posts" :key="post.id">
      <div class="card">
        <div class="card-content">
          <strong><a class="links username" @click="abrePerfil(post.usuario.username)">{{ post.usuario.username }}</a></strong><br>
          <span><small>{{ formataDataHora(post.dataPostagem) }}</small></span>
          <p>{{ post.conteudo }}</p>
          <img class="responsive-img mt1" v-if="post.anexo" :src="post.anexo.path">
        </div>
        <div class="card-action">
          <a><i class="material-icons tiny links">thumb_up</i></a>
          <a><i class="material-icons tiny links">comment</i></a>
          <a><i class="material-icons tiny links">share</i></a>
          <a><i class="material-icons tiny links">report</i></a>

          <span class="new badge red" v-show="post.spam === true" data-badge-caption="">SPAM</span>
          <span class="new badge" v-if="post.edicao === true"  data-badge-caption="">EDITADA</span>
          <span class="new badge" v-if="post.denuncia === true"  data-badge-caption="">DENUNCIADO</span>

          <div></div>
        </div>
      </div>
    </div>
  </div>
  <span v-else>Nenhum post para exibir. Experimente postar ou seguir mais usuários :)</span>
</template>

<script>
export default {
  name: 'Post',
  props: ['posts'],
  data: () => ({
  }),
  methods: {
    formataDataHora (data) {
      const dataFormatada = new Date(data)
      return `${dataFormatada.getUTCDate()}/${dataFormatada.getUTCMonth()}/${dataFormatada.getUTCFullYear()} às ${dataFormatada.getUTCHours()}:${String(dataFormatada.getUTCMinutes()).padStart(2, '0')}`
    }
  }
}
</script>

<style scoped>
</style>
