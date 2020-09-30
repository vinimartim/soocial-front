export default [
  {
    path: '/mensagens/recebidas',
    name: 'recebidas',
    component: () => import(/* webpackChunkName: "recebidas" */ './MensagensRecebidas')
  },
  {
    path: '/mensagens/:from/:id',
    name: 'mensagem',
    component: () => import(/* webpackChunkName: "mensagem" */ './Mensagem')
  },
  {
    path: '/mensagens/enviadas',
    name: 'enviadas',
    component: () => import(/* webpackChunkName: "enviadas" */ './MensagensEnviadas')
  }
]
