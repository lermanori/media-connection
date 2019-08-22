<template>
  <q-card class="my-card" :key="item._id">
    <div class="row justify-center">
      <img
        :style="{maxWidth:'300px'}"
        :src="item.profilePic != null? item.profilePic : 'https://previews.123rf.com/images/salamatik/salamatik1801/salamatik180100019/92979836-profile-anonymous-face-icon-gray-silhouette-person-male-default-avatar-photo-placeholder-isolated-on.jpg'"
      />
    </div>
    <q-card-section>
      <router-link :to="`/profile/${item._id}`">
        <div class="text-subtitle2">{{item.email}}</div>
      </router-link>
    </q-card-section>
    <q-card-section>
      <div class="row text-subtitle2 justify-center q-mb-xs">add user to group:</div>
      <div class="row">
        <div class="col-9">
          <q-select :options="options" v-model="model" />
        </div>
        <div class="col-3">
          <q-btn
            outline
            text-color="primary"
            icon="add"
            :style="{height:'100%',width:'100%'}"
            @click="$emit('addToGroup',{group:model == null ? null:model.value,friend:item})"
          />
        </div>
      </div>
      <div class="row justify-center q-mt-md">
        <q-btn
          outline
          color="white"
          text-color="primary"
          label="UnFriend"
          @click="$emit('unfriend',item)"
        />
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  props: ["item", "options"],
  data() {
    return {
      model: null
    };
  }
};
</script>

<style scoped>
.my-card {
  width: 100%;
  max-width: 550px;
}
</style>