<template>
  <div class="container">
    <h1>Modules <router-link :to="{name: 'New'}"><i class="material-icons">add</i></router-link></h1>
    <ul class="collection with-header">
      <li class="collection-header">Available modules in the repo</li>
      <router-link v-for="module in modules" v-bind:key="module._id" href="#!" class="collection-item" :to="{name: 'Module', params: {id: module._id}}"> {{ module.name }}
      </router-link>
      </ul>
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
