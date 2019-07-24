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
        <v-img src="/symbol512black.png" aspect-ratio="1" width="16" />
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
        <v-icon size="20">face</v-icon>
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
    <v-footer color="secondary">
      <v-layout justify-center>
        <v-img src="/ogmediablack.png" aspect-ratio="1.91" max-width="60" />
        <span class="links">
          <nuxt-link to="/blog">Blog</nuxt-link> <span>&nbsp;|&nbsp;</span>
          <nuxt-link to="/privacy-policy">Privacy Policy</nuxt-link>
          <span>&nbsp;|&nbsp;</span>
          <nuxt-link to="/terms-of-use">Terms of Use</nuxt-link>
        </span>
      </v-layout>
    </v-footer>
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

#app {
  background-color: #f7f5b1 !important;
  border-color: #f7f5b1 !important;

  .primary.lighten-1 {
    background-color: #99dfff !important;
    border-color: #99dfff !important;
  }
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

      .v-image__image {
        opacity: 0.75;
      }
    }

    .profile-face-icon {
      padding-left: 0.3rem;
    }
  }
}

footer {
  display: none !important;

  a,
  span {
    align-self: center;
  }

  .links {
    margin-left: 0.5rem;
  }
}
</style>
