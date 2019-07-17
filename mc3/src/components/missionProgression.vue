<template>
  <q-card-section>
    <q-separator color="indigo"/>
    <div class="row">
      <div class="col-2 text-center self-center">
        <h6 class="text-h6">{{label}}</h6>
      </div>
      <div class="col-9 q-pr-lg q-pt-md self-center">
        <q-linear-progress
          stripe
          rounded
          style="height: 20px"
          :value="progress1"
          color="green"
          class="q-mt-sm"
        />
        <q-linear-progress
          stripe
          rounded
          style="height: 20px;margin:-top;0px;margin-bottom:20px;"
          :value="progress2"
          color="cyan"
        />
      </div>
    </div>
  </q-card-section>
</template>


<script>
export default {
  data() {
    return {
      user: {},
      tab: "Friends"
    };
  },
  props: ["label", "progress1", "progress2"]
};
</script>

<style scoped>
</style>
