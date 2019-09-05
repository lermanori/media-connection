<template>
  <q-card class="card">
    <q-card-section>
      <span class="text-h6">
        status:
        <font color="red" v-if="post.status =='new request' ">{{post.status}}</font>
        <font color="orange" v-if="post.status =='in process' ">{{post.status}}</font>
        <font color="green" v-if="post.status =='waiting for approval' ">{{post.status}}</font>
      </span>
    </q-card-section>

    <q-card-section v-if="post.filterdProperties.length > 1">
      properties:
      <div class="q-pa-sm">
        <q-markup-table separator="cell">
          <thead>
            <tr>
              <th class="text-left">Key</th>
              <th class="text-center">Value</th>
            </tr>
          </thead>
          <tbody v-for="(prop,index) in post.filterdProperties" :key="index">
            <tr v-if="prop.key != undefined && prop.value != undefined">
              <td class="text-left">{{prop.key}}</td>
              <td class="text-center textSmall">{{prop.value}}</td>
            </tr>
          </tbody>
        </q-markup-table>
      </div>
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
              <p></p>
              <q-item-label class="textSmall">{{prop.user.email}}</q-item-label>
              <q-item-label caption>{{prop.commitMessage}}</q-item-label>
            </q-item-section>
            <q-item-section side top>
              <q-item-label caption>{{Date(prop.time).split(" ").slice(0,3).join(" ") }}</q-item-label>
            </q-item-section>
          </template>

          <q-card>
            <q-card-section>
              <div>
                <q-markup-table separator="horizontal">
                  <tbody>
                    <tr>
                      <td class="text-left textSmall">
                        <b>Commit message:</b>
                      </td>
                      <td class="text-left textSmall">{{prop.commitMessage}}</td>
                    </tr>
                    <tr>
                      <td class="text-left textSmall">
                        <b>Time uploaded:</b>
                      </td>
                      <td
                        class="text-left textXSmall"
                      >{{Date(prop.time).split(" ").slice(0,5).join(" ")}}</td>
                    </tr>
                    <tr>
                      <td class="text-left textSmall">
                        <b>Done:</b>
                      </td>
                      <td class="text-left textSmall">{{prop.done}}</td>
                    </tr>
                  </tbody>
                </q-markup-table>
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
  }
};
</script>

<style  scoped>
.card {
  width: 100%;
  max-width: 500px;
}
.textXSmall {
  font-size: 8px;
}
.textSmall {
  font-size: 10px;
}
</style>
<style lang="stylus">
.my-sticky-column-table {
  /*
    specifying max-width so the example can
    highlight the sticky column on any browser window
  */
  max-width: 600px;

  /* bg color is important for th; just specify one */
  thead tr:first-child th:first-child {
    background-color: #fff;
    opacity: 1;
  }

  td:first-child {
    background-color: #f5f5dc;
  }

  thead tr:first-child th:first-child, td:first-child {
    position: sticky;
    left: 0;
    z-index: 1;
  }
}
</style>


