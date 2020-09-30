export default [
  {
    path: '/perfil/usuario/:username',
    name: 'perfilUsuario',
    component: () => import(/* webpackChunkName: "perfil" */ './Perfil')
  }
]
