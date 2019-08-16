<template>
  <div>
    <h5>
      <u>{{title}}</u>
    </h5>
    <div v-for="(request,index) in filterdPosts" :key="index">
      <h6 :key="index + 's1'" class="q-mb-none">{{index}}.{{request}}</h6>
      <q-btn
        :key="index"
        round
        icon="edit"
        color="indigo"
        :to="'/' + request.id + (mode=='approval'?'/approval':'/image-editor')"
      ></q-btn>
    </div>
    <q-btn fab to="/new-request" icon="add" color="cyan" class="q-mt-xl"></q-btn>
  </div>
</template>

<script>
export default {
  props: ["title", "filterFunc", "mode"],
  computed: {
    Posts() {
      return this.$store.getters["Post/getPosts"];
    },
    filterdPosts() {
      return this.Posts.filter(this.filterFunc);
    }
  }
};
</script>

<style scoped>
</style>
