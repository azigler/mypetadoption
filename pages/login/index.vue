<template>
  <v-layout class="login" align-center justify-center>
    <structured-data
      type="WebPage"
      :properties="webPageSchema"
      :schema="$mpaSchema.entireSchema"
    />
    <v-flex xs6>
      <v-img src="/ogmediablack.png" aspect-ratio="1.91" />
      <v-layout column>
        <v-btn
          color="primary lighten-1"
          class="font-weight-bold"
          large
          @click="$auth.loginWith('auth0')"
        >
          Log in
        </v-btn>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
import StructuredData from '@andrewzigler/structured-data'

export default {
  components: {
    StructuredData
  },

  layout: 'noToolbar',

  asyncData(app) {
    return {
      webPageSchema: {
        ...{
          description:
            'Log in to MyPetAdoption.com, a pet adoption and resource website.',
          headline: 'Login',
          image: 'https://pensive-fermat-55a1e3.netlify.com/ogmediablack.png',
          name: 'Login',
          thumbnailUrl:
            'https://pensive-fermat-55a1e3.netlify.com/ogmediablack.png',
          url: 'https://pensive-fermat-55a1e3.netlify.com/login/'
        }
      }
    }
  },

  mounted() {
    if (this.$auth.loggedIn) {
      this.$router.push('/')
    }
  },

  head() {
    return this.$mpaMeta.getBaseHead(
      'Login',
      'My Pet Adoption',
      'Log in to MyPetAdoption.com, a pet adoption and resource website.',
      'https://pensive-fermat-55a1e3.netlify.com/ogmediablack.png',
      'https://pensive-fermat-55a1e3.netlify.com/login/'
    )
  }
}
</script>

<style lang="scss">
.v-image {
  margin-bottom: -1.5rem;
}

.v-btn {
  border-radius: 0.5rem !important;
}

#app {
  background-color: #f7f5b1 !important;
  border-color: #f7f5b1 !important;

  .primary.lighten-1 {
    background-color: #99dfff !important;
    border-color: #99dfff !important;
  }
}
</style>
