<template>
  <v-layout class="login-redirect" align-center justify-center>
    <p class="display-3">Logging in</p>
    <span class="ellipsis">
      <v-icon size="1rem" style="transform: rotateZ(5deg);" color="black"
        >pets</v-icon
      >
      <v-icon size="1rem" style="transform: rotateZ(0deg);" color="black"
        >pets</v-icon
      >
      <v-icon size="1rem" style="transform: rotateZ(-10deg);" color="black"
        >pets</v-icon
      >
    </span>
  </v-layout>
</template>

<script>
export default {
  layout: 'noToolbar',

  mounted() {
    // manually save token from URL hash for SSR
    if (this.$route.hash) {
      this.$auth.setToken(
        'auth0',
        `Bearer ${this.$route.hash.split('=')[1].split('&')[0]}`
      )
    }

    // fetch user information from token
    this.$auth.fetchUser()

    // return to homepage
    this.$router.push('/')
  }
}
</script>

<style lang="scss" scoped>
p {
  margin-bottom: initial;
}

.ellipsis {
  margin-top: 1.6rem;
  margin-left: 0.4rem;
}
</style>
