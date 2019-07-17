<template>
  <q-page class="flex flex-center">
    <q-card class="q-pa-xl">
      <q-card-section>
        <div class="q-mb-md text-h6 text-center">Log-In</div>
      </q-card-section>
      <q-card-section>
        <div class="row">
          <div class="col">
            <q-input v-model="email" label="Enter email"></q-input>
            <q-input v-model="password" label="Enter password"></q-input>
          </div>
        </div>
      </q-card-section>
      <q-card-section class="text-center">
        <q-btn @click="loginWithEmailAndPass" class="q-mt-md" color="primary">Log-In</q-btn>
      </q-card-section>
      <q-card-section class="text-center">
        <q-btn @click="login" class="q-mt-md" color="red">google+</q-btn>
      </q-card-section>
    </q-card>
    <q-btn to="/register" size="xl" class="q-mt-md" color="indigo">Register</q-btn>

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
  name: "login",
  data() {
    return {
      email: "",
      password: "",
      baseURL: baseURL,
      auth: true
    };
  },
  methods: {
    login() {
      this.$store.dispatch("auth").then(() => {
        window.setTimeout(() => this.$router.push("/taskManager"), 500);
      });
    },
    loginWithEmailAndPass() {
      this.$store
        .dispatch("login", {
          email: this.email,
          password: this.password
        })
        .then(() => {
          this.$router.push("/taskManager");
        });
    }
  }

  /*created() {
    this.$store
      .dispatch("reauth")
      .then(result => {
        if (this.$store.getters.loggedIn) this.$router.push("/taskManager");
      })
      .catch(err => {
        console.log(err);
      });
  }
     */
};
</script>