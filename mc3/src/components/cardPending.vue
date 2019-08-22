<template>
  <q-card class="my-card" :key="item._id">
    <q-img
      :ratio="1"
      :style="{width:'250px',height:'250px'}"
      :src="item.profilePicture != null? `${baseUrl}/` + item.profilePicture : 'https://previews.123rf.com/images/salamatik/salamatik1801/salamatik180100019/92979836-profile-anonymous-face-icon-gray-silhouette-person-male-default-avatar-photo-placeholder-isolated-on.jpg'"
    />
    <q-card-section>
      <router-link :to="`/profile/${item._id}`">
        <div class="text-subtitle2">{{item.email}}</div>
      </router-link>
    </q-card-section>
    <q-card-section></q-card-section>
    <q-btn push color="white" text-color="primary" label="Aprove" @click="$emit('approve')" />
    <q-btn push color="white" text-color="primary" label="Remove" />
  </q-card>
</template>



<script>
import baseUrl from "../baseUrl";
export default {
  props: ["item"],
  data() {
    return {
      baseUrl: baseUrl.localBaseUrl
    };
  }
};
</script>

<style scoped>
.my-card {
  width: 100%;
  max-width: 250px;
}
</style>