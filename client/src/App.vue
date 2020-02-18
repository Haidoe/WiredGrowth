<template>
    <v-app>
        <v-app-bar absolute color="primary" elevate-on-scroll dark>
            <v-app-bar-nav-icon class="d-none d-sm-flex d-md-none"></v-app-bar-nav-icon>

            <v-toolbar-title>Wired Growth</v-toolbar-title>

            <v-spacer></v-spacer>

            <router-link to="/signin">
                <v-btn color="primary" depressed rounded>
                    <v-icon left>mdi-lock-open</v-icon>Sign in
                </v-btn>
            </router-link>
        </v-app-bar>

        <main class="mt-10 pt-5">
            <transition name="fade">
                <router-view></router-view>
            </transition>
        </main>
    </v-app>
</template>


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