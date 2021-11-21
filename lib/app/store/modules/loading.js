import { LOADING_SHOW, LOADING_HIDE, LOADING_TOGGLE } from "../mutation-types";

const innterState = () => ({
  isLoading: false,
});

// getters
const getters = {};

// actions
const actions = {
  showLoading({ commit }) {
    commit({
      type: LOADING_SHOW,
    });
  },

  hideLoading({ commit }) {
    commit({
      type: LOADING_HIDE,
    });
  },

  toggleLoading({ commit }) {
    commit({
      type: LOADING_TOGGLE,
    });
  },
};

// mutations
const mutations = {
  [LOADING_SHOW](state) {
    state.isLoading = true;
  },

  [LOADING_HIDE](state) {
    state.isLoading = false;
  },

  toggleLoading(state) {
    state.isLoading = !state.isLoading;
  },
};

export default {
  namespaced: true,
  state: innterState,
  getters,
  actions,
  mutations,
};
