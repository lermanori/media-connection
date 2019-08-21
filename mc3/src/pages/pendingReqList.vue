<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <template v-for="(item, index) in pending">
      <app-pending-card :item="item" :key="index" @approve="handle_approve(item)"></app-pending-card>
    </template>
    <q-btn to="/friends" class="absolute-bottom" color="cyan">To Friends</q-btn>
  </div>
</template>
<script>
import PendingCard from "../components/cardPending.vue";
//import card from '../components/card.vue'

export default {
  components: {
    "app-pending-card": PendingCard
  },
  data() {
    return {
      pending: [
        {
          email: "heeelll"
        }
      ]
    };
  },
  methods: {
    async handle_approve(item) {
      await this.$store.dispatch("Friend/approve", item);
      await this.refreshPending();
    },
    async refreshPending() {
      const pending = await this.$store.dispatch(
        "Friend/syncByFilter",
        res => res.data.user.pendingReq
      );
      this.pending = pending;
    }
  },
  async created() {
    await this.refreshPending();
  }
};
</script>

<style scoped>
</style>