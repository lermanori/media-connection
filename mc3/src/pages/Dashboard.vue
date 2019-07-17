<template>
  <q-page>
    <div class="row justify-center q-pa-md">
      <div class="col-12">
        <q-container>
          <div class="text-h5 text-center">DashBoard</div>
          <q-card bordered class="my-card" style="min-height:50vh;">
            <q-card-section>
              <div class="text-h6 text-center">
                <u>PROGRESSION:</u>
              </div>
            </q-card-section>

            <app-progress
              label="label"
              :progress1="0.1"
              :progress2="0.7"
              v-for="index in 3"
              :key="index"
            />
            <q-separator class="q-mb-lg" color="indigo-8"/>
            <q-card-section>
              <q-btn fab icon="add" color="cyan" class="shadow-24"/>
            </q-card-section>
          </q-card>
        </q-container>

        <div class="row justify-between">
          <div class="col-md-5 col-xs-12 q-my-lg">
            <q-container>
              <q-card bordered class="my-card">
                <q-card-section>
                  <div class="text-h6 text-center">
                    <u>NOTIFICATION:</u>
                  </div>
                  <app-notification v-for="i in 3" :key="i"/>
                  <q-separator class="q-mb-lg" color="indigo"/>
                </q-card-section>
              </q-card>
            </q-container>
          </div>
          <div class="col-md-5 col-xs-12 q-my-lg">
            <q-container>
              <q-card bordered class="my-card">
                <q-card-section>
                  <div class="text-h6 text-center">
                    <u>CONNECTIONS:</u>
                  </div>
                </q-card-section>
                <app-connection/>
              </q-card>
            </q-container>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>


<script>
import services from "../services.js";
import progress from "../components/missionProgression";
import notification from "../components/notification";
import connection from "../components/connection";

export default {
  components: {
    "app-progress": progress,
    "app-notification": notification,
    "app-connection": connection
  },
  data() {
    return {
      user: {},
      label: "label",
      progress1: 0.7,
      progress2: 0.5
    };
  },

  created() {
    this.user = services.auth();
  }
};
</script>

<style scoped>
</style>
