<template>
  <q-card-section>
    <q-separator color="black-2" />
    <div class="row">
      <div class="col-md-1 col-xs-12">
        <h6 class="text-h6 q-mb-none q-mt-sm">
          <u>group:</u>
          {{label}}
        </h6>
      </div>

      <div class="col-md-3 col-xs-2 text-right self-center text-caption">
        time:
        <br />progress:
      </div>
      <div class="col-md-5 col-xs-8 self-center q-pt-md q-pl-sm">
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
      <div class="col-1 self-center">
        <q-btn round icon="create" class="q-ml-md" @click="$emit('click')" />
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
