<template>
  <div class="q-pa-md row justify-center q-gutter-md">
    <q-circular-progress v-if="!visible" indeterminate size="10em" color="indigo" class="q-ma-md" />
    <div class="col-auto">
      <template v-for="(item, index) in pending">
        <app-pending-card :item="item" :key="index" @approve="handle_approve(item)"></app-pending-card>
      </template>
    </div>
    <q-btn to="/friends" class="fixed-bottom" color="cyan">To Friends</q-btn>
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
      pending: [],
      visible: false
    };
  },
  methods: {
    async handle_approve(item) {
      await this.$store.dispatch("Friend/approve", item);
      await this.refreshPending();
    },
    async refreshPending() {
      this.visible = false;
      const pending = await this.$store.dispatch(
        "Friend/syncByFilter",
        res => res.data.user.pendingReq
      );
      this.pending = pending;
      this.visible = true;
    }
  },
  async created() {
    await this.refreshPending();
  }
};
</script>

<style scoped>
</style>