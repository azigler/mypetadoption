<template>
  <v-layout class="login-redirect" align-center justify-center>
    <structured-data
      type="WebPage"
      :properties="webPageSchema"
      :schema="$mpaSchema.entireSchema"
    />
    <v-card color="primary lighten-1" elevation="24" tile>
      <v-container>
        <p class="display-1 inline font-weight-bold">Logging in</p>
        <div class="ellipsis inline">
          <v-icon color="black">pets</v-icon>
          <v-icon color="black">pets</v-icon>
          <v-icon color="black">pets</v-icon>
        </div>
      </v-container>
    </v-card>
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
            'Logging in to My Pet Adoption, a pet adoption and resource website.',
          headline: 'Logging In',
          image: 'https://www.mypetadoption.com/ogmediablack.png',
          name: 'Logging In',
          thumbnailUrl: 'https://www.mypetadoption.com/ogmediablack.png',
          url: 'https://www.mypetadoption.com/'
        }
      }
    }
  },

  mounted() {
    // manually save token from URL hash for SSR
    if (this.$route.hash) {
      this.$auth.setToken(
        'auth0',
        `Bearer ${this.$route.hash.split('=')[1].split('&')[0]}`
      )
    }

    // fetch user information from token
    this.$auth.fetchUser()

    // schedule a redirect depending on authentication results
    setTimeout(() => {
      // only redirect if the user is still here
      if (this.$route.path.includes('/login/redirect')) {
        if (!this.$auth.user) {
          this.$router.push('/login')
        } else {
          this.$router.push('/profile')
        }
      }
    }, 1.5 * 1000)
  },

  head() {
    return {
      ...this.$mpaMeta.getBaseHead(
        'Logging in',
        'My Pet Adoption',
        'Logging in to MyPetAdoption.com, a pet adoption and resource website.',
        'https://www.mypetadoption.com/ogmediablack.png',
        'https://www.mypetadoption.com/login/redirect/'
      ),
      meta: [
        {
          name: 'robots',
          hid: 'robots',
          content: 'noindex'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
p {
  margin-bottom: initial;
}

.container {
  padding: 1.5rem 2.75rem;
}

.ellipsis {
  margin-bottom: -0.3rem;
}

.inline {
  display: inline-block;
}

.v-icon {
  font-size: 0.9rem;
  animation-duration: 1.5s;
  animation-iteration-count: infinite;

  &:nth-child(1) {
    transform: rotateZ(5deg);
    animation-name: wiggle1;
  }

  &:nth-child(2) {
    transform: rotateZ(-5deg);
    animation-name: wiggle2;
  }

  &:nth-child(3) {
    transform: rotateZ(0deg);
    animation-name: wiggle3;
  }
}

@keyframes wiggle1 {
  from {
    transform: rotateZ(5deg);
  }

  20% {
    transform: rotateZ(-10deg);
  }

  to {
    transform: rotateZ(5deg);
  }
}

@keyframes wiggle2 {
  from {
    transform: rotateZ(-5deg);
  }

  50% {
    transform: rotateZ(15deg);
  }

  to {
    transform: rotateZ(-5deg);
  }
}

@keyframes wiggle3 {
  from {
    transform: rotateZ(0deg);
  }

  70% {
    transform: rotateZ(10deg);
  }

  to {
    transform: rotateZ(0deg);
  }
}
</style>
