<template>
  <nav>
    <div class="nav-wrapper">
      <router-link :to="{name: 'Modules'}" class="brand-logo left">NetsBlox</router-link>
      <ul id="nav-mobile" class="right hide-on-small-only">
        <li><a href="#">Link 1</a></li>
        <li><a href="#">Link 2</a></li>
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
