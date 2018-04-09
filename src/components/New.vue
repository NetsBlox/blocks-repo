<template>
  <div>
    <h1>Post a new module</h1>
    <div class="container">
      <div class="input-field">
        <input placeholder="Placeholder" v-model="name" type="text">
        <label>Name</label>
      </div>
      <div class="input-field">
        <input placeholder="Placeholder" v-model="description" type="text">
        <label>Description</label>
      </div>
      <!-- <input type="file" name="" value="" /> -->
      <button @click="postModule()">Submit</button>
    </div>
    <ul>
      <li></li>
    </ul>
  </div>
</template>

<script>
import { modulesRef } from '@/firebase';
export default {
  name: 'New',
  data() {
    return {
      name: '',
      description: '',
      hash: '',
      modules: []
    };
  },
  methods: {
    postModule() {
      // post module
      modulesRef.add({
        name: this.name,
        description: this.description,
        hash: this.hash
      })
        .then(function() {
          console.log('Document successfully written!');
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
