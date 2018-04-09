<template>
  <div class="container">
    <h1>Module {{ id }}</h1>
    <p>Available modules in the repo</p>
    <div class="collection">
      <a v-for="module in modules" href="#!" class="collection-item">{{ module.name }}</a>
      </div>
    <ul>
    </ul>
  </div>
</template>

<script>
import { modulesRef } from '@/firebase';
export default {
  name: 'Module',
  data() {
    return {
    };
  },
  props: ['id'],
  created() {
    console.log(this.id);
  },
  methods: {
  }
};
</script>

<style scoped>
</style>
