<template>
  <q-page>
    <q-page-container>
      <div class="text-center">
        <div class="text-h6">currentGroupID: {{$store.getters["Group/currentGroupID"]}}</div>
      </div>
      <div class="row justify-center q-gutter-sm">
        <div class="col-md-5 col-xs-12 q-mb-lg">
          <q-card class="my-card">
            <q-card-section class="bg-indigo text-white text-center">
              <div class="text-h6">Post waiting for submission</div>
              <div class="text-h4">5</div>
              <q-btn>to submissions</q-btn>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-md-5 col-xs-12">
          <q-card class="my-card">
            <q-card-section class="bg-cyan text-white text-center">
              <div class="text-h6">Posts requested</div>
              <div class="text-h4">3</div>
              <q-btn>to requests</q-btn>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </q-page-container>
    <q-page-container class="q-mx-sm">
      <div class="row justify-center q-gutter-xl">
        <div class="col-4" v-for="(img,i) in InstagramData" :key="i">
          <q-card>
            <q-img class="app-img q-mx-auto" :src="img.images.standard_resolution.url"></q-img>
          </q-card>
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
          this.$store.getters["User/instagram_token"]
      );
      this.data = data.data;
      return;
    }
  },
  created() {
    this.getInstagramData();
  }
};
</script>