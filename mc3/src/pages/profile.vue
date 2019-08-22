<template>
  <q-page>
    <div v-if="(!ShowCreate)&&(permission!='undefined')">
      <h6 class="q-my-none">{{`Profile: ${email}`}}</h6>
      <div class="q-pa-md q-gutter-sm">
        image:
        <div class="row justify-center q-gutter-sm">
          <div class="col-auto">
            <q-card flat bordered v-if="profilePic">
              <q-card-section>
                <!-- <img
                  style="height:250px;width:250px"
                  src="https://previews.123rf.com/images/salamatik/salamatik1801/salamatik180100019/92979836-profile-anonymous-face-icon-gray-silhouette-person-male-default-avatar-photo-placeholder-isolated-on.jpg"
                />-->
                <q-img style="height:250px;width:250px" :src="`${baseUrl}/${ProfilePic}`" />
              </q-card-section>
            </q-card>
          </div>
          <div class="col-auto" v-if="(permission=='owner')">
            <q-uploader
              ref="uploader"
              label="Restricted to images"
              accept=".jpg, image/*"
              style="max-width: 300px;height:100%"
              :multiple="false"
              :hide-upload-btn="true"
              :url="`${baseUrl}/api/profile/profile-picture`"
              @added="uploadedImage=true"
              @removed="uploadedImage=false"
              @uploaded="showRes"
              @failed="showRes"
              method="PUT"
              :headers="[{name: 'Authorization', value:axiosConfig.headers.Authorization }]"
            />
          </div>
        </div>
      </div>
      <div class="q-pa-md q-gutter-sm">
        public:
        <q-editor v-if="(permission=='owner')" v-model="editorPublic" min-height="5rem" />

        <q-card flat bordered v-if="permission!='owner'">
          <q-card-section v-html="editorPublic" />
        </q-card>
      </div>
      <div class="q-pa-md q-gutter-sm" v-if="(permission=='owner') || (permission=='friends')">
        friends:
        <q-editor v-if="(permission=='owner')" v-model="editorFriends" min-height="5rem" />
        <q-card flat bordered v-if="permission!='owner'">
          <q-card-section v-html="editorFriends" />
        </q-card>
      </div>
      <div class="q-pa-md q-mb-xl q-gutter-sm" v-if="(permission=='owner')">
        private:
        <q-editor v-if="(permission=='owner')" v-model="editorPrivate" min-height="5rem" />
        <q-card flat bordered v-if="permission!='owner'">
          <q-card-section v-html="editorPrivate" />
        </q-card>
      </div>
      <q-btn
        v-if="permission=='owner'"
        color="green"
        icon="save"
        class="fixed-bottom"
        :style="{width:'100%',height:'50px'}"
        @click="save_handle"
      />
    </div>

    <div v-if="ShowCreate">
      <h3 class="text-center">
        No Profile Data.
        <br />To Create Please Press The Button.
      </h3>
      <q-btn
        icon="create"
        :style="{width:'100%',height:'65px'}"
        class="fixed-bottom"
        color="purple"
        @click="created_handle"
      />
    </div>
  </q-page>
</template>

<script>
import baseUrl from "../baseUrl";
import axiosConfig from "../axiosConfig";
export default {
  props: ["id"],
  data() {
    return {
      axiosConfig: axiosConfig.axiosConfig(),
      uploadedImage: false,
      baseUrl: baseUrl.localBaseUrl,
      user: {},
      showCreate: false,
      loaded: false,
      permission: "",
      profilePic: "",
      email: "",
      editorPublic: "What you see is <b>what</b> you get.",
      editorFriends: "What you see is <b>what</b> you get.",
      editorPrivate: "What you see is <b>what</b> you get."
    };
  },
  computed: {
    ShowCreate() {
      return this.showCreate;
    },
    ProfilePic() {
      return this.profilePic;
    }
  },
  methods: {
    showRes(info) {
      console.log(info);
    },
    async created_handle() {
      const res = await this.$store.dispatch("Profile/create");
      await this.refresh();
    },
    async save_handle() {
      if (this.uploadedImage == true) {
        this.$refs.uploader.upload();
      }
      const res = await this.$store.dispatch("Profile/update", {
        own: this.editorPrivate,
        friends: this.editorFriends,
        public: this.editorPublic
      });
      await this.refresh();
    },
    async refresh() {
      try {
        const result = await this.$store.dispatch("Profile/get", this.id);
        const user = result.data;
        this.user = user;
        console.log(user);
        if (user.permission == "owner" && user.message == "profile undefined") {
          console.error("should create");
          this.showCreate = true;
        }
        this.loaded = true;
        this.permission = user.permission;
        this.editorPrivate =
          user.profile.own == undefined ? "" : user.profile.own;
        this.editorFriends =
          user.profile.friends == undefined ? "" : user.profile.friends;
        this.editorPublic =
          user.profile.public == undefined ? "" : user.profile.public;
        this.profilePic =
          user.profile.profilePicture == undefined
            ? ""
            : user.profile.profilePicture;
        this.email = user.profile.email == undefined ? "" : user.profile.email;
      } catch (err) {
        console.log(err);
      }
    }
  },
  async created() {
    await this.refresh();
  }
};
</script>

<style scoped>
</style>