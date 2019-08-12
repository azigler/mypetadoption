<template>
  <v-card tile elevation="12">
    <v-card-title>
      <v-img src="/symbol512black.png" aspect-ratio="1" max-width="20" />
      <h1
        class="display-2 text-xs-center mx-auto"
        v-html="
          $prismic.dom.RichText.asText(
            content.data.title,
            $prismic.linkResolver
          )
        "
      />
      <v-img src="/symbol512black.png" aspect-ratio="1" max-width="20" />
    </v-card-title>
    <p class="last-updated">Last updated: {{ lastUpdated }}</p>
    <v-card-text
      class="terms-of-use"
      v-html="
        $prismic.dom.RichText.asHtml(
          content.data.body,
          $prismic.linkResolver,
          $prismic.htmlSerializer
        )
      "
    >
    </v-card-text>
  </v-card>
</template>

<script>
import moment from 'moment'

export default {
  props: {
    content: {
      type: Object,
      default: () => {}
    }
  },

  computed: {
    lastUpdated: function() {
      return moment(this.content.data.last_updated).format('ll')
    }
  }
}
</script>

<style scoped lang="scss">
.v-card {
  padding: 1.5rem;
  border-radius: 0.5rem;

  .last-updated {
    color: #6f6f6f;
    padding-left: 16px;
    margin-top: 1rem;
    margin-bottom: -0.2rem;
  }

  .v-card__title {
    border-bottom: 1px dashed #e8e8e8;

    .display-2 {
      font-size: 200% !important;
    }
  }
}
</style>
