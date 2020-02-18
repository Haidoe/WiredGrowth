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
                            <v-form
                                @submit.prevent="handleSigninUser"
                                ref="form"
                            >
                                <v-text-field
                                    class="mb-3"
                                    v-model="username"
                                    label="Username"
                                    name="username"
                                    prepend-icon="person"
                                    placeholder="Username"
                                    ref="username"
                                    :rules="[() => !!username]"
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
                                    ref="password"
                                    :rules="[() => !!password]"
                                />

                                <v-btn
                                    class="mt-3"
                                    color="primary"
                                    type="submit"
                                    :loading="userLoading"
                                    block
                                >
                                    Login
                                </v-btn>

                                <div class="text-center">
                                    <span>
                                        Don't have account ?
                                        <router-link to="/signup">
                                            Sign up here
                                        </router-link>
                                    </span>
                                </div>
                            </v-form>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer />
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-content>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
    name: "Signin",
    data: () => ({
        username: "",
        password: "",
        formHasErrors: false
    }),
    computed: {
        ...mapGetters(["userLoading", "user"]),
        form() {
            return {
                username: this.username,
                password: this.password
            };
        }
    },
    watch: {
        user(value) {
            if (value) {
                this.$router.push("/");
            }
        }
    },
    methods: {
        ...mapActions(["signinUser"]),

        handleSigninUser() {
            this.formHasErrors = false;

            Object.keys(this.form).forEach(f => {
                if (!this.form[f]) this.formHasErrors = true;

                this.$refs[f].validate(true);
            });

            if (!this.formHasErrors) {
                console.log("Signing in...");
                this.signinUser({
                    username: this.username,
                    password: this.password
                });
            }
        }
    }
};
</script>
