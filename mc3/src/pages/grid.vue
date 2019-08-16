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
              <div class="text-h6">Post Waiting For Approval</div>
              <div class="text-h4" v-if="postLoaded">{{NumberOfWaitingPosts}}</div>
              <q-btn to="/post/waiting-for-approval">to submissions</q-btn>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-md-5 col-xs-12 q-mb-lg">
          <q-card class="my-card">
            <q-card-section class="bg-blue darken 4 text-white text-center">
              <div class="text-h6">Posts In Process</div>
              <div class="text-h4" v-if="postLoaded">{{NumberOfInProcessPosts}}</div>
              <q-btn to="/post/in-process">to In Process</q-btn>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-md-5 col-xs-12 q-mb-lg">
          <q-card class="my-card">
            <q-card-section class="bg-cyan text-white text-center">
              <div class="text-h6">Posts requested</div>
              <div class="text-h4" v-if="postLoaded">{{NumberOfNewPosts}}</div>
              <q-btn to="/post/requests">to requests</q-btn>
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
      data: [],
      postLoaded: false,
      posts: []
    };
  },
  computed: {
    InstagramData() {
      return this.data;
    },
    NumberOfNewPosts() {
      return this.posts.filter(x => x.status === "new request").length;
    },
    NumberOfInProcessPosts() {
      return this.posts.filter(x => x.status === "in process").length;
    },
    NumberOfWaitingPosts() {
      return this.posts.filter(x => x.status === "waiting for approval").length;
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
    this.$store
      .dispatch("Post/syncPosts", this.$store.getters["Group/currentGroupID"])
      .then(result => {
        this.posts = result;
        this.postLoaded = true;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>