<template>
  <div class="q-pa-md" style="max-width: 300px">
    <q-card>
      <q-card-section>
        <h6 class="q-my-xs">Enter Date And Time</h6>
      </q-card-section>
      <q-input filled v-model="date">
        <template v-slot:prepend>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy transition-show="scale" transition-hide="scale">
              <q-date v-model="date" />
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
      <q-input filled v-model="time">
        <template v-slot:prepend>
          <q-icon name="access_time" class="cursor-pointer">
            <q-popup-proxy transition-show="scale" transition-hide="scale">
              <q-time v-model="time" format24h />
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
      <q-card-actions vertical>
        <q-btn color="green" icon="check" style="width:100%" v-close-popup @click="handle_setTime" />
        <q-btn color="red" icon="cancel" style="width:100%" v-close-popup />
      </q-card-actions>
    </q-card>
  </div>
</template>
<script>
import axiosConfig from "../axiosConfig";
import baseUrl from "../baseUrl";
export default {
  data() {
    return {
      date: "2019-09-11",
      time: "21:16"
    };
  },
  methods: {
    handle_setTime() {
      this.$emit("set", { time: this.time, date: this.date });
    }
  }
};
</script>