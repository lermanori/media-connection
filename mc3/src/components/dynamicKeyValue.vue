<template>
  <div>
    <div class="row" v-show="mode == 'string'">
      <div class="col q-pa-sm">
        <q-input @input="handleInput" rounded outlined v-model="app_key" label="Enter Property" :disable="disabled" />
      </div>
      <div class="col q-pa-sm">
        <q-input @input="handleInput" rounded outlined v-model="app_value" label="Enter String" :disable="disabled" />
      </div>
    </div>

    <div class="row" v-show="mode == 'photo'">
      <div class="col q-pa-sm">
        <q-input @input="handleInput" rounded outlined v-model="app_key" label="Enter Property" :disable="disabled" />
      </div>
      <div class="col q-pa-sm">
        <q-input @input="handleInput" rounded outlined v-model="app_value" label="Enter photo" :disable="disabled" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["disabled", "mode", "value"],
  data() {
    return {
      app_key: "",
      app_value: "",
    };
  },
  methods: {
    handleInput(e) {
    const key = this.app_key;
    const value = this.app_value;
    const mode = this.mode;
    const disabled = this.disabled;
      this.$emit("input", {key,value,mode,disabled});
    }
  },

};
</script>

<style scoped>
</style>
