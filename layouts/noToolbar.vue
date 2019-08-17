<template>
  <v-app class="secondary">
    <structured-data type="WebSite" :schema="$mpaSchema.entireSchema" />
    <v-content>
      <v-container fill-height>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import StructuredData from '@andrewzigler/structured-data'
import mpaPrismic from '~/assets/mpaPrismic'

export default {
  components: {
    StructuredData
  },

  watch: {
    $route: 'fetchData'
  },

  methods: {
    async fetchData() {
      if (
        (await mpaPrismic.fetchMasterRef()) !== this.$store.getters.masterRef &&
        this.$store.getters.masterRef.length !== 0
      ) {
        this.$store.dispatch('fetchMasterRef')
        this.$router.go()
      }
    }
  }
}
</script>
