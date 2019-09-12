<template>
  <q-page class="flex flex-center">
    <q-card class="q-pa-xl">
      <q-card-section>
        <div class="q-mb-md text-h6 text-center">Register</div>
      </q-card-section>
      <q-card-section>
        <div class="row">
          <div class="col">
            <q-input v-model="email" label="Enter email" clearable></q-input>
            <q-input v-model="password"  type="password" label="Enter Password" clearable></q-input>
            <q-input v-model="passwordMatch" type="password" label="Enter Password" clearable></q-input>
          </div>
        </div>
      </q-card-section>
      <q-card-section class="text-center">
        <q-btn @click="register" class="q-mt-md" color="primary">Register</q-btn>
      </q-card-section>
      <q-card-section class="text-center">
        <q-btn @click="login" class="q-mt-md" color="red">google+</q-btn>
      </q-card-section>
    </q-card>
    <div class="row">
      <q-banner
        v-if="!auth"
        class="bg-primary q-pa-md text-white text-center text-h6 text-weight-light fixed-bottom"
      >Unfortunately, username or password isnt correct, please try again.</q-banner>
    </div>
  </q-page>
</template>

<style></style>

<script>
//import axios from "axios"
import baseURL from "../baseUrl.js";
import services from "../services.js";
import store from "../store";

export default {
  name: "Register",
  data() {
    return {
      email: "",
      password: "",
      passwordMatch: "",
      baseURL: baseURL,
      auth: true
    };
  },
  methods: {
    demoAuth(email, password) {
      if (
        email == "ori" &&
        password == "1234" &&
        this.password == this.passwordMatch
      ) {
        this.$router.push("/dashboard");
      } else {
        this.auth = false;
      }
    },
    login() {
      this.$store.dispatch("User/auth").then(() => {
        this.$router.push("/dashboard");
      });
    },
    instagramAuth() {
      this.$store.dispatch("User/authenticate", "instagram");
    },
    register() {
      this.$store
        .dispatch("User/signUpwWithEmailAndPass", {
          email: this.email,
          password: this.password
        })
        .then(() => {
          this.$router.push("/dashboard");
        });
    }
  }
};
</script>