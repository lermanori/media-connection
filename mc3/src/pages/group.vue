<template>
  <div class="container">
    <div class="row wrap">
      <h6>group id: {{$route.params.groupid}}</h6>
    </div>
    <template v-if="DataLoaded">
      <div class="row wrap">
        <h4>group name: {{groupData.group_name}}</h4>
      </div>
      <div class="row wrap">
        <h4>group admin: {{groupData.admin}}</h4>
      </div>
      <div class="row wrap">
        <h4>group description: {{groupData.group_desc}}</h4>
      </div>
      <div class="row wrap">
        <h4>group posts: {{groupData.posts}}</h4>
      </div>
      <a
        :href="`https://api.instagram.com/oauth/authorize/?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code`"
      >
        <q-btn
          @click="()=>$store.dispatch('Group/setGroupID',$route.params.groupid)"
        >connect to instagram</q-btn>
      </a>
    </template>
  </div>
</template>

<script>
import baseUrl from "../baseUrl";
import axiosConfig from "../axiosConfig.js";
export default {
  data() {
    return {
      groupData: {},
      dataLoaded: false,
      redirect_uri: "http://localhost:8080/instagram",
      client_id: "c0a7f25d2a7645fd82686d1f128f7409"
    };
  },

  methods: {
    async getData() {
      let URL =
        baseUrl.localBaseUrl + "/api/group/" + this.$route.params.groupid;
      let data = await this.$axios.get(URL, this.AxiosConfig);
      return data;
    }
  },
  computed: {
    AxiosConfig() {
      return axiosConfig.axiosConfig();
    },
    DataLoaded() {
      return this.dataLoaded;
    }
  },
  created() {
    this.getData().then(({ data }) => {
      this.groupData = data;
      this.dataLoaded = true;
    });
  }
};
</script>

<style scoped>
</style>
