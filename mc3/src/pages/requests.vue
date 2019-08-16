<template>
  <div>
    <h5>
      <u>New Requests</u>
    </h5>
    <template v-for="(request,index) in newRequests">
      <h6 :key="index + 's1'">{{index}}.{{request}}</h6>
      <q-btn :key="index" round icon="edit" color="indigo" :to="request.id + '/image-editor'"></q-btn>
    </template>
    <br />
    <h5>
      <u>Not New Requests</u>
    </h5>
    <template v-for="(request,index) in notNewRequests">
      <h6 :key="index + 's2'">{{index}}.{{request}}</h6>
    </template>
    <br />
    <q-btn fab to="new-request" icon="add" color="cyan"></q-btn>
  </div>
</template>

<script>
export default {
  computed: {
    Posts() {
      return this.$store.getters["Post/getPosts"];
    },
    newRequests() {
      return this.Posts.filter(arg => arg.status == "new request");
    },
    notNewRequests() {
      return this.Posts.filter(arg => !(arg.status == "new request"));
    }
  }
};
</script>

<style scoped>
</style>
