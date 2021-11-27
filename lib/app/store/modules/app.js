import { Loading, QSpinnerGears, Notify } from "quasar";
import API from "../../api";
import { APP_CLEAN_DATA, APP_SET_INITIAL_DATA } from "../mutation-types";
import { TEST_STATES } from "../../models/types";

const innterState = () => ({
  status: TEST_STATES.NOT_STARTED,
  progressIntervalMs: 5000,
  testsPath: "",
  totalTests: 0,
  totalSuites: 0,
  successTests: 0,
  failedTests: 0,
  pendingTests: 0,
  tests: [],
});

// getters
const getters = {
  status: (state) => {
    switch (state.status) {
      case TEST_STATES.NOT_STARTED:
        return "Not running";
      case TEST_STATES.IN_PROGRESS:
        return "Running...";
      case TEST_STATES.FINISHED:
        return "Finished";
      default:
        return "Unknown";
    }
  },
  testsPath: (state) => state.testsPath,
  totalTests: (state) => state.totalTests,
  totalSuites: (state) => state.totalSuites,
  successTests: (state) => {
    if (state.status === TEST_STATES.NOT_STARTED) {
      return 0;
    }
    return state.successTests;
  },
  failedTests: (state) => {
    if (state.status === TEST_STATES.NOT_STARTED) {
      return 0;
    }
    return state.failedTests;
  },
  pendingTests: (state) => {
    if (state.status === TEST_STATES.NOT_STARTED) {
      return 0;
    }
    return state.pendingTests;
  },
};

// actions
const actions = {
  async getInitialData({ commit }) {
    try {
      const apiClient = new API();
      Loading.show({
        spinner: QSpinnerGears,
        message: "Getting things ready for you... please wait",
      });
      commit(APP_CLEAN_DATA);
      const data = await apiClient.getAppInfo();
      commit(APP_SET_INITIAL_DATA, data);
    } catch (error) {
      Notify.create({
        type: "negative",
        color: "negative",
        message: "Something went wrong :( Check your browser's console for more info.",
        icon: "report_problem",
        position: "top-right",
        timeout: 2500,
      });
      console.error("[web-app][store][app][getTests][getInitialData][error] Error occured: %s", error);
    } finally {
      Loading.hide();
    }
  },
};

// mutations
const mutations = {
  [APP_CLEAN_DATA](state) {
    state.status = TEST_STATES.NOT_STARTED;
    state.progressIntervalMs = 5000;
    state.testsPath = "";
    state.totalTests = 0;
    state.totalSuites = 0;
    state.successTests = 0;
    state.failedTests = 0;
    state.pendingTests = 0;
    state.tests = [];
  },

  [APP_SET_INITIAL_DATA](state, data) {
    state.progressIntervalMs = data.configuration.progressCheckIntervalMs;
    state.testsPath = data.configuration.testsPath;
    state.totalTests = data.stats.tests;
    state.totalSuites = data.stats.suites;
    state.tests = data.tests;
  },
};

export default {
  namespaced: true,
  state: innterState,
  getters,
  actions,
  mutations,
};
