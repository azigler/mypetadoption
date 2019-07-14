<template>
  <v-app class="primary">
    <structured-data type="WebSite" :schema="$mpaSchema.entireSchema" />
    <v-toolbar v-if="$auth.loggedIn" app>
      <v-btn class="ml-3" variant="info" to="/">Home</v-btn>
      <v-btn class="ml-3" variant="info" to="/admin">Admin</v-btn>
      <v-btn class="ml-3" variant="danger" @click="logout">Logout</v-btn>
      <div>hi:{{ given_name }}</div>
    </v-toolbar>
    <v-content>
      <v-container fill-height>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import StructuredData from '@andrewzigler/structured-data'

export default {
  components: {
    StructuredData
  },

  computed: {
    given_name: function(app) {
      /*eslint-disable*/
      console.log(app.$auth.user)
      return app.$auth.user ? app.$auth.user.given_name : ''
    }
  },

  methods: {
    logout() {
      this.$auth.logout()
      window.location.href = `https://mypetadoption.auth0.com/v2/logout?returnTo=${location.protocol.substr(0, location.protocol.length - 1)}%3A%2F%2F${location.host}`
    }
  }
}
</script>

<style lang="scss">
html {
  overscroll-behavior: none;
}
</style>
