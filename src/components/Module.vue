<template>
  <div class="container">
    <h2>Module {{ name }}</h2>
    <p>{{ description }}</p>
    <button class="waves-effect waves-light btn">Download</button>
    <!-- TODO edit -->
  </div>
</template>

<script>
import { modulesRef } from '@/firebase';
export default {
  name: 'Module',
  data() {
    return {
      name: '',
      description: '',
      hash: ''
    };
  },
  props: ['id'],
  created() {
    this.fetchDoc(this.id)
      .then(module => {
        this.name = module.name;
        this.description = module.description;
        this.hash = module.hash;
        console.log('loaded doc', module);
      })
      .catch(alert);
  },
  methods: {
    // fetches a documents and throws an error if doc doesn't exist
    fetchDoc(id) {
      return modulesRef.doc(id).get()
        .then(doc => {
          if (doc.exists) {
            return doc.data();
          } else {
            throw new Error(`document ${id} does not exist.`);
          }
        });
    }
  }
};
</script>

<style scoped>
</style>
