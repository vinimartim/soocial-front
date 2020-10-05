<template>
  <div class="container">
    <h3>Membros do grupo {{ grupo.nome }}</h3>
    <span><small>{{ membros.length }} membros</small></span>

    <table class="highlight responsive-table">
      <thead>
        <th>Nome</th>
        <th>Permissões</th>
      </thead>
      <tbody>
        <tr v-for="membro in membros" :key="membro.id">
          <td>{{ membro.username }}</td>
          <td>
            <span v-if="admins.length">{{ checaAdm(membro) }}</span>
            <span v-else>Membro</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'ListaMembros',
  data: () => ({
    membros: [],
    admins: [],
    grupo: {}
  }),
  created: function () {
    this.membros = this.$route.params.membros
    this.grupo = this.$route.params.grupo
    this.$http.get(`grupo/admins/${this.grupo.id}`).then(res => {
      this.admins = res.data
    })
  },
  methods: {
    checaAdm (membro) {
      if (this.admins.includes(membro.id)) {
        console.log(membro)
      } else {
        console.log(membro)
      }
    }
  }
}
</script>
