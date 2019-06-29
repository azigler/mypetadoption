<template>
  <v-container class="under-construction" fluid fill-height>
    <structured-data
      type="WebPage"
      :properties="webPageSchema"
      :schema="$mpaSchema.entireSchema"
    />
    <under-construction />
  </v-container>
</template>

<script>
import StructuredData from '@andrewzigler/structured-data'
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
      'Pet adoption and resource website.',
      'https://pensive-fermat-55a1e3.netlify.com/ogmediablack.png',
      'https://pensive-fermat-55a1e3.netlify.com/'
    )
  },

  asyncData() {
    return {
      webPageSchema: {
        ...{
          description: 'MyPetAdoption.com is under construction.',
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
