<template>
  <v-layout class="admin" align-center justify-center>
    <structured-data
      type="WebPage"
      :properties="webPageSchema"
      :schema="$mpaSchema.entireSchema"
    />
    <div>hi:{{ given_name }}</div>
    <h1 class="title">
      mypetadoption
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
        'Admin',
        'My Pet Adoption',
        'An administrator-only debugging area.',
        'https://www.mypetadoption.com/ogmediablack.png',
        'https://www.mypetadoption.com/admin/'
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
            'An administrator-only debugging area.',
          headline: 'Admin',
          image: 'https://www.mypetadoption.com/ogmediablack.png',
          name: 'Admin',
          thumbnailUrl:
            'https://www.mypetadoption.com/ogmediablack.png',
          url: 'https://www.mypetadoption.com/admin/'
        }
      }
    }
  }
}
</script>

<style>

</style>
