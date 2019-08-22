<template>
  <q-page>
    <div v-if="(!ShowCreate)&&(permission!='undefined')">
      <h6 class="q-my-none">{{`Profile: ${id}`}}</h6>
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
export default {
  props: ["id"],
  data() {
    return {
      user: {},
      showCreate: false,
      loaded: false,
      permission: "",
      editorPublic: "What you see is <b>what</b> you get.",
      editorFriends: "What you see is <b>what</b> you get.",
      editorPrivate: "What you see is <b>what</b> you get."
    };
  },
  computed: {
    ShowCreate() {
      return this.showCreate;
    }
  },
  methods: {
    async created_handle() {
      const res = await this.$store.dispatch("Profile/create");
      await this.refresh();
    },
    async save_handle() {
      const res = await this.$store.dispatch("Profile/update", {
        own: editorPrivate,
        friends: editorFriends,
        public: editorPublic
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
        this.editorPrivate = user.profile == undefined ? "" : user.profile.own;
        this.editorFriends =
          user.profile == undefined ? "" : user.profile.friends;
        this.editorPublic =
          user.profile == undefined ? "" : user.profile.public;
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