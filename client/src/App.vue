<template>
    <v-app>
        <v-app-bar absolute color="primary" elevate-on-scroll dark>
            <v-app-bar-nav-icon @click="drawer = !drawer" v-if="user"></v-app-bar-nav-icon>

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

        <v-navigation-drawer v-model="drawer" absolute temporary v-show="user">
            <v-list-item>
                <v-list-item-avatar>
                    <v-img :src="activeUser.avatar"></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                    <v-list-item-title>{{ activeUser.username }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>

            <v-list dense>
                <v-list-item
                    v-for="item in drawerNavList"
                    :key="`${item.title}-drawer`"
                    :to="item.path"
                    link
                >
                    <v-list-item-icon>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item link @click="handleSignoutUser">
                    <v-list-item-icon>
                        <v-icon>exit_to_app</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>Sign out</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
    </v-app>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
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
        },
        drawerNavList() {
            return [
                {
                    path: "/attendance",
                    title: "Attendance",
                    icon: "calendar_today"
                },
                {
                    path: "/attendee",
                    title: "Attendee",
                    icon: "person"
                },
                {
                    path: "/team",
                    title: "Team",
                    icon: "group"
                },
                {
                    path: "/task",
                    title: "Task",
                    icon: "work"
                },
                {
                    path: "/campus",
                    title: "Campus",
                    icon: "location_on"
                },
                {
                    path: "/attendance-status",
                    title: "Attendance Status",
                    icon: "emoji_emotions"
                }
            ];
        },
        activeUser() {
            if (this.user) {
                return this.user;
            } else {
                return {
                    username: "John Doe",
                    avatar: "https://randomuser.me/api/portraits/men/78.jpg"
                };
            }
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
