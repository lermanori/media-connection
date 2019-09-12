<template>
  <q-page :key="id">
    <div v-if="(!ShowCreate)&&(permission!='undefined')">
      <div class="q-pa-md q-gutter-sm">
        <div class="row justify-center q-gutter-sm">
          <div class="col-auto">
            <q-avatar style="width:250px;height:250px" v-if="profilePic">
              <q-img
                contains
                style="height:250px;width:250px"
                :src="!uploadedImage ? `${baseUrl}/${ProfilePic}?${new Date().getTime()}` : ProfilePic "
              >
                <div
                  class="absolute-full text-subtitle2 flex flex-center overlay-image-add"
                  v-if="(permission=='owner')"
                  style="opacity:0"
                  @click="()=>$refs.uploader.pickFiles()"
                >
                  <q-icon name="add" size="150px" />
                </div>
              </q-img>
            </q-avatar>
          </div>
          <div class="col-auto">
            <q-uploader
              v-show="false"
              ref="uploader"
              label="Restricted to images"
              accept=".jpg, image/*"
              style="max-width: 300px;height:100%"
              :multiple="false"
              :hide-upload-btn="true"
              :url="`${baseUrl}/api/profile/profile-picture`"
              @added="added_handle($event)"
              @removed="uploadedImage=false"
              @uploaded="showRes"
              @failed="showRes"
              method="PUT"
              :headers="[{name: 'Authorization', value:axiosConfig.headers.Authorization }]"
            />
          </div>
        </div>
      </div>
      <h6 class="q-my-none text-center">{{` ${email}`}}</h6>
      <!-- <q-separator inset class="q-px-auto" color="black-2" /> -->
      <div class="row justify-center" v-if="permission=='owner'">
        <template v-for="(i,index) in ownerBar">
          <q-separator vertical :key="'su'+index" />
          <div class="col-2 text-center owner-bar-btn" :key="'u'+index" @click="$router.push(i.to)">
            <div class="text-caption">{{i.label}}</div>
            <div class="text-h6">{{i.value}}</div>
          </div>
          <q-separator vertical :key="'sd'+index" />
        </template>
      </div>
      <div v-if="permission=='friends'">
        <div class="row text-subtitle2 justify-center q-mb-xs q-mx-md">add user to group:</div>
        <div class="row q-px-md">
          <div class="col-9">
            <q-select outlined :options="options" v-model="model" />
          </div>
          <div class="col-3">
            <q-btn
              outline
              text-color="black"
              icon="add"
              :style="{height:'100%',width:'100%'}"
              @click="handle_addToGroup({group:model == null ? null:model.value,friend:{_id:user.profile.id}})"
            />
          </div>
        </div>
      </div>
      <div v-if="permission!='friends' && permission!= 'owner'">
        <div class="row justify-center q-my-md">
          <q-btn
            outline
            color="white"
            text-color="black"
            label="Add Friend"
            @click="$store.dispatch('Friend/add',email)"
          />
        </div>
      </div>

      <q-separator inset class="q-px-auto" color="black-2" />
      <q-list>
        <q-expansion-item popup icon="business" label="public-bio:">
          <div class="q-pa-md q-gutter-sm">
            <q-editor v-if="(permission=='owner')" v-model="editorPublic" min-height="5rem" />

            <q-card flat bordered v-if="permission!='owner'">
              <q-card-section v-html="editorPublic" />
            </q-card>
          </div>
        </q-expansion-item>
        <q-expansion-item popup icon="message" label="friends-bio:">
          <div class="q-pa-md q-gutter-sm" v-if="(permission=='owner') || (permission=='friends')">
            <q-editor v-if="(permission=='owner')" v-model="editorFriends" min-height="5rem" />
            <q-card flat bordered v-if="permission!='owner'">
              <q-card-section v-html="editorFriends" />
            </q-card>
          </div>
        </q-expansion-item>
        <q-expansion-item popup icon="vpn_key" label="private-bio:" v-if="(permission=='owner')">
          <div class="q-pa-md q-mb-xl q-gutter-sm" v-if="(permission=='owner')">
            <q-editor v-if="(permission=='owner')" v-model="editorPrivate" min-height="5rem" />
            <q-card flat bordered v-if="permission!='owner'">
              <q-card-section v-html="editorPrivate" />
            </q-card>
          </div>
        </q-expansion-item>
      </q-list>
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
  watch: {
    id() {
      this.refresh();
    }
  },
  data() {
    return {
      model: null,
      options: [],
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
      editorPrivate: "What you see is <b>what</b> you get.",
      ownerBar: []
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
    added_handle(e) {
      this.uploadedImage = true;
      this.profilePic = e[0].__img.src;
    },
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
      this.uploadedImage = false;
    },
    async handle_addToGroup(item) {
      if (item.group != null) {
        const res = await this.$store.dispatch("Friend/addFriendToGroup", item);
        this.$q.notify({
          message: "added account: " + res.addedUser.email,
          color: "purple"
        });

        await this.$store.dispatch("Group/syncGroups");
      } else {
        alert("no group chosen");
      }
    },
    async getOptionsGroup() {
      await this.$store.dispatch("Group/syncGroups");
      const groups = this.$store.getters["Group/Groups"];
      const parsedGroups = groups.map(x => {
        return { label: `${x.group_name}: ${x.group_desc}`, value: x._id };
      });
      this.options = parsedGroups;
    },
    async refresh() {
      try {
        const result = await this.$store.dispatch("Profile/get", this.id);
        const user = result.data;
        this.user = user;
        if (user.permission == "owner" && user.message == "profile undefined") {
          console.error("should create");
          this.showCreate = true;
        }
        if (user.permission == "owner") {
          this.ownerBar = [
            {
              label: "Friends",
              value: this.$store.getters["Friend/friends"].length,
              to: "/friends"
            },
            {
              label: "Groups",
              value: this.$store.getters["Group/Groups"].length,
              to: "/groups"
            },
            {
              label: "Commits",
              value: this.$store.getters["Post/getPosts"]
                .map(x => x.commits)
                .flat()
                .filter(x => x.user._id == this.id).length,
              to: "/post/commits/" + this.id
            }
          ];
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
            ? "images/anonymous.jpg"
            : user.profile.profilePicture;
        this.email = user.profile.email == undefined ? "" : user.profile.email;
      } catch (err) {
        console.log(err);
      }
    }
  },
  async created() {
    await this.refresh();
    await this.getOptionsGroup();
  }
  // async Updated() {
  //   await this.refresh();
  // }
};
</script>

<style scoped>
.overlay-image-add:hover {
  animation: opacity;
  animation-duration: 500ms;
  animation-direction: normal;
  animation-fill-mode: forwards;
}
.owner-bar-btn:hover {
  animation: hover;
  animation-duration: 500ms;
  animation-direction: normal;
  animation-fill-mode: forwards;
}

@keyframes opacity {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes hover {
  from {
    background-color: 0;
  }
  to {
    background: rgba(0, 0, 0, 0.1);
  }
}
</style>