<template>
  <q-page>
    <div class="row justify-center q-pa-md">
      <div class="col-md-6 col-xs-12">
        <div class="text-h5 text-center">DashBoard</div>
        <q-list>
          <q-expansion-item popup icon="timeline" :label="'PROGRESSION:'">
            <q-card bordered class="my-card" style="min-height:25vh;">
              <q-card-section>
                <div class="text-h6 text-center"></div>
              </q-card-section>
              <div class="row justify-center" v-if="!visible">
                <q-circular-progress indeterminate size="10em" color="indigo" class="q-mx-auto" />
              </div>
              <div class="row justify-center" v-if="visible && Progression.length == 0 ">
                <span class="text-caption">
                  NO DATA.
                  <br />create a new post.
                </span>
              </div>
              <template v-if="visible && Progression.length > 0 ">
                <app-progress
                  :label="progress.group"
                  :progress1="progress.time"
                  :progress2="progress.progress"
                  v-for="(progress,index) in Progression"
                  :key="index"
                  @click="progressBarClick_handle(progress)"
                />
              </template>
              <q-separator class="q-mb-lg" color="black-2" />
            </q-card>
          </q-expansion-item>
        </q-list>
        <div class="row justify-between">
          <div class="col-md-12 col-xs-12 q-my-lg">
            <q-list>
              <q-expansion-item popup icon="contacts" :label="'CONNECTIONS:'">
                <q-card bordered class="my-card">
                  <app-connection />
                </q-card>
              </q-expansion-item>
            </q-list>
          </div>
          <!--<div class="col-md-5 col-xs-12 q-my-lg">
            <q-card bordered class="my-card">
              <q-card-section>
                <div class="text-h6 text-center">
                  <u>NOTIFICATION:</u>
                </div>
                <app-notification v-for="i in 3" :key="i" />
                <q-separator class="q-mb-lg" color="indigo" />
              </q-card-section>
            </q-card>
          </div>-->
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
import axiosConfig from "../axiosConfig";

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
      progression: [],
      visible: false,
      axiosConfig: axiosConfig
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
      const res = groups.find(x => x._id == id);
      return res != undefined ? res.group_name : undefined;
    },
    progressBarClick_handle(arg) {
      this.$store.dispatch("Group/setGroupID", arg.groupId).then(() => {
        this.$store.dispatch("Post/getAllPosts").then(() => {
          const url = `/post/${arg.id}`;
          this.$router.push(url);
        });
      });
    }
  },
  async created() {
    this.visible = false;
    await this.$store.dispatch("Friend/syncFriends");
    await this.$store.dispatch("Group/syncGroups");
    await this.$store.dispatch("Post/getAllPosts").then(x => {
      const mapped = x
        .filter(x => x.status != "approved")
        .map(val => {
          return {
            id: val.id,
            uploadDate: Date.parse(
              val.filterdProperties.find(x => x.key == "upload date").value
            ),
            status: val.status,
            group: val.groupID
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
      this.visible = true;
    });
  }
};
</script>

<style scoped>
.my-card {
  max-width: 800px;
}
</style>
