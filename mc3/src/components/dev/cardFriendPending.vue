<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <template v-for="(item, index) in pending">
      <q-card class="my-card" :key="index">
        <img
          :src="item.profilePic != null? item.profilePic : 'https://previews.123rf.com/images/salamatik/salamatik1801/salamatik180100019/92979836-profile-anonymous-face-icon-gray-silhouette-person-male-default-avatar-photo-placeholder-isolated-on.jpg'"
        />
        <q-card-section>
          <div class="text-subtitle2">{{item.email}}</div>
        </q-card-section>
        <q-card-section></q-card-section>
        <q-btn
          push
          color="white"
          text-color="primary"
          label="Aprove"
          @click="handle_approve(item)"
        />
        <q-btn push color="white" text-color="primary" label="Remove" />
      </q-card>
    </template>
  </div>
</template>


<script>
export default {
  data() {
    return {
      pending: []
    };
  },
  methods: {
    async handle_approve(item) {
      await this.$store.dispatch("Friend/approve", item);
      await this.refreshPending();
    },
    async refreshPending() {
      const pending = await this.$store.dispatch(
        "Friend/syncPending",
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
.my-card {
  width: 100%;
  max-width: 250px;
}
</style>