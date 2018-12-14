<template>
  <div>
    <h1>{{ title }}</h1>
    <p>{{ msg }}</p>
    <router-link class="btn" :to="Home">
      Home
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Msg',
  props: ['msg', 'title'],
  data() {
    return {
    };
  }
};
</script>

<style scoped>
</style>
