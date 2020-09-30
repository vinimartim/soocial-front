export default [
  {
    path: '/post',
    name: 'post',
    component: () => import(/* webpackChunkName: "post" */ './Post')
  }
]