<template>
  <div :key="$route.fullPath">
    <div v-if="searchRes.length > 0">
      <q-list bordered class="rounded-borders" style>
        <template v-for="(item,index) in searchRes">
          <q-item clickable v-ripple :key="index" :to="'/profile/'+item.id">
            <q-item-section avatar>
              <q-avatar>
                <q-img contains :style="{height:'100%'}" :src="baseUrl+'/'+item.profilePicture" />
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label lines="1">{{item.email}}</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator inset="item" :key="'s'+index" />
        </template>
      </q-list>
    </div>
    <div
      v-if="visible && searchRes.length == 0"
      class="text-h6 text-center q-mt-xl"
    >NO SEARCH RESULTS</div>
    <div class="row justify-center" v-if="!visible">
      <q-circular-progress indeterminate size="10em" color="indigo" class="q-mx-auto" />
    </div>
  </div>
</template>

<script>
import axiosConfig from "../axiosConfig";
import baseUrl from "../baseUrl";
import friendCard from "../components/cardFriend";
export default {
  data() {
    return {
      searchRes: [],
      baseUrl: baseUrl.localBaseUrl,
      visible: false
    };
  },
  components: {
    "app-card-friend": friendCard
  },
  watch: {
    query() {
      this.refresh(this.query);
    }
  },
  methods: {
    async refresh(url) {
      this.visible = false;
      const searchRes = await this.$axios.get(
        baseUrl.localBaseUrl + "/api/profile/search/?search=" + url,
        axiosConfig.axiosConfig()
      );
      this.searchRes = searchRes.data;
      this.visible = true;
    }
  },
  computed: {
    query() {
      return this.$route.query.search;
    }
  },

  created() {
    this.refresh(this.$route.query.search);
  }
};
</script>

<style scoped>
</style>