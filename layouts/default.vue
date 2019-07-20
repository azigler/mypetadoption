<template>
  <v-app class="secondary">
    <structured-data type="WebSite" :schema="$mpaSchema.entireSchema" />
    <v-toolbar app class="top-toolbar" height="50">
      <v-btn
        v-show="$vuetify.breakpoint.smAndUp"
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
        v-show="$vuetify.breakpoint.xsOnly"
        color="primary lighten-1"
        class="toolbar-icon-button"
        depressed
        small
        nuxt
        to="/"
      >
        <v-icon>home</v-icon>
      </v-btn>
      <v-btn
        v-show="$vuetify.breakpoint.smAndUp && isAdmin"
        color="primary lighten-1"
        class="font-weight-bold"
        depressed
        small
        nuxt
        to="/admin"
      >
        Admin
      </v-btn>
      <v-btn
        v-show="$vuetify.breakpoint.xsOnly && isAdmin"
        color="primary lighten-1"
        class="toolbar-icon-button"
        depressed
        small
        nuxt
        to="/admin"
      >
        <v-icon>code</v-icon>
      </v-btn>
      <v-spacer />
      <v-btn
        v-show="$vuetify.breakpoint.smAndUp && !$auth.loggedIn"
        color="primary lighten-1"
        class="font-weight-bold"
        depressed
        small
        @click="$auth.loginWith('auth0')"
      >
        Log in
      </v-btn>
      <v-btn
        v-show="$vuetify.breakpoint.xsOnly && !$auth.loggedIn"
        color="primary lighten-1"
        class="toolbar-icon-button"
        depressed
        small
        @click="$auth.loginWith('auth0')"
      >
        <v-icon>open_in_browser</v-icon>
      </v-btn>
      <v-btn
        v-show="$vuetify.breakpoint.smAndUp && $auth.loggedIn"
        color="primary lighten-1"
        class="font-weight-bold"
        small
        depressed
        nuxt
        to="/profile"
      >
        {{ givenName }}
        <v-icon small class="profile-face-icon">face</v-icon>
      </v-btn>
      <v-btn
        v-show="$vuetify.breakpoint.xsOnly && $auth.loggedIn"
        color="primary lighten-1"
        class="toolbar-icon-button"
        depressed
        small
        nuxt
        to="/profile"
      >
        <v-icon>face</v-icon>
      </v-btn>
      <v-icon v-show="$auth.loggedIn" color="primary darken-3" @click="logout"
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

  data(app) {
    return {
      givenName: app.$auth.user
        ? app.$auth.user.given_name
          ? app.$auth.user.given_name
          : app.$auth.user.email
        : ''
    }
  },

  computed: {
    isAdmin(app) {
      if (
        app.$auth.user &&
        app.$auth.user['https://www.mypetadoption.com/app_metadata'] &&
        app.$auth.user['https://www.mypetadoption.com/app_metadata'].admin
      ) {
        return true
      } else {
        return false
      }
    }
  },

  asyncData(app) {
    return {
      givenName: app.$auth.user ? app.$auth.user.given_name : ''
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
  overflow: auto;
}

.top-toolbar {
  .v-toolbar__content {
    padding: 0 0.8rem;

    .v-btn {
      color: rgba(0, 0, 0, 0.72) !important;
      text-transform: initial !important;
    }

    .toolbar-icon-button {
      min-width: 2.5rem !important;
    }

    .profile-face-icon {
      padding-left: 0.3rem;
    }
  }
}
</style>
