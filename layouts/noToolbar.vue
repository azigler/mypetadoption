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

export default {
  components: {
    StructuredData
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
</style>
