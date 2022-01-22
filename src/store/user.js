
export default {
  namespaced: true,
  state: {
    user: null,
  },
  mutations: {
    SET_USER(state, data){
        state.user = data;
    }
  },
  actions: {
    setUser({commit}, user){
        commit('SET_USER', user);
    }
  },
};
