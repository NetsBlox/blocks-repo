<template>
  <div>
    <h1>Reusable Custom Libraies</h1>
    <p>Welcome to NetsBlox's library sharing platform.</p>
    <Modules/>
  </div>
</template>

<script>
import { modulesRef, loadCol } from '@/firebase';
import Modules from '@/components/Modules';
export default {
  name: 'Home',
  components: {
    Modules
  },
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
