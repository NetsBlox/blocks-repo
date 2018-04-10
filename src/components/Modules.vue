<template>
  <div class="container">
    <h1>Modules <router-link :to="{name: 'New'}"><i class="material-icons">add</i></router-link></h1>
    <ul class="collection with-header">
      <li class="collection-header">Available modules in the repo</li>
      <router-link v-for="module in modules" v-bind:key="module._id" class="collection-item" :to="{name: 'Module', params: {id: module._id}}">
        {{ module.name }}
        <i class="material-icons" v-if="!module.published">warning</i>
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
    // try to get all the modules if failed: get only the published ones
    // should be switched when we have a better of looking up if the user is admin
    this.fetchModules()
      .catch(() => {
        return this.fetchModules(true);
      });
  },
  methods: {
    fetchModules(publishedOnly) {
      let modsPromise = publishedOnly ? loadCol(modulesRef, ['published', '==', true]) : loadCol(modulesRef);
      return modsPromise
        .then(mods => {
          this.modules = mods;
        });
    }
  }
};
</script>

<style scoped>
</style>
