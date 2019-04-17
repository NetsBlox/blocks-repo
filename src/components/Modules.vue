<template>
  <div class="container">
    <h2>Modules <router-link :to="{name: 'New'}"><i class="material-icons">add</i></router-link></h2>
    <ul class="collection with-header" v-show="false">
      <li class="collection-header">Available modules in the repo</li>
      <router-link v-for="module in modules" v-bind:key="module._id" class="collection-item" :to="{name: 'Module', params: {id: module._id}}">
        {{ module.name }}
      </router-link>
    </ul>
    <div class="checkboxes">
      <span>Filter: </span>
      <label>
        <input type="checkbox" value="netsblox" v-model="filter.compats">
        <span>NetsBlox</span>
      </label>
      <label>
        <input type="checkbox" value="snap" v-model="filter.compats">
        <span>Snap</span>
      </label>
    </div>

    <div class="grid">
      <div v-for="module in filteredModules" v-bind:key="module._id" class="card  teal">
        <router-link :to="{name: 'Module', params: {id: module._id}}">
          <div class="card-content white-text">
            <span class="card-title">
              <i class="material-icons" v-if="!module.published" title="Unconfirmed">warning</i>
              {{ module.name }}
            </span>
            <p>{{ module.description }}</p>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { modulesRef, loadCol } from '@/firebase';
export default {
  name: 'Modules',
  data() {
    return {
      modules: [],
      filter: {
        compats: []
      }
    };
  },
  created() {
    // try to get all the modules if failed: get only the published ones
    // should be switched when we have a better of looking up if the user is admin
    this.fetchModules();
  },
  computed: {
    filteredModules() {
      let mods = this.modules
        // filter for compatibilities
        .filter(m => {
          let valid = true;
          if (!m.compats) { // if it wasn't defined for this module let it slip
            return true;
          } else {
            this.filter.compats.forEach(req => {
              if (!m.compats.includes(req)) {
                valid = false;
              }
            });
          }
          return valid;
        }); // end of compats check

      return mods;
    }
  },
  methods: {
    // TODO add methods to truncate
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
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 2rem;
  grid-auto-rows: minmax(100px, auto);
}
.checkboxes label{
  margin-left: 2rem;
}

.card:hover {
  box-shadow: 1px 1px 2px 2px gray;
}

.card-title i {
  font-size: 1.4rem;
  vertical-align: middle;
}

</style>
