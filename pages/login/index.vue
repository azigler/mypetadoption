<template>
  <v-layout class="login" align-center justify-center>
    <structured-data
      type="WebPage"
      :properties="webPageSchema"
      :schema="$mpaSchema.entireSchema"
    />
    <v-flex xs6>
      <v-card elevation="24" tile>
        <v-img src="/ogmediablack.png" aspect-ratio="1.91" />
        <v-layout column>
          <v-btn
            color="primary lighten-1"
            class="font-weight-bold login-button"
            depressed
            block
            @click="$auth.loginWith('auth0')"
          >
            <h1>Log in</h1>
          </v-btn>
        </v-layout>
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

  layout: 'noToolbar',

  asyncData(app) {
    return {
      webPageSchema: {
        ...{
          description:
            'Log in to My Pet Adoption, a pet adoption and resource website.',
          headline: 'Login',
          image: 'https://www.mypetadoption.com/ogmediablack.png',
          name: 'Login',
          thumbnailUrl: 'https://www.mypetadoption.com/ogmediablack.png',
          url: 'https://www.mypetadoption.com/login/'
        }
      }
    }
  },

  mounted() {
    // schedule a redirect depending on login status
    setTimeout(() => {
      // only redirect if a logged-in user is lingering here
      if (this.$route.path.includes('/login')) {
        if (this.$auth.user) {
          this.$router.push('/profile')
        }
      }
    }, 1.5 * 1000)
  },

  head() {
    return this.$mpaMeta.getBaseHead(
      'Login',
      'My Pet Adoption',
      'Log in to MyPetAdoption.com, a pet adoption and resource website.',
      'https://www.mypetadoption.com/ogmediablack.png',
      'https://www.mypetadoption.com/login/'
    )
  }
}
</script>

<style lang="scss">
.login {
  .v-image {
    margin-bottom: -1.5rem;
  }

  .v-btn.login-button {
    margin-bottom: 0;
    border-radius: 0;
  }
}
</style>
