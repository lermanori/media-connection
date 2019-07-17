<template>
  <q-card-section>
    <q-separator class="q-mb-md" color="indigo"/>

    <q-item clickable v-ripple>
      <q-item-section side>
        <q-avatar rounded size="33px">
          <img src="https://cdn.quasar-framework.org/img/avatar.png">
          <q-badge class floating color="teal">new</q-badge>
        </q-avatar>
      </q-item-section>
      <q-item-section>
        <q-item-label>Mary</q-item-label>
        <q-item-label caption>2 new messages</q-item-label>
      </q-item-section>
      <q-item-section side>{{number_min_ago}} min ago</q-item-section>
    </q-item>
  </q-card-section>
</template>

<script>
export default {
  data() {
    return {
      number_min_ago: 20
    };
  }
};
</script>

<style>
</style>
