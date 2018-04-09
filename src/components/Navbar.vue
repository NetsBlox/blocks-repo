<template>
  <nav>
    <div class="nav-wrapper">
      <router-link :to="{name: 'Modules'}" class="brand-logo left">NetsBlox</router-link>
      <ul id="nav-mobile" class="right hide-on-small-only">
        <li><router-link :to="{name: 'New'}">Post a Module</router-link></li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
    };
  }
};
</script>

<style scoped>
</style>
