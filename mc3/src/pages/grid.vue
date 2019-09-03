<template>
  <q-page>
    <q-page-container>
      <div class="text-center">
        <q-btn
          class="fixed-bottom q-mt-xl w-100"
          icon="edit"
          label="admin"
          :style="{width:'100%',height:'50px'}"
          color="green"
          :to="`/group/${$store.getters['Group/currentGroupID']}/admin`"
        />
        <div
          class="text-h6"
        >Name: {{$store.getters["Group/Groups"].find((x)=>x._id == $store.getters["Group/currentGroupID"]).group_name }}</div>
      </div>
      <div class="row justify-center q-gutter-sm">
        <div class="col-md-5 col-xs-12 q-mb-lg">
          <q-card class="my-card">
            <q-card-section class="bg-indigo text-white text-center">
              <div class="text-h6">Post Waiting For Approval</div>
              <div class="text-h4" v-if="postLoaded">{{NumberOfWaitingPosts}}</div>
              <q-btn to="/post/waiting-for-approval">to submissions</q-btn>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-md-5 col-xs-12 q-mb-lg">
          <q-card class="my-card">
            <q-card-section class="bg-blue darken 4 text-white text-center">
              <div class="text-h6">Posts In Process</div>
              <div class="text-h4" v-if="postLoaded">{{NumberOfInProcessPosts}}</div>
              <q-btn to="/post/in-process">to In Process</q-btn>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-md-5 col-xs-12 q-mb-lg">
          <q-card class="my-card">
            <q-card-section class="bg-cyan text-white text-center">
              <div class="text-h6">Posts requested</div>
              <div class="text-h4" v-if="postLoaded">{{NumberOfNewPosts}}</div>
              <q-btn to="/post/requests">to requests</q-btn>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </q-page-container>

    <q-page-container class="q-mx-sm q-mb-xl">
      <div class="row justify-center q-mb-md">
        <div class="q-gutter-sm">
          <q-radio v-model="dataMode" val="instagram" label="Instagram" />
          <q-radio v-model="dataMode" val="in-app" label="In App" />
          <q-radio v-model="dataMode" val="mixed" label="Combined" />
        </div>
      </div>
      <div class="row justify-center" :style="{marginBottom:'9vh'}">
        <div class="col-4" v-for="(img,i) in dynamicDataReverse" :key="i">
          <q-card>
            <q-img
              :src="img.src"
              @click="()=>img.id!=undefined ? $router.push(`/post/${img.id}`):null"
              ratio="1.2"
            >
              <div
                class="absolute-bottom text-subtitle1 text-center q-pa-xs"
              >{{dateToString(img.uploadTime)}}</div>
            </q-img>
          </q-card>
        </div>
      </div>
    </q-page-container>
  </q-page>
</template>

<style>
</style>

<script>
import baseUrl from "../baseUrl";
export default {
  name: "Register",
  data() {
    return {
      baseUrl: baseUrl.localBaseUrl,
      username: "",
      password: "",
      auth: "true",
      data: [],
      postLoaded: false,
      posts: [],
      dataMode: "mixed"
    };
  },
  computed: {
    InstagramData() {
      return this.data.map(x => {
        return {
          src: x.images.standard_resolution.url,
          uploadTime: parseInt(x.created_time) * 1000
        };
      });
    },
    Admin() {
      return (
        this.$store.getters["Group/Groups"].find(
          x => x._id == this.$store.getters["Group/currentGroupID"]
        ).admin == this.$store.getters["User/uid"]
      );
    },
    NumberOfNewPosts() {
      return this.posts.filter(x => x.status === "new request").length;
    },
    NumberOfInProcessPosts() {
      return this.posts.filter(x => x.status === "in process").length;
    },
    NumberOfWaitingPosts() {
      return this.posts.filter(x => x.status === "waiting for approval").length;
    },
    ApprovedPosts() {
      return this.posts
        .filter(x => x.status === "approved")
        .map(x => {
          return {
            src: this.baseUrl + x.path,
            uploadTime: Date.parse(
              x.filterdProperties.find(x => x.key == "upload date").value
            ),
            id: x.id
          };
        });
    },
    mixed() {
      let approved = this.ApprovedPosts;
      let instagram = this.InstagramData;
      let arr = [...approved, ...instagram];
      let res = arr;
      return res;
    },
    dynamicData() {
      switch (this.dataMode) {
        case "instagram":
          return this.InstagramData;
          break;
        case "mixed":
          return this.mixed;
          break;
        case "in-app":
          return this.ApprovedPosts;
          break;
        default:
          return this.mixed;
          break;
      }
    },
    dynamicDataReverse() {
      return this.dynamicData
        .sort((x, y) => x.uploadTime - y.uploadTime)
        .reverse();
    }
  },
  methods: {
    async getInstagramData() {
      let { data } = await this.$axios.get(
        "https://api.instagram.com/v1/users/self/media/recent/?access_token=" +
          this.$store.getters["User/instagram_token"]
      );
      this.data = data.data;
      return;
    },
    dateToString(date) {
      return new Date(date)
        .toString()
        .split(" ")
        .filter((x, idx) => idx < 5)
        .join(" ");
    }
  },
  created() {
    this.getInstagramData();
    this.$store
      .dispatch("Post/syncPosts", this.$store.getters["Group/currentGroupID"])
      .then(result => {
        this.posts = result;
        this.postLoaded = true;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>