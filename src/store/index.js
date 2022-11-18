import {
  createStore
} from 'vuex'
import loginStatus from './loginStatus'


export default createStore({
  state: {
    message: 'hello vuex'
  },
  getters: {
    length(state) {
      return state.message.length;
    }
  },
  mutations: {
    modifyMessage(state, payload) {
      state.message = payload;
    }
  },
  actions: {
    testAction(context, payload) {
      context.commit('modifyMessage', payload);
    }
  },
  modules: {
    loginStatus
  }
})