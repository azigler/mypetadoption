<template>
  <v-layout class="under-maintenance" align-center column>
    <structured-data
      type="WebPage"
      :properties="webPageSchema"
      :schema="$mpaSchema.entireSchema"
    />
    <v-flex xs5>
      <v-img src="/symbol512black.png" aspect-ratio="1" width="200" />
    </v-flex>
    <v-flex xs6>
      <v-card tile elevation="12" max-width="450">
        <v-card-title>
          <h1 class="title text-xs-center mx-auto">
            My Pet Adoption is&nbsp;under&nbsp;maintenance
          </h1>
        </v-card-title>
        <v-flex block text-xs-center>
          <v-icon color="blue-grey lighten-5">build</v-icon>
          <v-icon color="brown darken-1">pets</v-icon>
          <v-icon color="blue-grey lighten-5">build</v-icon>
          <v-icon color="brown lighten-1">pets</v-icon>
          <v-icon color="blue-grey lighten-5">build</v-icon>
          <v-icon color="brown darken-1">pets</v-icon>
          <v-icon color="blue-grey lighten-5">build</v-icon>
          <v-icon color="brown lighten-1">pets</v-icon>
          <v-icon color="blue-grey lighten-5">build</v-icon>
          <v-icon color="brown darken-1">pets</v-icon>
          <v-icon color="blue-grey lighten-5">build</v-icon>
        </v-flex>
        <v-card-text class="subheading">
          <p>
            Sign up for early access now by simply
            <nuxt-link to="login/">logging in</nuxt-link> with Facebook or
            Google to create your account.
          </p>

          <p>Your free account will soon include:</p>

          <ul>
            <li>access to our powerful new pet adoption shelter search,</li>
            <li>
              a comprehensive pet guidebook about housebreaking, training, and
              caring for dogs and cats,
            </li>
            <li>
              a pet gift registry with sweet deals for pampering your furry
              friends,
            </li>
            <li>
              community resources for fostering local pets in need of help and
              love,
            </li>
            <li>
              "virtual volunteering" tools for assisting shelters near and far,
            </li>
            <li>
              and much more!
            </li>
          </ul>
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="primary lighten-1"
            class="font-weight-bold login-button"
            depressed
            block
            @click="$auth.loginWith('auth0')"
          >
            Log in now to create your free account!
          </v-btn>
        </v-card-actions>
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
            'My Pet Adoption, a pet adoption and resource website, is under maintenance.',
          headline: 'Under Maintenance',
          image: 'https://pensive-fermat-55a1e3.netlify.com/ogmediablack.png',
          name: 'Under Maintenance',
          thumbnailUrl:
            'https://pensive-fermat-55a1e3.netlify.com/ogmediablack.png',
          url: 'https://pensive-fermat-55a1e3.netlify.com/'
        }
      }
    }
  },

  head() {
    return this.$mpaMeta.getBaseHead(
      'Under Maintenance',
      'My Pet Adoption',
      'MyPetAdoption.com, a pet adoption and resource website, is under maintenance.',
      'https://pensive-fermat-55a1e3.netlify.com/ogmediablack.png',
      'https://pensive-fermat-55a1e3.netlify.com/'
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

ul {
  margin: 0 auto;
  list-style: none;
  width: 22rem;

  li {
    padding-left: 0.5rem;
    text-indent: -1.45rem;
    padding: 0 0 0.5rem 0;
  }

  li::before {
    content: '🐾 ';
    font-size: 13px;
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
