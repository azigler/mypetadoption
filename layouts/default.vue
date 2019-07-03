<template>
  <v-app class="primary">
    <structured-data type="WebSite" :schema="$mpaSchema.entireSchema" />
    <v-content>
      <v-container class="under-construction" fill-height>
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
</style>
