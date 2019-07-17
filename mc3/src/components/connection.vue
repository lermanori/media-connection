<template>
  <q-card>
    <q-card-section>
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="Groups" label="Groups"/>
        <q-tab name="Friends" label="Friends"/>
      </q-tabs>

      <q-separator/>

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="Groups">
          <div class="text-h6">Groups</div>Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </q-tab-panel>

        <q-tab-panel name="Friends">
          <div class="text-h6">Friends</div>Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </q-tab-panel>
      </q-tab-panels>
    </q-card-section>
    <q-card-section>
      <q-btn fab icon="add" color="cyan" class="shadow-24"/>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  data() {
    return {
      tab: "Friends"
    };
  }
};
</script>

<style scoped>
</style>
