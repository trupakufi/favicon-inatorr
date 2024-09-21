<template>
  <div class="error-page">
    <h1 v-if="error.statusCode === 404">Page Not Found</h1>
    <p v-if="error.statusCode === 404">
      Sorry, the page you are looking for does not exist.
    </p>

    <h1 v-else>{{ error.statusCode }}</h1>
    <p v-else>{{ error.message }}</p>

    <nuxt-link to="/">Go back to the homepage</nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
};
</script>

<style scoped>
.error-page {
  text-align: center;
  padding: 50px;
}
</style>
