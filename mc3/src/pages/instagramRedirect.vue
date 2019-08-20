<template>
  <div class="row justify-center q-mt-lg">
    <div class="col-12 text-center">
      <h1 class="text-h4">redirecting to grid..</h1>
    </div>
    <div class="col-12 text-center">
      <q-spinner-cube color="indigo" size="5.5em" />
    </div>
  </div>
</template>

<script>
import baseUrl from "../baseUrl";
export default {
  created() {
    // print user name
    let bodyFormData = new FormData();
    bodyFormData.set("client_id", "c0a7f25d2a7645fd82686d1f128f7409");
    bodyFormData.set("client_secret", "90a6883175d04046abe366da68dd2161");
    bodyFormData.set("grant_type", "authorization_code");
    bodyFormData.set("redirect_uri", baseUrl.instagramRedirect);
    bodyFormData.set("code", this.$route.query.code);
    this.$axios({
      method: "post",
      url: "https://api.instagram.com/oauth/access_token",
      data: bodyFormData,
      config: { headers: { "Content-Type": "multipart/form-data" } }
    })
      .then(response => {
        //handle success
        console.log(response);
        this.$store
          .dispatch("User/setInstagramToken", response.data.access_token)
          .then(() => {
            this.$router.push("/grid");
          });
      })
      .catch(function(response) {
        //handle error
        console.log(response);
      });
  }
};
</script>

<style scoped>
</style>
