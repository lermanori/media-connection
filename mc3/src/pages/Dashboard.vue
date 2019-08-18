<template>
  <q-page>
    <div class="row justify-center q-pa-md">
      <div class="col-12">
        <q-container>
          <div class="text-h5 text-center">DashBoard</div>
          <q-card bordered class="my-card" style="min-height:25vh;">
            <q-card-section>
              <div class="text-h6 text-center">
                <u>PROGRESSION:</u>
              </div>
            </q-card-section>
            <app-progress
              :label="progress.group"
              :progress1="progress.time"
              :progress2="progress.progress"
              v-for="(progress,index) in Progression"
              :key="index"
              @click="progressBarClick_handle(progress)"
            />
            <q-separator class="q-mb-lg" color="indigo-8" />
          </q-card>
        </q-container>

        <div class="row justify-between">
          <div class="col-md-5 col-xs-12 q-my-lg">
            <q-container>
              <q-card bordered class="my-card">
                <q-card-section>
                  <div class="text-h6 text-center">
                    <u>CONNECTIONS:</u>
                  </div>
                </q-card-section>
                <app-connection />
              </q-card>
            </q-container>
          </div>
          <div class="col-md-5 col-xs-12 q-my-lg">
            <q-container>
              <q-card bordered class="my-card">
                <q-card-section>
                  <div class="text-h6 text-center">
                    <u>NOTIFICATION:</u>
                  </div>
                  <app-notification v-for="i in 3" :key="i" />
                  <q-separator class="q-mb-lg" color="indigo" />
                </q-card-section>
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
import postConverter from "../mixins/PostConverter";

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
      progress2: 0.5,
      progression: []
    };
  },
  computed: {
    Progression() {
      return this.progression;
    }
  },
  methods: {
    convertStatusToNumber(status) {
      let res = 0;
      switch (status) {
        case "new request":
          res = 0.25;
          break;
        case "in-process":
          res = 0.5;
          break;
        case "waiting for approval":
          res = 0.75;
          break;
      }
      return res;
    },
    convertGroupIdToName(id) {
      const groups = this.$store.getters["Group/Groups"];
      console.log(groups);
      const res = groups.find(x => x._id == id).group_name;
      console.log(res);
      return res;
    },
    progressBarClick_handle(arg) {
      this.$store.dispatch("Group/setGroupID", arg.groupId).then(() => {
        this.$store.dispatch("Post/syncPosts", arg.groupId).then(() => {
          console.log(arg.status);
          const url = `/${arg.id}/${
            arg.status == "waiting for approval" ? "approval" : "image-editor"
          }`;
          this.$router.push(url);
        });
      });
    }
  },

  created() {
    this.$store.dispatch("Group/syncGroups");
    this.$store.dispatch("Post/getAllPosts").then(x => {
      console.log(x);
      const mapped = x.data
        .filter(x => x.status != "approved")
        .map(val => {
          return {
            id: val._id,
            uploadDate: Date.parse(
              val.properties.find(x => x.key == "upload date").value
            ),
            status: val.status,
            group: val.group
          };
        });
      const numberd = mapped.map(x => {
        return {
          id: x.id,
          msTillUpload: x.uploadDate - new Date().getTime(),
          status: x.status,
          statusNumber: this.convertStatusToNumber(x.status),
          group: this.convertGroupIdToName(x.group),
          groupId: x.group
        };
      });
      const future = numberd.filter(x => x.msTillUpload > 0);
      const squashed = future.map(x => {
        return {
          id: x.id,
          status: x.status,
          dTillUploadDivByTen: x.msTillUpload / 1000 / 60 / 60 / 24 / 10,
          statusNumber: x.statusNumber,
          group: x.group,
          groupId: x.groupId
        };
      });
      const pretty = squashed.map(x => {
        return {
          id: x.id,
          status: x.status,
          time: 1 - x.dTillUploadDivByTen,
          progress: x.statusNumber,
          group: x.group,
          groupId: x.groupId
        };
      });
      this.progression = pretty;
    });
  }
};
</script>

<style scoped>
</style>
