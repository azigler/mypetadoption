<template>
  <v-layout class="under-construction">
    <structured-data
      type="WebPage"
      :properties="webPageSchema"
      :schema="$mpaSchema.entireSchema"
    />
    <under-construction />
    <v-badge>{{ $auth.loggedIn ? 'Logged In' : 'Guest' }}</v-badge>
    <v-btn
      v-if="!$auth.loggedIn"
      block
      class="login-button"
      @click="$auth.loginWith('auth0')"
      >Login</v-btn
    >
  </v-layout>
</template>

<script>
import StructuredData from '@andrewzigler/structured-data'
import jwtDecode from 'jwt-decode'
import UnderConstruction from '~/components/UnderConstruction'

export default {
  components: {
    StructuredData,
    UnderConstruction
  },

  head() {
    return this.$mpaMeta.getBaseHead(
      'Under Construction',
      'My Pet Adoption',
      'MyPetAdoption.com, an upcoming pet adoption and resource website, is under construction.',
      'https://pensive-fermat-55a1e3.netlify.com/ogmediablack.png',
      'https://pensive-fermat-55a1e3.netlify.com/'
    )
  },

  asyncData(app) {
    /* eslint-disable */
    let cookie, newUser
    if (app.req && app.req.headers.cookie.includes(';') && !app.req.headers.cookie.includes('auth._token.auth0=false')) {
      console.log(app.req.headers.cookie)
      cookie = app.req.headers.cookie.split(';').find(function(item) {
        return item.includes('auth._token.auth0')
      })
      console.log(jwtDecode(cookie.split('=')[1]))
      newUser = jwtDecode(cookie.split('=')[1])
      app.store.commit('SET_USER', newUser)
      app.$auth.setToken('auth0', cookie.split('=')[1])
    }

    return {
      webPageSchema: {
        ...{
          description:
            'MyPetAdoption.com, an upcoming pet adoption and resource website, is under construction.',
          headline: 'Under Construction',
          image: 'https://pensive-fermat-55a1e3.netlify.com/ogmediablack.png',
          name: 'Under Construction',
          thumbnailUrl:
            'https://pensive-fermat-55a1e3.netlify.com/ogmediablack.png',
          url: 'https://pensive-fermat-55a1e3.netlify.com/'
        }
      }
    }
  }
}
</script>
