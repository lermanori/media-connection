<template>
  <q-card-section>
    <q-separator color="indigo" />
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
          :color="computeColor(progress1)"
          class="q-mt-sm"
        />
        <q-linear-progress
          stripe
          rounded
          style="height: 20px;margin:-top;0px;margin-bottom:20px;"
          :value="progress2"
          :color="computeColor(1 - progress2)"
        />
      </div>
      <div class="col-1 q-pr-lg self-center">
        <q-btn fab icon="create" @click="$emit('click')" />
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
  methods: {
    computeColor(val) {
      const def = "indigo";
      const dictionary = {
        0: "green-6",
        1: "green-5",
        2: "green-4",
        3: "green-3",
        4: "green-2",
        5: "red-2",
        6: "red-3",
        7: "red-4",
        8: "red-5",
        9: "red-6"
      };
      const index = Math.floor(val * 10);
      return index >= 0 && index <= 9 ? dictionary[index] : def;
    }
  },
  props: ["label", "progress1", "progress2", "to"]
};
</script>

<style scoped>
</style>
