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
    // manually save the token from url hash for SSR
    this.$auth.setToken(
      'auth0',
      `Bearer ${this.$route.hash.split('=')[1].split('&')[0]}`
    )

    // fetch user information from token
    this.$auth.fetchUser()

    // if login was successful
    if (this.$auth.loggedIn) {
      this.$router.replace('/')
    }
  }
}
</script>
