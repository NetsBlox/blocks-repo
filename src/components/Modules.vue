<template>
  <div class="container">
    <h1>Modules</h1>
    <p>Available modules in the repo</p>
    <div class="collection">
      <a v-for="module in modules" href="#!" class="collection-item">{{ module.name }}</a>
      </div>
    <ul>
    </ul>
  </div>
</template>

<script>
import { modulesRef, loadCol } from '@/firebase';
export default {
  name: 'Modules',
  data() {
    return {
      modules: []
    };
  },
  created() {
    this.fetchModules();
  },
  methods: {
    fetchModules() {
      loadCol(modulesRef)
        .then(mods => {
          console.log(mods);
          this.modules = mods;
        });
    }
  }
};
</script>

<style scoped>
</style>
