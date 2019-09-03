<template>
  <div>
    <h5>
      <u>{{title}}</u>
    </h5>

    <div class="q-pa-md q-mx-auto" style="max-width: 350px">
      <q-list>
        <template v-for="(group,index) in filterdGroups">
          <q-expansion-item
            popup
            :default-opened="filterdGroups.length < 2"
            icon="perm_identity"
            :label="group.group_name"
            :caption="group.group_desc"
            :key="index"
          >
            <app-group-card :group="group" />
          </q-expansion-item>
        </template>
      </q-list>
    </div>
    <q-btn class="q-ma-md fixed-bottom-right" icon="add" fab color="purple" @click="popup=true" />
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
  </div>
</template>

<script>
import groupCard from "../components/groupCard";
import baseURL from "../baseUrl";
import axiosConfig from "../axiosConfig";
export default {
  props: ["title", "filterFunc", "mode"],
  data() {
    return {
      popup: false,
      newGroup: {
        group_name: "",
        group_desc: ""
      }
    };
  },
  components: {
    "app-group-card": groupCard
  },
  computed: {
    Groups() {
      return this.$store.getters["Group/Groups"];
    },
    filterdGroups() {
      return this.Groups.filter(this.filterFunc);
    }
  },
  created() {
    if (this.mode == "all") {
      this.$store.dispatch("Group/syncGroups");
    }
    this.$store.dispatch("Post/getAllPosts");
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
  }
};
</script>

<style scoped>
</style>
