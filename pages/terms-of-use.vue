<template>
  <v-layout class="terms-of-use" align-center column>
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
          description: 'The terms of use for My Pet Adoption.',
          headline: 'Terms of Use',
          image: 'https://www.mypetadoption.com/ogmediablack.png',
          name: 'Terms of Use',
          thumbnailUrl: 'https://www.mypetadoption.com/ogmediablack.png',
          url: 'https://www.mypetadoption.com/terms-of-use/'
        }
      }
    }
  },

  head() {
    return this.$mpaMeta.getBaseHead(
      'Terms of Use',
      'My Pet Adoption',
      'The terms of use for My Pet Adoption.',
      'https://www.mypetadoption.com/ogmediablack.png',
      'https://www.mypetadoption.com/terms-of-use/'
    )
  }
}
</script>
