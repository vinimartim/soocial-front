import store from '../store'

export default async (to, from, next) => {
  document.title = `${to.name} - SOOCIAL`

  if (to.name !== 'login' && to.name !== 'signup' && !store.getters['auth/hasToken']) {
    try {
      await store.dispatch('auth/ActionCheckToken')

      next({ name: to.name })
    } catch (err) {
      next({ name: 'login' })
    }
  } else {
    if (to.name === 'login' && store.getters['auth/hasToken']) {
      next({ name: 'home' })
    } else {
      next()
    }
  }
}
