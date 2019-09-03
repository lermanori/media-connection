<template>
  <div class="q-pa-md row justify-center q-gutter-md">
    <template v-for="(item, index) in pending">
      <div class="col-auto" :key="index" v-if="visible">
        <app-card :item="item" :options="options" :key="index" @addToGroup="handle_addToGroup"></app-card>
      </div>
    </template>
    <q-circular-progress v-if="!visible" indeterminate size="10em" color="indigo" class="q-ma-md" />
    <q-btn to="/friends/pending" class="fixed-bottom" color="cyan">To Pending</q-btn>
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
      pending: [],
      visible: false,
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
      this.visible = false;
      const pending = await this.$store.dispatch(
        "Friend/syncByFilter",
        res => res.data.user.friendsList
      );
      this.pending = pending;
      this.visible = true;
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