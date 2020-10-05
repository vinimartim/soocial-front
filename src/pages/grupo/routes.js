export default [
  {
    path: '/grupos',
    name: 'grupos',
    component: () => import(/* webpackChunkName: "grupos" */ './Grupos')
  },
  {
    path: '/grupo/:id',
    name: 'grupo',
    component: () => import(/* webpackChunkName: "grupo" */ './Grupo')
  },
  {
    path: '/grupo/:id/membros',
    name: 'listaMembros',
    component: () => import(/* webpackChunkName: "listaMembros" */ './ListaMembros')
  }
]
