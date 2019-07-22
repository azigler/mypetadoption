<template>
  <v-layout class="profile" justify-center align-center row wrap>
    <structured-data
      type="WebPage"
      :properties="webPageSchema"
      :schema="$mpaSchema.entireSchema"
    />
    <v-flex xs9>
      <v-card elevation="12">
        <v-layout row wrap>
          <v-flex xs12 sm6 class="primary lighten-1">
            <v-img
              v-if="!isFacebook"
              aspect-ratio="1"
              min-width="200"
              :src="$auth.user.picture"
            />
            <v-img
              v-if="isFacebook"
              aspect-ratio="1"
              min-width="200"
              :src="facebookImage"
            />
          </v-flex>
          <v-flex xs12 sm6>
            <v-card-text>
              <div class="your-profile">
                <h1>Your Profile</h1>
                <v-icon v-show="isAdmin" color="red">
                  memory
                </v-icon>
              </div>
              <p class="name">
                <span class="label font-weight-bold subheading">Name:</span>
                <span class="value body-2">{{ name }}</span>
              </p>
              <p class="email">
                <span class="label font-weight-bold subheading">Email:</span>
                <span class="value body-2">{{ email }}</span>
              </p>
              <div v-show="isFacebook">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  class="facebook"
                >
                  <path
                    d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"
                  />
                </svg>
              </div>
              <div v-show="!isFacebook">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 48 48"
                  class="google"
                >
                  <defs>
                    <path
                      id="a"
                      d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
                    />
                  </defs>
                  <clipPath id="b">
                    <use xlink:href="#a" overflow="visible" />
                  </clipPath>
                  <path
                    clip-path="url(#b)"
                    fill="#FBBC05"
                    d="M0 37V11l17 13z"
                  />
                  <path
                    clip-path="url(#b)"
                    fill="#EA4335"
                    d="M0 11l17 13 7-6.1L48 14V0H0z"
                  />
                  <path
                    clip-path="url(#b)"
                    fill="#34A853"
                    d="M0 37l30-23 7.9 1L48 0v48H0z"
                  />
                  <path
                    clip-path="url(#b)"
                    fill="#4285F4"
                    d="M48 48L17 24l-4-3 35-10z"
                  />
                </svg>
              </div>
            </v-card-text>
          </v-flex>
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

  middleware: ['auth'],

  head() {
    return {
      ...this.$mpaMeta.getBaseHead(
        'Your Profile',
        'My Pet Adoption',
        'Your profile on My Pet Adoption, a pet adoption and resource website.',
        'https://www.mypetadoption.com/ogmediablack.png',
        'https://www.mypetadoption.com/profile/'
      ),
      meta: [
        {
          name: 'robots',
          hid: 'robots',
          content: 'noindex'
        }
      ]
    }
  },

  computed: {
    name: function(app) {
      return app.$auth.user ? app.$auth.user.name : ''
    },

    email: function(app) {
      return app.$auth.user ? app.$auth.user.email : ''
    },

    facebookImage: function(app) {
      return app.$auth.user
        ? 'https://graph.facebook.com/' +
            app.$auth.user.sub.split('|')[1] +
            '/picture?width=9999'
        : ''
    },

    isFacebook: function(app) {
      if (app.$auth.user && app.$auth.user.sub.split('|')[0] === 'facebook') {
        return true
      } else {
        return false
      }
    },

    isAdmin(app) {
      if (
        app.$auth.user &&
        app.$auth.user['https://www.mypetadoption.com/app_metadata'] &&
        app.$auth.user['https://www.mypetadoption.com/app_metadata'].admin
      ) {
        return true
      } else {
        return false
      }
    }
  },

  asyncData(app) {
    return {
      webPageSchema: {
        ...{
          description:
            'Your profile on My Pet Adoption, a pet adoption and resource website.',
          headline: 'Your Profile',
          image: 'https://www.mypetadoption.com/ogmediablack.png',
          name: 'Your Profile',
          thumbnailUrl: 'https://www.mypetadoption.com/ogmediablack.png',
          url: 'https://www.mypetadoption.com/profile/'
        }
      }
    }
  }
}
</script>

<style lang="scss">
.facebook {
  fill: white;
  background-color: #3b5898;
  padding-top: 3px;
  padding-left: 3px;
  border-radius: 3px;
}

.google {
  width: 25px;
  height: 25px;
}

.your-profile {
  h1 {
    display: inline;
  }
  i.v-icon {
    padding-bottom: 1px;
  }
}
</style>
