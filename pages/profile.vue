<template>
  <v-layout class="profile" align-center justify-center>
    <structured-data
      type="WebPage"
      :properties="webPageSchema"
      :schema="$mpaSchema.entireSchema"
    />
    <div>hi:{{ given_name }}</div>
    <h1 class="title">
      PROFILE
    </h1>
    <h2 class="subtitle">
      Pet adoption and resource website.
    </h2>
    <div class="links">
      <a href="https://nuxtjs.org/" target="_blank" class="button--green"
        >Documentation</a
      >
      <a
        href="https://github.com/nuxt/nuxt.js"
        target="_blank"
        class="button--grey"
        >GitHub</a
      >
    </div>
  </v-layout>
</template>

<script>
import StructuredData from '@andrewzigler/structured-data'
import test1 from '~/assets/rescuegroups-wrapper'

/* eslint-disable */
const myTest = new test1(true)
console.log(myTest)
console.log(myTest.testBool())
console.log(test1.blah())
console.log(myTest.internalBoolean)

export default {
  components: {
    StructuredData
  },

  middleware: ['auth'],

  head() {
    return {
      ...this.$mpaMeta.getBaseHead(
        'Profile',
        'My Pet Adoption',
        'Your profile on MyPetAdoption.com, a pet adoption and resource website.',
        'https://pensive-fermat-55a1e3.netlify.com/ogmediablack.png',
        'https://pensive-fermat-55a1e3.netlify.com/profile/'
      ),
      meta: [
        {
          name: 'robots',
          hid: 'robots',
          content: 'noindex'
        }
      ]
    }
  },

  computed: {
    given_name: function(app) {
        /*eslint-disable*/
        console.log(app.$auth.user)
        return app.$auth.user ? app.$auth.user.given_name : ''
      }
  },

  asyncData(app) {
    return {
      webPageSchema: {
        ...{
          description:
            'Your profile on MyPetAdoption.com, a pet adoption and resource website.',
          headline: 'Profile',
          image: 'https://pensive-fermat-55a1e3.netlify.com/ogmediablack.png',
          name: 'Profile',
          thumbnailUrl:
            'https://pensive-fermat-55a1e3.netlify.com/ogmediablack.png',
          url: 'https://pensive-fermat-55a1e3.netlify.com/profile/'
        }
      }
    }
  }
}
</script>

<style>
.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
