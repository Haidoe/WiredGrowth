<template>
    <v-navigation-drawer :value="value" @input="$emit('input', $event)" absolute temporary>
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
                visible
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
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
    props: {
        value: {
            type: Boolean,
            default: true
        }
    },
    computed: {
        ...mapGetters(["user"]),
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