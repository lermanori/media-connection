<template>
  <q-page>
    <q-page-container>
      <div class="row">
        <div class="col">
          <q-page-sticky position="top" expand class="bg-accent text-white">
            <q-toolbar>
              <q-btn flat round dense icon="map" />
              <q-toolbar-title>Grid</q-toolbar-title>
            </q-toolbar>
          </q-page-sticky>
        </div>
      </div>
    </q-page-container>
    <q-page-container class="q-mx-sm">
      <div class="row justify-center q-gutter-xl">
        <div class="col-4" v-for="(img,i) in InstagramData" :key="i">
          <q-img class="app-img q-mx-auto" :src="img.images.standard_resolution.url"></q-img>
        </div>
      </div>
    </q-page-container>
  </q-page>
</template>

<style>
</style>

<script>
export default {
  name: "Register",
  data() {
    return {
      username: "",
      password: "",
      auth: "true",
      data: []
    };
  },
  computed: {
    InstagramData() {
      return this.data;
    }
  },
  methods: {
    async getInstagramData() {
      let { data } = await this.$axios.get(
        "https://api.instagram.com/v1/users/self/media/recent/?access_token=" +
          this.$store.getters.instagram_token
      );
      console.log(data.data);
      this.data = data.data;
      return;
    }
  },
  created() {
    this.getInstagramData();
  }
};
</script>