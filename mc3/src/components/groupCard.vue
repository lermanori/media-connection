<template>
  <q-card class="card">
    <q-card-section>
      <div class="text-h6">
        <u>Group Name:</u>
        {{group.group_name}}
      </div>
    </q-card-section>
    <q-card-section>
      <div class="text-body">
        <u>Group description:</u>
        {{group.group_desc}}
      </div>
    </q-card-section>

    <q-card-section>
      <div class="text-body">
        <u>admin:</u>
      </div>
      <q-expansion-item
        v-for="(member,index) in Members.filter(x=>x.uid == group.admin)"
        :key="index"
      >
        <template v-slot:header>
          <!-- <q-item-section thumbnail>
              <img :src="mybaseUrl + prop.path2" /> 

          </q-item-section>-->

          <q-item-section class="q-mt-sm">
            <q-item-label>
              <u>email:</u>
              {{member.email}}
            </q-item-label>
            <q-item-label caption>{{member._id}}</q-item-label>
          </q-item-section>
          <q-item-section side top>
            <!-- <q-item-label caption>{{Date(prop.time).split(" ").slice(0,3).join(" ") }}</q-item-label> -->
          </q-item-section>
        </template>
        <app-friend-card
          :item="member"
          :key="index"
          @addToGroup="handle_addToGroup($event)"
          @unfriend="handle_unfriend(item)"
          :options="options"
        ></app-friend-card>
      </q-expansion-item>
    </q-card-section>
    <q-card-section></q-card-section>
    <q-card-section>
      <div class="text-body">
        <u>posts:</u>
      </div>
      <q-list>
        <q-expansion-item v-for="(post,index) in Posts" :key="index">
          <template v-slot:header>
            <q-item-section thumbnail v-if="post.path !='' && post.path !=undefined">
              <img :src="mybaseUrl + post.path" />
            </q-item-section>

            <q-item-section class="q-mt-sm">
              <q-item-label>
                <u>status:</u>
                {{post.status}}
              </q-item-label>
              <q-item-label caption>{{post.id}}</q-item-label>
            </q-item-section>
            <q-item-section side top>
              <!-- <q-item-label caption>{{Date(prop.time).split(" ").slice(0,3).join(" ") }}</q-item-label> -->
            </q-item-section>
          </template>

          <app-post-card :post="post" :key="index" class="col-6" />
        </q-expansion-item>
      </q-list>
      <u>members:</u>
      <q-list>
        <q-expansion-item v-for="(member,index) in Members" :key="index">
          <template v-slot:header>
            <!-- <q-item-section thumbnail>
              <img :src="mybaseUrl + prop.path2" /> 

            </q-item-section>-->

            <q-item-section class="q-mt-sm">
              <q-item-label>
                <u>email:</u>
                {{member.email}}
              </q-item-label>
              <q-item-label caption>{{member._id}}</q-item-label>
            </q-item-section>
            <q-item-section side top>
              <!-- <q-item-label caption>{{Date(prop.time).split(" ").slice(0,3).join(" ") }}</q-item-label> -->
            </q-item-section>
          </template>
          <app-friend-card
            :item="member"
            :key="index"
            @addToGroup="handle_addToGroup($event)"
            @unfriend="handle_unfriend(item)"
            :options="options"
          ></app-friend-card>
        </q-expansion-item>
      </q-list>
    </q-card-section>
    <q-separator />

    <q-card-actions align="around" class="q-mt-md">
      <q-btn-group spread class="absolute-bottom">
        <q-btn
          class="q-mt-sm"
          color="cyan"
          @click="()=>$store.dispatch('Group/setGroupID',this.group._id)"
          to="/grid"
        >Go To Grid</q-btn>
        <a
          :href="`https://api.instagram.com/oauth/authorize/?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code`"
        >
          <q-btn
            color="purple"
            class="q-mt-sm"
            @click="()=>$store.dispatch('Group/setGroupID',this.group._id)"
          >sync instagram</q-btn>
        </a>
      </q-btn-group>
    </q-card-actions>

    <!-- <h6 class="q-mb-none">{{post}}</h6> -->
  </q-card>
</template>

<script>
import mybaseUrl from "../baseUrl";
import postCard from "../components/postCard";
import friendCard from "../components/cardFriend.vue";
export default {
  props: ["group"],
  data() {
    return {
      members: [],
      options: [],
      mybaseUrl: mybaseUrl.localBaseUrl,
      redirect_uri: mybaseUrl.instagramRedirect,
      client_id: "c0a7f25d2a7645fd82686d1f128f7409"
    };
  },
  computed: {
    Posts() {
      return this.$store.getters["Post/getPosts"].filter(
        x => x.groupID == this.group._id
      );
    },
    Members() {
      return this.members;
    },
    Options() {
      return this.options;
    }
  },

  components: {
    "app-post-card": postCard,
    "app-friend-card": friendCard
  },
  async created() {
    const members = this.group.members;
    const uids = members.map(x => x.memberUid);
    const membersAsUsers = await this.$store.dispatch(
      "Friend/transformUidToUsers",
      uids
    );
    this.members = membersAsUsers.data.result;

    await this.$store.dispatch("Group/syncGroups");
    const groups = this.$store.getters["Group/Groups"];
    const parsedGroups = groups.map(x => {
      return { label: `${x.group_name}: ${x.group_desc}`, value: x._id };
    });
    this.options = parsedGroups;
  }
};
</script>

<style  scoped>
.card {
  width: 100%;
  max-width: 500px;
}
</style>