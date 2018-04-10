<template>
  <nav>
    <div class="nav-wrapper">
      <router-link :to="{name: 'Modules'}" class="brand-logo center">NetsBlox</router-link>
      <ul id="nav-mobile" class="right hide-on-small-only">
        <li><router-link :to="{name: 'New'}">Post a Module</router-link></li>
        <li v-if="!!user.uid"><router-link :to="{name: 'AuthSuccess'}">My Profile</router-link></li>
      </ul>
    </div>
  </nav>
</template>

<script>
import firebase from 'firebase';
export default {
  name: 'Navbar',
  data() {
    return {
      user: {}
    };
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user;
      } else {
        this.user = {};
      }
    });
  }
};
</script>

<style scoped>
</style>
