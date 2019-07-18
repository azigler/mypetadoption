<template>
  <v-layout class="under-construction" align-center justify-center>
    <structured-data
      type="WebPage"
      :properties="webPageSchema"
      :schema="$mpaSchema.entireSchema"
    />
    <v-flex xs12 sm10 md8>
      <v-card class="elevation-12">
        <v-img src="/ogmediawhite.png" aspect-ratio="1.91" />
        <v-card-title>
          <h3 class="headline mb-0 titlecase">
            Under Construction
          </h3>
        </v-card-title>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import StructuredData from '@andrewzigler/structured-data'

export default {
  components: {
    StructuredData
  },

  asyncData(app) {
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
  },

  head() {
    return this.$mpaMeta.getBaseHead(
      'Under Construction',
      'My Pet Adoption',
      'MyPetAdoption.com, an upcoming pet adoption and resource website, is under construction.',
      'https://pensive-fermat-55a1e3.netlify.com/ogmediablack.png',
      'https://pensive-fermat-55a1e3.netlify.com/'
    )
  }
}
</script>

<style lang="scss" scoped>
.v-image {
  background-color: #7dc3e6;
}

.elevation-12 {
  border-radius: 8px;
}

.titlecase {
  text-transform: uppercase;
  text-align: center;
  margin: 0 auto;
  color: #0f3a50;
  font-weight: bold;
}
</style>
