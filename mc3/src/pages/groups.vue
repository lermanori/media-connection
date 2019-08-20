<template>
  <div>
    <h5>
      <u>{{title}}</u>
    </h5>

    <div class="row q-gutter-md justify-center">
      <template v-for="(group,index) in filterdGroups">
        <app-group-card :group="group" :key="index" class="col-6" />
      </template>
    </div>
    <q-separator />
  </div>
</template>

<script>
import groupCard from "../components/groupCard";
export default {
  props: ["title", "filterFunc", "mode"],
  components: {
    "app-group-card": groupCard
  },
  computed: {
    Groups() {
      return this.$store.getters["Group/Groups"];
    },
    filterdGroups() {
      return this.Groups.filter(this.filterFunc);
    }
  },
  created() {
    if (this.mode == "all") {
      this.$store.dispatch("Group/syncGroups");
    }
    this.$store.dispatch("Post/getAllPosts");
  }
};
</script>

<style scoped>
</style>
