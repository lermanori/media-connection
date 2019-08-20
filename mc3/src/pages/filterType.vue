<template>
  <div>
    <h5>
      <u>{{title}}</u>
    </h5>

    <div class="row q-gutter-md justify-center">
      <template v-for="(request,index) in filterdPosts">
        <app-post-card :post="request" :key="index" class="col-6" />
      </template>
    </div>
    <div class="row q-my-md justify-center">
      <q-btn fab to="/new-request" icon="add" color="cyan" class></q-btn>
      <q-btn fab class="q-ml-xl" icon="exit_to_app" color="indigo" to="/grid" />
    </div>
    <q-separator />
  </div>
</template>

<script>
import postCard from "../components/postCard";
export default {
  props: ["title", "filterFunc", "mode"],
  components: {
    "app-post-card": postCard
  },
  computed: {
    Posts() {
      return this.$store.getters["Post/getPosts"];
    },
    filterdPosts() {
      return this.Posts.filter(this.filterFunc);
    }
  },
  created() {
    if (this.mode == "all") {
      this.$store.dispatch("Post/getAllPosts");
    }
  }
};
</script>

<style scoped>
</style>
