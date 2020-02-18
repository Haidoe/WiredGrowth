import Vue from "vue";
import Vuex from "vuex";

import { defaultClient as apolloClient } from "../main";
import { GET_CAMPUSES } from "../queries/campus";
import { SIGNIN_USER, GET_CURRENT_USER } from "../queries/user";
import router from "../router";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        campuses: {
            data: [],
            loading: true
        },
        user: {
            data: null,
            loading: false
        }
    },

    getters: {
        campuses: state => state.campuses.data,
        campusLoading: state => state.campuses.loading,
        user: state => state.user.data,
        userLoading: state => state.user.loading
    },

    mutations: {
        setCampusLoading: (state, loading) =>
            (state.campuses.loading = loading),
        setCampuses: (state, campuses) => (state.campuses.data = campuses),
        setUserLoading: (state, loading) => (state.user.loading = loading),
        setUser: (state, user) => (state.user.data = user)
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
        },
        getCurrentUser: async ({ commit }) => {
            commit("setUserLoading", true);

            try {
                const { data } = await apolloClient.query({
                    query: GET_CURRENT_USER
                });

                commit("setUser", data.getCurrentUser);
            } catch (error) {
                console.log("[ERR]", error.message);
            }

            commit("setUserLoading", false);
        },
        signinUser: async ({ commit }, credential) => {
            commit("setUserLoading", true);
            try {
                const { data } = await apolloClient.mutate({
                    mutation: SIGNIN_USER,
                    variables: credential
                });

                localStorage.setItem("token", data.signinUser.token);
                router.go();
            } catch (error) {
                console.log("[ERR]", error.message);
            }
            commit("setUserLoading", false);
        }
    }
});
