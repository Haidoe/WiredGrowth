<template>
    <v-app>
        <v-app-bar absolute color="primary" elevate-on-scroll dark>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer" v-if="user"></v-app-bar-nav-icon>

            <v-toolbar-title>
                <router-link to="/" class="toolbar-title">Wired Growth</router-link>
            </v-toolbar-title>

            <v-spacer></v-spacer>

            <template v-for="nav in navList">
                <v-btn
                    color="primary"
                    :to="nav.path"
                    :key="nav.title"
                    class="mr-1"
                    depressed
                    rounded
                >
                    <v-icon left>{{ nav.icon }}</v-icon>
                    {{ nav.title }}
                </v-btn>
            </template>

            <v-btn color="primary" depressed rounded v-if="user" @click="handleSignoutUser">
                <v-icon left>exit_to_app</v-icon>Sign out
            </v-btn>
        </v-app-bar>

        <main class="mt-10 pt-5">
            <transition name="fade">
                <router-view></router-view>
            </transition>
        </main>

        <DrawerNav v-model="drawer" />
    </v-app>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import DrawerNav from "./components/DrawerNav";

export default {
    components: {
        DrawerNav
    },
    data: () => ({
        drawer: false
    }),
    computed: {
        ...mapGetters(["user"]),
        navList() {
            if (this.user) {
                return [
                    {
                        path: "/attendance",
                        title: "Attendance",
                        icon: "calendar_today"
                    }
                ];
            }

            return [
                {
                    path: "/signin",
                    title: "Sign in",
                    icon: "mdi-lock-open"
                }
                // {
                //     path: "/signup",
                //     title: "Sign up",
                //     icon: "edit"
                // }
            ];
        }
    },
    methods: {
        ...mapActions(["signoutUser"]),
        handleSignoutUser() {
            this.signoutUser();
        }
    }
};
</script>
<style>
.fade-enter-active,
.fade-leave-active {
    transition-property: opacity;
    transition-duration: 0.25s;
}
.fade-enter-active {
    transition-delay: 0.25s;
}
.fade-enter,
.fade-leave-active {
    opacity: 0;
}
.toolbar-title {
    color: #fff !important;
    text-decoration: none;
}
</style>
