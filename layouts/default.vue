<template>
  <v-app class="secondary">
    <structured-data type="WebSite" :schema="$mpaSchema.entireSchema" />
    <v-toolbar app class="top-toolbar" height="50">
      <v-btn
        color="primary lighten-1"
        class="font-weight-bold"
        depressed
        small
        nuxt
        to="/"
      >
        Home
      </v-btn>
      <v-btn
        v-if="isAdmin"
        color="primary lighten-1"
        class="font-weight-bold"
        depressed
        small
        nuxt
        to="/admin"
      >
        Admin
      </v-btn>
      <v-spacer />
      <v-btn
        v-if="!$auth.loggedIn"
        color="primary lighten-1"
        class="font-weight-bold"
        depressed
        small
        @click="$auth.loginWith('auth0')"
      >
        Log in
      </v-btn>
      <v-btn
        v-if="$auth.loggedIn"
        color="primary lighten-1"
        class="font-weight-bold"
        small
        depressed
        nuxt
        to="/profile"
      >
        {{ $auth.user.given_name }}
        <v-icon small class="profile-face-icon">face</v-icon>
      </v-btn>
      <v-icon v-if="$auth.loggedIn" color="primary darken-3" @click="logout"
        >exit_to_app</v-icon
      >
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
    isAdmin(app) {
      if (
        app.$auth.user &&
        app.$auth.user['https://www.mypetadoption.com/app_metadata'].admin
      ) {
        return true
      } else {
        return false
      }
    }
  },

  methods: {
    logout() {
      this.$auth.logout()
      window.location.href = `https://mypetadoption.auth0.com/v2/logout?returnTo=${location.protocol.substr(
        0,
        location.protocol.length - 1
      )}%3A%2F%2F${location.host}`
    }
  }
}
</script>

<style lang="scss">
html {
  overscroll-behavior: none;
}

.v-btn {
  color: rgba(0, 0, 0, 0.72) !important;
  text-transform: initial !important;
}

.top-toolbar {
  .v-toolbar__content {
    padding: 0 0.8rem;

    .profile-face-icon {
      padding-left: 0.3rem;
    }
  }
}
</style>
