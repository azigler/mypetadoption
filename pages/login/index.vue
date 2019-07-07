<template>
  <v-layout class="login" align-center justify-center>
    <v-btn block class="login-button" @click="$auth.loginWith('auth0')"
      >Login</v-btn
    >
  </v-layout>
</template>

<script>
export default {
  mounted() {
    if (this.$auth.loggedIn) {
      this.$router.replace('/')
    }
  }
}
</script>
