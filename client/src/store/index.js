import Vue from "vue";
import Vuex from "vuex";

import { defaultClient as apolloClient } from "../main";
import { GET_CAMPUSES } from "../queries/campus";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    campuses: {
      data: [],
      loading: true
    }
  },

  getters: {
    campuses: state => state.campuses.data,
    campusLoading: state => state.campuses.loading
  },

  mutations: {
    setCampusLoading: (state, loading) => (state.campuses.loading = loading),
    setCampuses: (state, campuses) => (state.campuses.data = campuses)
  },

  actions: {
    getCampuses: async ({ commit }) => {
      commit("setCampusLoading", true);

      try {
        const { data } = await apolloClient.query({
          query: GET_CAMPUSES
        });

        commit("setCampuses", data.getCampuses);
      } catch (error) {
        console.log(error);
      }

      commit("setCampusLoading", false);
    }
  }
});
