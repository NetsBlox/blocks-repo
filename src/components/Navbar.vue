<template>
  <div>
    <nav>
      <div class="nav-wrapper orange darken-4">
        <router-link :to="{name: 'Home'}" class="brand-logo center">NetsBlox</router-link>
        <a href="#" data-target="mobile-demo" class="sidenav-trigger">
          <i class="material-icons">menu</i>
        </a>
        <ul id="nav-mobile" class="right hide-on-small-only">
          <li><router-link :to="{name: 'New'}">Post a Module</router-link></li>
          <li v-if="!user.email"><router-link :to="{name: 'Auth'}">Login</router-link></li>
          <li v-if="!!user.email"><router-link :to="{name: 'AuthSuccess'}">My Profile</router-link></li>
        </ul>
      </div>
    </nav>
    <ul class="sidenav" id="mobile-demo">
      <li><router-link :to="{name: 'New'}">Post a Module</router-link></li>
      <li v-if="!!user.email"><router-link :to="{name: 'AuthSuccess'}">My Profile</router-link></li>
    </ul>
  </div>
</template>

<script>
import { userMixin } from '@/mixins';
export default {
  name: 'Navbar',
  mixins: [userMixin],
  data() {
    return {
    };
  },
  mounted() {
    /* global M */
    let elem = document.querySelector('.sidenav');
    M.Sidenav.init(elem);
  }
};
</script>

<style scoped>
</style>
