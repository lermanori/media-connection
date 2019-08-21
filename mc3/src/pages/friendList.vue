<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <template v-for="(item, index) in pending">
      <app-card
        :item="item"
        :key="index"
        @addToGroup="handle_addToGroup($event)"
        @unfriend="handle_unfriend(item)"
        :options="options"
      ></app-card>
    </template>
    <q-btn to="/friends/pending" class="absolute-bottom" color="cyan">To Pending</q-btn>
  </div>
</template>
<script>
import card from "../components/cardFriend.vue";
//import card from '../components/card.vue'

export default {
  components: {
    "app-card": card
  },
  data() {
    return {
      pending: [
        {
          email: "heeelll"
        }
      ],

      options: []
    };
  },
  methods: {
    async handle_addToGroup(item) {
      console.log("addToGroup:", item);
      if (item.group != null) {
        this.$store.dispatch("Friend/addFriendToGroup", item);
      } else {
        alert("no group chosen");
      }
    },
    async handle_unfriend(item) {
      console.log("unfriend:", item);
    },
    async refresh() {
      const pending = await this.$store.dispatch(
        "Friend/syncByFilter",
        res => res.data.user.friendsList
      );
      this.pending = pending;
    }
  },
  async created() {
    await this.refresh();
    await this.$store.dispatch("Group/syncGroups");
    const groups = this.$store.getters["Group/Groups"];
    const parsedGroups = groups.map(x => {
      return { label: `${x.group_name}: ${x.group_desc}`, value: x._id };
    });
    this.options = parsedGroups;
  }
};
</script>

<style scoped>
</style>