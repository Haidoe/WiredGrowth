import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "@babel/polyfill";

import ApolloClient from "apollo-boost";
import VueApollo from "vue-apollo";

Vue.use(VueApollo);

export const defaultClient = new ApolloClient({
    uri: "http://localhost:4000/",
    //token autorization
    fetchOptions: {
        credentials: "include"
    },
    request: operation => {
        if (!localStorage.token) {
            localStorage.setItem("token", "");
        }

        operation.setContext({
            headers: {
                authorization: localStorage.getItem("token")
            }
        });
    },
    onError: ({ graphQLErrors, networkError }) => {
        if (networkError) {
            console.log("[networkError]", networkError);
        }
        if (graphQLErrors) {
            for (let err of graphQLErrors) {
                console.dir(err);
            }
        }
    }
});

const apolloProvider = new VueApollo({ defaultClient });

Vue.config.productionTip = false;

new Vue({
    apolloProvider,
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount("#app");
