<template>
  <q-card>
    <q-card-section>
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="Groups" label="Groups" />
        <q-tab name="Friends" label="Friends" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="Groups">
          <div class="row q-gutter-md justify-center">
            <q-btn
              color="indigo"
              v-for="(index,i) in Groups"
              :key="i"
              :to="'/groups/' + index._id"
            >{{index.group_name}}</q-btn>
          </div>

          <q-separator class="q-mt-md" />
          <div class="row justify-center q-mt-md">
            <q-btn @click="popup = !popup">create group</q-btn>
          </div>
        </q-tab-panel>

        <q-tab-panel name="Friends">
          <!-- 

          -->

          <q-list bordered class="rounded-borders" style>
            <q-item-label header>Friends</q-item-label>

            <q-item
              clickable
              v-ripple
              v-for="(item,index) in Friends"
              :key="index"
              :to="'/profile/'+item._id"
            >
              <q-item-section avatar>
                <q-avatar>
                  <q-img contains :style="{height:'100%'}" :src="baseURL+'/'+item.profilePicture" />
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label lines="1">{{item.email}}</q-item-label>
              </q-item-section>
            </q-item>

            <q-separator inset="item" />
          </q-list>
          <div class="row">
            <q-input
              outlined
              label="enter email and press add"
              :style="{width:'100%'}"
              v-model="addedUserEmail"
              class="q-mt-sm"
            />
          </div>
          <div class="row justify-between q-mt-sm">
            <q-btn @click="$store.dispatch('Friend/syncFriends')" icon="sync" />
            <q-btn
              @click="addedUserEmail != '' ? $store.dispatch('Friend/add',addedUserEmail) : ()=>{}"
              color="cyan"
              icon="add"
            />
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </q-card-section>
    <q-dialog v-model="popup">
      <q-card bordered class="q-pa-md">
        <q-card-section>
          <div class="text-h6">Add a New Group</div>
        </q-card-section>

        <q-card-section>
          <q-input v-model="newGroup.group_name" label="Group Name"></q-input>
          <q-input v-model="newGroup.group_desc" label="Group Description"></q-input>
        </q-card-section>
        <q-btn icon="check" color="cyan" class="shadow-24" @click="addGroup(newGroup)" />
      </q-card>
    </q-dialog>
  </q-card>
</template>

<script>
import baseURL from "../baseUrl";
import axiosConfig from "../axiosConfig";
export default {
  data() {
    return {
      tab: "Groups",
      popup: false,
      newGroup: {
        group_name: "",
        group_desc: ""
      },
      groups: [],
      addedUserEmail: "",
      baseURL: baseURL.localBaseUrl
    };
  },
  computed: {
    Groups() {
      return this.$store.getters["Group/Groups"];
    },
    AxiosConfig() {
      return axiosConfig.axiosConfig();
    },
    Friends() {
      return this.$store.getters["Friend/friends"];
    }
  },
  methods: {
    async addGroup() {
      await this.$store.dispatch("Group/addGroup", this.newGroup);
      this.$store.dispatch("Group/syncGroups");
      this.newGroup = {
        group_name: "",
        group_desc: ""
      };
      this.popup = false;
    }
  },
  created() {
    this.$store.dispatch("Group/syncGroups");
  }
};
</script>

<style scoped>
</style>
