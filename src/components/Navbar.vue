<template>
  <nav>
    <div class="nav-wrapper orange darken-4">
      <router-link :to="{name: 'Home'}" class="brand-logo center">NetsBlox</router-link>
      <ul id="nav-mobile" class="right hide-on-small-only">
        <li><router-link :to="{name: 'New'}">Post a Module</router-link></li>
        <li v-if="!!user.email"><router-link :to="{name: 'AuthSuccess'}">My Profile</router-link></li>
      </ul>
    </div>
  </nav>
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
  created() {
  }
};
</script>

<style scoped>
</style>
