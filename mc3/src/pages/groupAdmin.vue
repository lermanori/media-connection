<template>
  <div class="q-gutter-md">
    <div class="text-center">
      <h1>{{group.group_name}}</h1>
    </div>
    <div class="row justify-center">
      <q-card style="max-width:700px">
        <q-card-section>
          <u class="text-caption">admins:</u>
        </q-card-section>
        <q-card-section>
          <q-list bordered separator>
            <q-item v-for="(member,index) in Admins" :key="index">
              <div class="row justify-center q-gutter-sm">
                <div class="col-xs-12 text-center">
                  <q-chip square clickable @click="$router.push('/profile/'+member._id)">
                    <q-avatar>
                      <q-img
                        contains
                        style="height:100%"
                        :src="baseUrl + '/' + member.profilePicture"
                      />
                    </q-avatar>
                    {{member.email}}
                  </q-chip>
                </div>
              </div>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </div>
    <div class="row justify-center">
      <q-card style="max-width:700px">
        <q-card-section>
          <u class="text-caption">Permissions:</u>
        </q-card-section>
        <q-card-section>
          <q-list bordered separator>
            <q-item v-for="(member,index) in Members" :key="index">
              <div class="row justify-center q-gutter-sm">
                <div class="col-md-4 col-xs-12 text-center">
                  <q-chip square clickable @click="$router.push('/profile/'+member._id)">
                    <q-avatar>
                      <q-img
                        contains
                        style="height:100%"
                        :src="baseUrl + '/' + member.profilePicture"
                        :key="baseUrl + '/' + member.profilePicture"
                      />
                    </q-avatar>
                    {{member.email}}
                  </q-chip>
                </div>
                <div class="col-md-3 col-xs-12 text-center">
                  <q-btn
                    label="take out"
                    icon="delete"
                    class="q-ml-md q-mt-none q-pa-xs"
                    @click="handle_userDelete(member)"
                  />
                </div>
                <div class="col-md-2 col-xs-12 text-center">
                  <q-btn
                    label="save"
                    icon="save"
                    class="q-ml-md q-mt-none q-pa-xs"
                    @click="handle_updatePermissions(member,index)"
                  />
                </div>
                <div class="col-md-10 col-xs-12">
                  <q-option-group
                    inline
                    :options="options"
                    label="Permission:"
                    type="checkbox"
                    v-model="permissions[index]"
                  />
                </div>
              </div>
            </q-item>
          </q-list>
        </q-card-section>
        <q-card-section>
          <q-list bordered separator>
            <q-item>
              <div class="row justify-center q-gutter-sm">
                <div class="col-md-4 col-xs-12 text-center">
                  <q-chip square>Default Permissons</q-chip>
                </div>
                <div class="col-md-2 col-xs-12 text-center">
                  <q-btn
                    label="save"
                    icon="save"
                    class="q-ml-md q-mt-none q-pa-xs"
                    @click="handle_setDefaultPermissions"
                  />
                </div>
                <div class="col-md-10 col-xs-12">
                  <q-option-group
                    inline
                    :options="defaultOptions"
                    label="Permission:"
                    type="checkbox"
                    v-model="defaultPermissionsModel"
                  />
                </div>
              </div>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </div>
    <div class="row justify-center">
      <q-card style="max-width:700px">
        <q-card-section>
          <u class="text-caption">Posts:</u>
        </q-card-section>
        <q-card-section>
          <q-list bordered separator>
            <q-expansion-item
              :header-class="{ 'deleted-item': Deleted[index] }"
              v-for="(post,index) in Posts"
              :key="index"
            >
              <template v-slot:header>
                <q-item-section thumbnail v-if="post.path !='' && post.path !=undefined">
                  <img :src="baseUrl + post.path" />
                </q-item-section>

                <q-item-section class="q-mt-sm q-gutter-md">
                  <q-item-label>
                    <u>status:</u>
                    {{post.status}}
                  </q-item-label>
                  <q-btn icon="delete" @click.stop="handle_removePost(post)" />
                </q-item-section>
                <q-item-section side top>
                  <!-- <q-item-label caption>{{Date(prop.time).split(" ").slice(0,3).join(" ") }}</q-item-label> -->
                </q-item-section>
              </template>

              <app-post-card :post="post" :key="index" class="col-6" />
            </q-expansion-item>
          </q-list>
        </q-card-section>
      </q-card>
    </div>
    <div>
      <q-card class="q-mb-xl">
        <q-card-section>
          <q-list bordered separator>
            <q-expansion-item>
              <template v-slot:header>
                <q-item-section class="q-gutter-md">
                  <q-item-label class="text-center">
                    <u>Delete Group</u>
                  </q-item-label>
                </q-item-section>
                <q-item-section side top>
                  <!-- <q-item-label caption>{{Date(prop.time).split(" ").slice(0,3).join(" ") }}</q-item-label> -->
                </q-item-section>
              </template>
              <q-card class="row justify-center">
                <q-card-actions>
                  <q-btn icon="delete" @click="deleteGroup_handle" class="text-center" />
                </q-card-actions>
              </q-card>
            </q-expansion-item>
          </q-list>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import baseUrl from "../baseUrl";
import postCard from "../components/postCard";
import { syncGroups } from "../store/Group/actions";
export default {
  components: {
    "app-post-card": postCard
  },
  data() {
    return {
      defaultPermissionsModel: [],
      deleted: [],
      members: [],
      admins: [],
      group: {},
      baseUrl: baseUrl.localBaseUrl,
      permissions: [],
      options: [
        { label: "Requests", value: "request" },
        { label: "In-Process", value: "in-process", color: "green" },
        {
          label: "Waiting For Approval",
          value: "waiting-for-approval",
          color: "indigo"
        },
        {
          label: "default",
          value: "default",
          color: "purple"
        }
      ]
    };
  },
  computed: {
    defaultOptions() {
      return this.options.filter(x => x.label != "default");
    },

    Group() {
      return this.$store.getters["Group/Groups"].find(
        x => x._id == this.group._id
      );
    },
    Members() {
      return this.members;
    },
    Admins() {
      return this.admins;
    },
    Posts() {
      return this.$store.getters["Post/getPosts"].filter(
        x => x.groupID == this.group._id
      );
    },
    Deleted() {
      return this.Posts.map(x => true);
    }
  },

  methods: {
    async handle_setDefaultPermissions() {
      await this.$store.dispatch("Group/setDefaultPermissions", {
        groupId: this.$store.getters["Group/currentGroupID"],
        defaultPermissions: this.defaultPermissionsModel
      });
    },
    async handle_updatePermissions(arg, idx) {
      const res = await this.$store.dispatch("Group/updatePermissions", {
        group: this.$store.getters["Group/currentGroupID"],
        friend: { _id: arg._id },
        updatedPermissions: this.permissions[idx].join(" ")
      });
      await this.updateData();
    },
    async handle_userDelete(member) {
      const res = await this.$store.dispatch("Group/removeUser", {
        groupId: this.group._id,
        friendshipId: this.group.members.find(x => x.memberUid == member.uid)
          ._id
      });
      await this.$store.dispatch("Group/syncGroups");
      await this.updateData();
    },
    async handle_removePost(post) {
      this.show(post);
      await this.$store.dispatch("Group/removePost", {
        postId: post.id,
        groupId: post.groupID
      });
      await this.$store.dispatch("Post/getAllPosts", post.id);
    },
    show(arg) {
      console.log(arg);
    },
    async deleteGroup_handle() {
      const res = await this.$store.dispatch(
        "Group/deleteGroup",
        this.$route.params.groupid
      );
      if (res.status == 200) {
        this.$router.push("/groups");
      }
    },
    async membersToUsers() {
      const uids = this.Group.members
        .filter(x => x.role != "admin")
        .map(x => x.memberUid);
      const adminUid = this.group.members
        .filter(x => x.role == "admin")
        .map(x => x.memberUid);
      const roles = this.group.members
        .filter(x => x.role != "admin")
        .map(x => x.role.split(" "));
      const membersAsUsers = await this.$store.dispatch(
        "Friend/transformUidToUsers",
        uids
      );
      const adminsAsUsers = await this.$store.dispatch(
        "Friend/transformUidToUsers",
        adminUid
      );
      this.members = membersAsUsers.data.result;
      this.admins = adminsAsUsers.data.result;
      this.permissions = roles;
    },
    async updateData() {
      await this.$store.dispatch("Group/syncGroups");
      this.group = this.$store.getters["Group/Groups"].find(
        x => x._id == this.$route.params.groupid
      );
      await this.membersToUsers();
    }
  },

  async created() {
    await this.updateData();
    const res = await this.$store.dispatch(
      "Group/getDefaultPermissions",
      this.$store.getters["Group/currentGroupID"]
    );
    console.log(res);
    this.defaultPermissionsModel = res.data.defaultPermissions;
  }
};
</script>

<style scoped>
</style>