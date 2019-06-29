<template>
  <v-container class="under-construction" fluid fill-height>
    <under-construction />
  </v-container>
</template>

<script>
import UnderConstruction from '~/components/UnderConstruction'

export default {
  components: {
    UnderConstruction
  },

  head() {
    return this.$mpaMeta.getBaseHead(
      'Under Construction',
      'My Pet Adoption',
      'Pet adoption and resource website.',
      'https://www.mypetadoption.com/ogmediablack.png',
      'https://www.mypetadoption.com/'
    )
  }
}
</script>
