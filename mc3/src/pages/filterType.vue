<template>
  <div>
    <h5>
      <u>{{title}}</u>
    </h5>

    <div class="q-pa-md q-mx-auto" style="max-width: 350px">
      <q-list v-if="filterdPosts.length != undefined">
        <template v-for="(request,index) in filterdPosts">
          <q-expansion-item
            popup
            :default-opened="filterdPosts.length < 2"
            icon="perm_identity"
            :label="request.status"
            :caption="GroupName(request.groupID)"
            :key="index"
          >
            <app-post-card :post="request" class="q-mx-auto" />
          </q-expansion-item>
        </template>
      </q-list>
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
  methods: {
    GroupName(id) {
      const group = this.$store.getters["Group/Groups"].find(x => x._id == id);
      return group != undefined ? group.group_name : "no valid group name";
    }
  },
  async created() {
    await this.$store.dispatch("Post/getAllPosts");
  }
};
</script>

<style scoped>
</style>
