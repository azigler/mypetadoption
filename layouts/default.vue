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
        <nuxt-link to="/"
          ><v-img src="/ogmediablack.png" aspect-ratio="1.91" width="60"
        /></nuxt-link>
        <span class="links">
          <nuxt-link to="/terms-of-use">Terms of Use</nuxt-link>
          <span>&nbsp;|&nbsp;</span>
          <nuxt-link to="/privacy-policy">Privacy Policy</nuxt-link>
        </span>
      </v-layout>
    </v-footer>
  </v-app>
</template>

<script>
import StructuredData from '@andrewzigler/structured-data'
const PRISMIC_API_URL = 'https://mypetadoption.cdn.prismic.io/api/v2'

async function fetchMasterRef() {
  const { refs } = await fetch(PRISMIC_API_URL).then(function(response) {
    return response.json()
  })
  return refs[0].ref
}

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

  watch: {
    $route: 'fetchData'
  },

  asyncData(app) {
    return {
      givenName: app.$auth.user ? app.$auth.user.given_name : ''
    }
  },

  methods: {
    async fetchData() {
      if (
        (await fetchMasterRef()) !== this.$store.getters.masterRef &&
        this.$store.getters.masterRef.length !== 0
      ) {
        this.$store.dispatch('fetchMasterRef')
        this.$router.go()
      }
    },

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
  a,
  span {
    align-self: center;
  }

  .links {
    margin-left: 0.5rem;
  }
}

.v-btn {
  color: rgba(0, 0, 0, 0.72) !important;
  text-transform: initial !important;
}

.primary {
  background-color: #7dc3e6 !important;
  border-color: #7dc3e6 !important;
}
.primary--text {
  color: #7dc3e6 !important;
  caret-color: #7dc3e6 !important;
}
.primary.lighten-5 {
  background-color: #ffffff !important;
  border-color: #ffffff !important;
}
.primary--text.text--lighten-5 {
  color: #ffffff !important;
  caret-color: #ffffff !important;
}
.primary.lighten-4 {
  background-color: #f1ffff !important;
  border-color: #f1ffff !important;
}
.primary--text.text--lighten-4 {
  color: #f1ffff !important;
  caret-color: #f1ffff !important;
}
.primary.lighten-3 {
  background-color: #d3ffff !important;
  border-color: #d3ffff !important;
}
.primary--text.text--lighten-3 {
  color: #d3ffff !important;
  caret-color: #d3ffff !important;
}
.primary.lighten-2 {
  background-color: #b6fcff !important;
  border-color: #b6fcff !important;
}
.primary--text.text--lighten-2 {
  color: #b6fcff !important;
  caret-color: #b6fcff !important;
}
.primary.lighten-1 {
  background-color: #99dfff !important;
  border-color: #99dfff !important;
}
.primary--text.text--lighten-1 {
  color: #99dfff !important;
  caret-color: #99dfff !important;
}
.primary.darken-1 {
  background-color: #61a8ca !important;
  border-color: #61a8ca !important;
}
.primary--text.text--darken-1 {
  color: #61a8ca !important;
  caret-color: #61a8ca !important;
}
.primary.darken-2 {
  background-color: #438dae !important;
  border-color: #438dae !important;
}
.primary--text.text--darken-2 {
  color: #438dae !important;
  caret-color: #438dae !important;
}
.primary.darken-3 {
  background-color: #227494 !important;
  border-color: #227494 !important;
}
.primary--text.text--darken-3 {
  color: #227494 !important;
  caret-color: #227494 !important;
}
.primary.darken-4 {
  background-color: #005b7a !important;
  border-color: #005b7a !important;
}
.primary--text.text--darken-4 {
  color: #005b7a !important;
  caret-color: #005b7a !important;
}
.secondary {
  background-color: #f7f5b1 !important;
  border-color: #f7f5b1 !important;
}
.secondary--text {
  color: #f7f5b1 !important;
  caret-color: #f7f5b1 !important;
}
.secondary.lighten-5 {
  background-color: #ffffff !important;
  border-color: #ffffff !important;
}
.secondary--text.text--lighten-5 {
  color: #ffffff !important;
  caret-color: #ffffff !important;
}
.secondary.lighten-4 {
  background-color: #ffffff !important;
  border-color: #ffffff !important;
}
.secondary--text.text--lighten-4 {
  color: #ffffff !important;
  caret-color: #ffffff !important;
}
.secondary.lighten-3 {
  background-color: #ffffff !important;
  border-color: #ffffff !important;
}
.secondary--text.text--lighten-3 {
  color: #ffffff !important;
  caret-color: #ffffff !important;
}
.secondary.lighten-2 {
  background-color: #ffffe9 !important;
  border-color: #ffffe9 !important;
}
.secondary--text.text--lighten-2 {
  color: #ffffe9 !important;
  caret-color: #ffffe9 !important;
}
.secondary.lighten-1 {
  background-color: #ffffcd !important;
  border-color: #ffffcd !important;
}
.secondary--text.text--lighten-1 {
  color: #ffffcd !important;
  caret-color: #ffffcd !important;
}
.secondary.darken-1 {
  background-color: #dad996 !important;
  border-color: #dad996 !important;
}
.secondary--text.text--darken-1 {
  color: #dad996 !important;
  caret-color: #dad996 !important;
}
.secondary.darken-2 {
  background-color: #bebd7c !important;
  border-color: #bebd7c !important;
}
.secondary--text.text--darken-2 {
  color: #bebd7c !important;
  caret-color: #bebd7c !important;
}
.secondary.darken-3 {
  background-color: #a2a262 !important;
  border-color: #a2a262 !important;
}
.secondary--text.text--darken-3 {
  color: #a2a262 !important;
  caret-color: #a2a262 !important;
}
.secondary.darken-4 {
  background-color: #87884a !important;
  border-color: #87884a !important;
}
.secondary--text.text--darken-4 {
  color: #87884a !important;
  caret-color: #87884a !important;
}
.accent {
  background-color: #0a7324 !important;
  border-color: #0a7324 !important;
}
.accent--text {
  color: #0a7324 !important;
  caret-color: #0a7324 !important;
}
.accent.lighten-5 {
  background-color: #a2fda3 !important;
  border-color: #a2fda3 !important;
}
.accent--text.text--lighten-5 {
  color: #a2fda3 !important;
  caret-color: #a2fda3 !important;
}
.accent.lighten-4 {
  background-color: #86e088 !important;
  border-color: #86e088 !important;
}
.accent--text.text--lighten-4 {
  color: #86e088 !important;
  caret-color: #86e088 !important;
}
.accent.lighten-3 {
  background-color: #6ac46e !important;
  border-color: #6ac46e !important;
}
.accent--text.text--lighten-3 {
  color: #6ac46e !important;
  caret-color: #6ac46e !important;
}
.accent.lighten-2 {
  background-color: #4fa855 !important;
  border-color: #4fa855 !important;
}
.accent--text.text--lighten-2 {
  color: #4fa855 !important;
  caret-color: #4fa855 !important;
}
.accent.lighten-1 {
  background-color: #318d3c !important;
  border-color: #318d3c !important;
}
.accent--text.text--lighten-1 {
  color: #318d3c !important;
  caret-color: #318d3c !important;
}
.accent.darken-1 {
  background-color: #005a0a !important;
  border-color: #005a0a !important;
}
.accent--text.text--darken-1 {
  color: #005a0a !important;
  caret-color: #005a0a !important;
}
.accent.darken-2 {
  background-color: #004100 !important;
  border-color: #004100 !important;
}
.accent--text.text--darken-2 {
  color: #004100 !important;
  caret-color: #004100 !important;
}
.accent.darken-3 {
  background-color: #002b00 !important;
  border-color: #002b00 !important;
}
.accent--text.text--darken-3 {
  color: #002b00 !important;
  caret-color: #002b00 !important;
}
.accent.darken-4 {
  background-color: #001c00 !important;
  border-color: #001c00 !important;
}
.accent--text.text--darken-4 {
  color: #001c00 !important;
  caret-color: #001c00 !important;
}
</style>
