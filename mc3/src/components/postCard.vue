<template>
  <q-card class="card">
    <q-card-section>
      <span class="text-h6">
        status:
        <u>{{post.status}}</u>
      </span>
    </q-card-section>
    <q-card-section>
      properties:
      <q-list bordered separator>
        <q-item>
          <q-item-section v-for="(prop,index) in post.filterdProperties" :key="index">
            <q-item-label overline>{{prop.key}}</q-item-label>
            <q-item-label>{{prop.value}}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>
    <q-card-section v-if="post.commits.length > 0">
      commits:
      <q-list bordered separator class="q-mt-sm q-mb-md">
        <q-expansion-item v-for="(prop,index) in post.commits" :key="index">
          <template v-slot:header>
            <q-item-section thumbnail>
              <img :src="mybaseUrl + prop.path2" />
            </q-item-section>

            <q-item-section class="q-mt-sm">
              <q-item-label>{{prop.user.email}}</q-item-label>
              <q-item-label caption>{{prop.commitMessage}}</q-item-label>
            </q-item-section>
            <q-item-section side top>
              <q-item-label caption>{{Date(prop.time).split(" ").slice(0,3).join(" ") }}</q-item-label>
            </q-item-section>
          </template>

          <q-card>
            <q-card-section>
              <div class="text-body">
                <u>commit message:</u>
                {{prop.commitMessage}}
              </div>
              <div class="text-body">
                <u>time uploaded:</u>
                {{Date(prop.time).split(" ").slice(0,5).join(" ")}}
              </div>
              <div class="text-body">
                <u>done:</u>
                {{prop.done}}
              </div>
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </q-list>
    </q-card-section>
    <q-card-actions vertical>
      <q-btn
        class="absolute-bottom q-mt-sm"
        :icon="(post.status=='waiting for approval'?'check':'edit')"
        :color="(post.status=='waiting for approval'?'green':'indigo')"
        :to="'/' + post.id + (post.status=='waiting for approval' ?'/approval':'/image-editor')"
      ></q-btn>
      <q-btn
        v-if="post.status=='approved'"
        class="absolute-bottom q-mt-sm"
        icon="share"
        color="pink"
        @click="handle_share(post)"
      ></q-btn>
    </q-card-actions>
    <!-- <h6 class="q-mb-none">{{post}}</h6> -->
  </q-card>
</template>

<script>
import mybaseUrl from "../baseUrl";
export default {
  props: ["post"],
  data() {
    return {
      mybaseUrl: mybaseUrl.localBaseUrl
    };
  },
  methods: {
    handle_share(post) {
      console.log(post);
      if (navigator.share) {
        navigator.share({
          title: "mc3-upload",
          url: `${this.mybaseUrl}${this.post.path}`
        });
      } else {
        console.log("hey");
        this.$axios({
          url: `${this.mybaseUrl}${this.post.path}`,
          method: "GET",
          responseType: "blob" // important
        }).then(response => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "image.png"); //or any other extension
          document.body.appendChild(link);
          link.click();
        });
      }
    }
  }
};
</script>

<style  scoped>
.card {
  width: 100%;
  max-width: 500px;
}
</style>