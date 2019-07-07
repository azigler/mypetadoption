<template>
  <v-layout class="login" align-center justify-center>
    <h3 class="display-3 mb-0 titlecase text-xs-center">
      Logging in...
    </h3>
  </v-layout>
</template>

<script>
export default {
  mounted() {
    if (this.$auth.loggedIn) {
      this.$router.replace('/')
    }
  }
}
</script>
