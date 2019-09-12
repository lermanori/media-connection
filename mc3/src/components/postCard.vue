<template>
  <q-card class="card">
    <q-card-section>
      <span class="text-h6">
        status:
        <u>{{post.status}}</u>
      </span>
    </q-card-section>
    <q-card-section>
      properties:
      <q-list bordered separator>
        <q-item>
          <q-item-section v-for="(prop,index) in post.filterdProperties" :key="index">
            <q-item-label overline>{{prop.key}}</q-item-label>
            <q-item-label>{{prop.value}}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>
    <q-card-section v-if="post.commits.length > 0">
      commits:
      <q-list bordered separator class="q-mt-sm q-mb-md">
        <q-expansion-item v-for="(prop,index) in post.commits" :key="index">
          <template v-slot:header>
            <q-item-section thumbnail>
              <img :src="mybaseUrl + prop.path2" />
            </q-item-section>

            <q-item-section class="q-mt-sm">
              <q-item-label>{{prop.user.email}}</q-item-label>
              <q-item-label caption>{{prop.commitMessage}}</q-item-label>
            </q-item-section>
            <q-item-section side top>
              <q-item-label caption>{{Date(prop.time).split(" ").slice(0,3).join(" ") }}</q-item-label>
            </q-item-section>
          </template>

          <q-card>
            <q-card-section>
              <div class="text-body">
                <u>commit message:</u>
                {{prop.commitMessage}}
              </div>
              <div class="text-body">
                <u>time uploaded:</u>
                {{Date(prop.time).split(" ").slice(0,5).join(" ")}}
              </div>
              <div class="text-body">
                <u>done:</u>
                {{prop.done}}
              </div>
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </q-list>
    </q-card-section>
    <q-card-actions vertical>
      <q-btn
        class
        :icon="(post.status=='waiting for approval'?'check':'edit')"
        :color="(post.status=='waiting for approval'?'green':'indigo')"
        :to="'/' + post.id + (post.status=='waiting for approval' ?'/approval':'/image-editor')"
      ></q-btn>
      <q-btn
        v-if="post.status=='approved'"
        class
        icon="share"
        color="pink"
        @click="handle_share(post)"
      ></q-btn>
      <q-btn
        class
        v-if="post.status=='approved'"
        icon="timer"
        color="black"
        @click="handle_time(post)"
      ></q-btn>
    </q-card-actions>
    <q-dialog v-model="openDateDialog" persistent>
      <app-date-dialog @set="handle_set" />
    </q-dialog>

    <!-- <h6 class="q-mb-none">{{post}}</h6> -->
  </q-card>
</template>

<script>
import mybaseUrl from "../baseUrl";
import baseUrl from "../baseUrl";
import axiosConfig from "../axiosConfig";
import appDateDialog from "../components/dateDialog.vue";
export default {
  components: {
    "app-date-dialog": appDateDialog
  },
  props: ["post"],
  data() {
    return {
      mybaseUrl: mybaseUrl.localBaseUrl,
      openDateDialog: false,
      subscription: null
    };
  },
  methods: {
    handle_set(arg) {
      const timeStr = `${arg.date} ${arg.time}`;
      const date = Date.parse(timeStr);
      this.$axios.post(
        `${this.mybaseUrl}/api/subscription/notify`,
        {
          subscription: this.subscription,
          message: "reminder to upload",
          timeToNotify: date
        },
        axiosConfig.axiosConfig()
      );

      console.log(date);
      console.log(this.subscription);
    },
    handle_share(post) {
      console.log(post);
      if (navigator.share) {
        navigator.share({
          title: "mc3-upload",
          url: `${this.mybaseUrl}${this.post.path}`
        });
      } else {
        console.log("hey");
        this.$axios({
          url: `${this.mybaseUrl}${this.post.path}`,
          method: "GET",
          responseType: "blob" // important
        }).then(response => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "image.png"); //or any other extension
          document.body.appendChild(link);
          link.click();
        });
      }
    },
    async handle_time(arg) {
      console.log(arg);
      if ("serviceWorker" in navigator && "PushManager" in window) {
        console.log("Service Worker and Push is supported");
        const registration = await navigator.serviceWorker.ready;
        const subscription = await registration.pushManager.getSubscription();
        this.subscription = subscription;
        if (subscription == null) {
          const publicKey =
            "BFlWZsn4o7jzPoQKglsVMsxoLM9scn4Y_dCRKF9brvUbaZFIDlNjmoqKwwLdG88ny-5szJXjjB9iUpvE7z6VvrY";
          const options = {
            userVisibleOnly: true,
            applicationServerKey: publicKey
          };
          const permission = await window.Notification.requestPermission();
          // value of permission can be 'granted', 'default', 'denied'
          // granted: user has accepted the request
          // default: user has dismissed the notification permission popup by clicking on x
          // denied: user has denied the request.
          if (permission !== "granted") {
            throw new Error("Permission not granted for Notification");
          }
          const newSubscription = await registration.pushManager.subscribe(
            options
          );
          if (permission == "granted") {
            console.log(newSubscription);
            const res = await this.$axios.post(
              baseUrl.localBaseUrl + "/api/subscription",
              newSubscription,
              axiosConfig.axiosConfig()
            );
            console.log(res);
          }
        } else {
          console.log("already subscribed");
          console.log(subscription);
        }
        this.openDateDialog = true;
      }
    }
  }
};
</script>

<style  scoped>
.card {
  width: 100%;
  max-width: 500px;
}
</style>