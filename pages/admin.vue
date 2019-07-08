<template>
  <v-layout class="admin" align-center justify-center>
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
import test1 from '~/assets/rescuegroups-wrapper'

/* eslint-disable */
const myTest = new test1(true)
console.log(myTest)
console.log(myTest.testBool())
console.log(test1.blah())
console.log(myTest.internalBoolean)

export default {
  middleware: ['auth'],
  head() {
    return {
      meta: [
        {
          name: 'robots',
          hid: 'robots',
          content: 'noindex'
        }
      ]
    }
  },
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
