<template>
  <v-layout class="privacy-policy" align-center column>
    <structured-data
      type="WebPage"
      :properties="webPageSchema"
      :schema="$mpaSchema.entireSchema"
    />
    <v-flex>
      <singleton-card :content="page" />
    </v-flex>
  </v-layout>
</template>

<script>
import StructuredData from '@andrewzigler/structured-data'
import SingletonCard from '~/components/SingletonCard'

export default {
  components: {
    StructuredData,
    SingletonCard
  },

  async asyncData({ app, store, route }) {
    let page = route.name
    await store.dispatch('fetchSingleton', {
      prismic: app.$prismic,
      page
    })
    page = store.getters.pages[page]

    return {
      page,
      webPageSchema: {
        ...{
          description: 'The privacy policy for My Pet Adoption.',
          headline: 'Privacy Policy',
          image: 'https://www.mypetadoption.com/ogmediablack.png',
          name: 'Privacy Policy',
          thumbnailUrl: 'https://www.mypetadoption.com/ogmediablack.png',
          url: 'https://www.mypetadoption.com/privacy-policy/'
        }
      }
    }
  },

  head() {
    return this.$mpaMeta.getBaseHead(
      'Privacy Policy',
      'My Pet Adoption',
      'The privacy policy for My Pet Adoption.',
      'https://www.mypetadoption.com/ogmediablack.png',
      'https://www.mypetadoption.com/privacy-policy/'
    )
  }
}
</script>
