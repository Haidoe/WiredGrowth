<template>
    <v-content>
        <v-container class="fill-height" fluid>
            <v-row align="center" justify="center">
                <v-col cols="12" sm="8" md="4">
                    <v-card class="elevation-12">
                        <v-toolbar color="primary" dark flat>
                            <v-toolbar-title>Login</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text>
                            <v-form>
                                <v-text-field
                                    v-model="username"
                                    label="Username"
                                    name="username"
                                    prepend-icon="person"
                                    placeholder="Username"
                                    type="text"
                                />

                                <v-text-field
                                    v-model="password"
                                    id="password"
                                    label="Password"
                                    name="password"
                                    prepend-icon="lock"
                                    placeholder="Password"
                                    type="password"
                                />
                            </v-form>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer />
                            <v-btn color="primary" @click="handleSigninUser"
                                >Login</v-btn
                            >
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-content>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: 'Signin',
    data: () => ({
        username: '',
        password: ''
    }),
    methods: {
        ...mapActions(['signinUser']),
        handleSigninUser() {
            console.log('signing in...');
            this.signinUser({
                username: this.username,
                password: this.password
            });
        }
    }
};
</script>
