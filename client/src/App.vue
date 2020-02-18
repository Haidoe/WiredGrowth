<template>
    <v-app>
        <v-app-bar absolute color="primary" elevate-on-scroll dark>
            <v-app-bar-nav-icon
                class="d-none d-sm-flex d-md-none"
            ></v-app-bar-nav-icon>

            <v-toolbar-title>Wired Growth</v-toolbar-title>

            <v-spacer></v-spacer>

            <template v-for="nav in navList">
                <router-link :to="nav.path" :key="nav.title">
                    <v-btn color="primary" depressed rounded>
                        <v-icon left>{{ nav.icon }}</v-icon
                        >{{ nav.title }}
                    </v-btn>
                </router-link>
            </template>

            <v-btn
                color="primary"
                depressed
                rounded
                v-if="user"
                @click="handleSignoutUser"
            >
                <v-icon left>exit_to_app</v-icon>
                Sign out
            </v-btn>
        </v-app-bar>

        <main class="mt-10 pt-5">
            <transition name="fade">
                <router-view></router-view>
            </transition>
        </main>
    </v-app>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
    computed: {
        ...mapGetters(["user"]),
        navList() {
            if (this.user) {
                return [
                    {
                        path: "/attendance",
                        title: "Attendance",
                        icon: "person"
                    }
                ];
            }

            return [
                {
                    path: "/signin",
                    title: "Sign in",
                    icon: "mdi-lock-open"
                },
                {
                    path: "/signup",
                    title: "Sign up",
                    icon: "edit"
                }
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
</style>
