
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
      if(user){
        window.localStorage.setItem('user_id', user.id);
      }
      commit('SET_USER', user);
    }
  },
};
