<template>
  <v-layout class="privacy-policy" align-center column>
    <structured-data
      type="WebPage"
      :properties="webPageSchema"
      :schema="$mpaSchema.entireSchema"
    />
    <v-flex xs5>
      <v-img src="/symbol512black.png" aspect-ratio="1" width="200" />
    </v-flex>
    <v-flex xs6>
      <v-card tile elevation="12">
        <v-card-title>
          <h1
            class="display-2 text-xs-center mx-auto"
            v-html="
              $prismic.dom.RichText.asText(
                page.data.title,
                $prismic.linkResolver
              )
            "
          />
        </v-card-title>
        <v-card-text
          class="terms-of-use"
          v-html="
            $prismic.dom.RichText.asHtml(
              page.data.body,
              $prismic.linkResolver,
              $prismic.htmlSerializer
            )
          "
        >
        </v-card-text>
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
          url: 'https://www.mypetadoption.com/privacy-policy'
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
      'https://www.mypetadoption.com/privacy-policy'
    )
  }
}
</script>

<style lang="scss" scoped>
.flex {
  flex-basis: 33%;

  &.text-xs-center {
    background-color: #7dc3e6;
    justify-content: space-around;
    display: flex;

    i {
      animation-duration: 3s;
      animation-name: flip2;
      animation-iteration-count: infinite;

      &:nth-child(odd) {
        transform: scaleX(-1);
        animation-duration: 7s;
        animation-name: flip1;
      }
    }
  }
}

@keyframes flip1 {
  from {
    transform: scaleX(-1);
  }

  50% {
    transform: scaleX(1);
    transform: scaleY(-1);
  }

  to {
    transform: scaleX(-1);
  }
}

@keyframes flip2 {
  from {
    transform: scaleX(1);
  }

  50% {
    transform: scaleX(-1);
  }

  to {
    transform: scaleX(1);
  }
}
</style>
