<template>
  <q-layout view="lHh lpr lFf">
    <q-header elevated class="glossy purple">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          v-if="loggedIn"
        >
          <q-icon name="menu" />
        </q-btn>
        <q-toolbar-title>Media Connection</q-toolbar-title>

        <q-space />

        <q-btn flat dense round aria-label="Logout" v-if="loggedIn" @click="logout_Handle">
          <q-icon color="white" name="exit_to_app" />
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" bordered content-class="bg-grey-2">
      <q-list>
        <q-item-label header>Documentation Links</q-item-label>
        <q-item clickable tag="a" target="_blank" href="http://v1.quasar-framework.org">
          <q-item-section avatar>
            <q-icon name="school" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Docs</q-item-label>
            <q-item-label caption>v1.quasar-framework.org</q-item-label>
          </q-item-section>
        </q-item>
        <q-item-label header>In-app Links</q-item-label>
        <q-item clickable tag="a" to="/dashboard">
          <q-item-section avatar>
            <q-icon name="dashboard" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Dashboard</q-item-label>
            <q-item-label caption>Home,Profile etc..</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from "quasar";

export default {
  name: "MyLayout",
  data() {
    return {
      leftDrawerOpen:
        this.$q.platform.is.desktop && this.$store.getters.loggedIn
    };
  },
  methods: {
    openURL,
    logout_Handle() {
      this.$store.dispatch("clearAuth");
      this.$router.push("/");
      console.log(this.$store.getters.loggedIn);
    }
  },
  computed: {
    loggedIn() {
      return this.$store.getters.loggedIn;
    }
  },
  created() {
    //this.$store.dispatch('reauth');
  }
};
</script>

<style></style>
