<template>
  <v-layout class="login" align-center justify-center>
    <v-flex xs12 sm8>
      <v-flex>
        <v-img src="/ogmediablack.png" aspect-ratio="1.91" />
      </v-flex>
      <v-flex class="text-xs-center">
        <v-btn
          color="primary lighten-1"
          class="font-weight-bold"
          depressed
          small
          nuxt
          large
          to="/"
        >
          Home
        </v-btn>
        <v-btn
          color="primary lighten-1"
          class="font-weight-bold"
          depressed
          small
          large
          @click="$auth.loginWith('auth0')"
        >
          Login
        </v-btn>
      </v-flex>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  layout: 'noToolbar',

  mounted() {
    if (this.$auth.loggedIn) {
      this.$router.push('/')
    }
  }
}
</script>
