import services from '@/http'
import * as storage from '../storage'
import * as types from './mutation-types'

export const ActionDoLogin = ({ dispatch }, payload) => {
  return services.auth.login(payload).then(res => {
    dispatch('ActionSetUser', res.data.usuario)
    dispatch('ActionSetToken', res.data.token)
  })
}

export const ActionCheckToken = ({ dispatch, state }) => {
  if (state.token) {
    return Promise.resolve(state.token)
  }

  const token = storage.getLocalToken()

  if (!token) {
    return Promise.reject(new Error('Token inválido'))
  }

  dispatch('ActionSetToken', token)
  return dispatch('ActionLoadSession')
}

export const ActionLoadSession = ({ dispatch }) => {
  return services.auth.loadSession().then(res => {
    const usuario = res.data.usuario
    dispatch('ActionSetUser', usuario)
  }).catch(err => {
    console.log(err)
    dispatch('ActionSignOut')
  })
  // return new Promise((resolve, reject) => {
  //   try {
  //     const usuario = services.auth.loadSession().usuario
  //     console.log(usuario)
  //     dispatch('ActionSetUser', usuario)
  //     resolve()
  //   } catch (err) {
  //     console.log('passou aqui')
  //     dispatch('ActionSignOut')
  //     reject(err)
  //   }
  // })
}

export const ActionSetUser = ({ commit }, payload) => {
  commit(types.SET_USER, payload)
}

export const ActionSetToken = ({ commit }, payload) => {
  storage.setLocalToken(payload)
  storage.setHeaderToken(payload)
  commit(types.SET_TOKEN, payload)
}

export const ActionSignOut = ({ dispatch }) => {
  storage.setHeaderToken('')
  storage.deleteLocalToken()
  dispatch('ActionSetUser', { })
  dispatch('ActionSetToken', '')
}
