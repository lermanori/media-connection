<template>
  <div>
    <div class="row" v-if="mode == 'string'">
      <div class="col q-pa-sm">
        <q-input
          @input="handleInput"
          outlined
          v-model="app_key"
          label="Enter Property"
          :disable="disabled"
        />
      </div>
      <div class="col q-pa-sm">
        <q-input
          @input="handleInput"
          outlined
          v-model="app_value"
          label="Enter String"
          :disable="disabled"
        />
      </div>
    </div>

    <div class="row" v-if="mode == 'photo'">
      <div class="col q-pa-sm">
        <q-input
          @input="handleInput"
          outlined
          v-model="app_key"
          label="Enter Property"
          :disable="disabled"
        />
      </div>
      <div class="col q-pa-sm">
        <q-input
          @input="handleInput"
          outlined
          v-model="app_value"
          label="Enter photo"
          :disable="disabled"
        />
      </div>
    </div>
    <div class="row" v-if="mode == 'date'">
      <div class="col q-pa-sm q-pt-md">
        <q-input
          @input="handleInput"
          outlined
          v-model="app_key"
          :label="this.requiredKey != null ?'Required':'Enter Property'"
          :disable="disabled"
          :readonly="readOnly"
        />
      </div>
      <div class="col q-pa-md" style="max-width: 300px">
        <q-input
          @input="handleInput"
          :disable="disabled"
          filled
          outlined
          v-model="date"
          mask="date"
          :rules="['date']"
        >
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                <q-date
                  v-model="date"
                  :disable="disabled"
                  @input="() => {$refs.qDateProxy.hide();handleInput()}"
                />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
      <div class="col q-pa-md">
        <q-input
          @input="handleInput"
          :disable="disabled"
          filled
          outlined
          v-model="time"
          mask="time"
          :rules="['time']"
        >
          <template v-slot:append>
            <q-icon name="access_time" class="cursor-pointer">
              <q-popup-proxy transition-show="scale" transition-hide="scale">
                <q-time v-model="time" @input="handleInput" :disable="disabled" />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["disabled", "mode", "value", "required-key"],
  data() {
    return {
      app_key: "",
      app_value: "",
      mask: "DD-MM-YYYY HH:mm",
      date: "2019/09/04",
      time: "10:56",
      readOnly: false
    };
  },
  methods: {
    handleInput(e) {
      let key = "";
      let value = "";
      const mode = this.mode;
      const disabled = this.disabled;
      if (mode == "date") {
        key = this.app_key;
        value = `${this.date} ${this.time}`;
      } else {
        key = this.app_key;
        value = this.app_value;
      }
      this.$emit("input", { key, value, mode, disabled });
    }
  },
  mounted() {
    if (this.requiredKey != null) {
      this.app_key = this.requiredKey;
      this.readOnly = true;
    }
  }
};
</script>

<style scoped>
</style>
