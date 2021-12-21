import { createStore } from 'vuex'

const store = createStore({
  state () {
    return {
      user: JSON.parse(window.localStorage.getItem('USERINFO') || null)
    }
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
      window.localStorage.setItem('USERINFO', JSON.stringify(payload))
    }
  }
})

export default store
