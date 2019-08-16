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
          <div v-for="(index,i) in Groups" :key="i">
            <div class="row justify-center">
              <div class="col-12 text-center">
                <div class="text-h6">{{index.group_name}}</div>
              </div>
            </div>
            <div class="q-my-md row wrap justify-between">
              <div class="col-6">Description: {{index.group_desc}}</div>
              <div class="col-4 text-center">
                <q-btn round color="indigo" icon="my_location" :to="'/group/' + index._id" />
              </div>
            </div>
            <q-separator class="q-mt-md" />
          </div>
          <div class="row justify-center q-mt-md">
            <q-btn @click="popup = !popup">create group</q-btn>
          </div>
        </q-tab-panel>

        <q-tab-panel name="Friends">
          <div class="text-h6">Friends</div>Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </q-tab-panel>
      </q-tab-panels>
    </q-card-section>
    <q-dialog v-model="popup">
      <q-card bordered class="my-card">
        <q-card-section>
          <div class="text-h6">Add a New Group</div>
        </q-card-section>

        <q-card-section>
          <q-input v-model="newGroup.group_name" label="Group Name"></q-input>
          <q-input v-model="newGroup.group_desc" label="Group Description"></q-input>
        </q-card-section>
        <q-btn fab icon="add" color="cyan" class="shadow-24" @click="addGroup(newGroup)" />
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
      tab: "Friends",
      popup: false,
      newGroup: {
        group_name: "",
        group_desc: ""
      },
      groups: []
    };
  },
  computed: {
    Groups() {
      return this.groups;
    },
    AxiosConfig() {
      return axiosConfig.axiosConfig();
    }
  },
  methods: {
    addGroup(group) {
      let URL = baseURL.localBaseUrl + "/api/group/create";
      this.$axios.post(URL, this.newGroup, this.AxiosConfig).then(() => {
        this.getGroups();
      });
    },
    getGroups() {
      let URL = baseURL.localBaseUrl + "/api/group";
      this.$axios.get(URL, this.AxiosConfig).then(data => {
        this.groups = data.data;
        this.newGroup = {};
      });
    }
  },
  created() {
    this.getGroups();
  }
};
</script>

<style scoped>
</style>
