<template>
  <v-layout class="bounce"> </v-layout>
</template>

<script>
export default {
  layout: 'noToolbar',

  mounted() {
    this.$router.push('/login')
  }
}
</script>
