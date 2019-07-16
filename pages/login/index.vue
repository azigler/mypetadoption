<template>
  <v-layout class="login" align-center justify-center>
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
export default {
  layout: 'noToolbar',

  mounted() {
    if (this.$auth.loggedIn) {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>
.v-image {
  margin-bottom: -1.5rem;
}

.v-btn {
  border-radius: 0.5rem !important;
}
</style>
