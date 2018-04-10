<template>
  <div class="container">
    <h2>Module {{ name }}</h2>
    <p>{{ description }}</p>
    <ul>
      <li v-for="file in files" :key="file.filename">{{ file.originalname }}:
        <a :href="file.path" :filename="file.originalname" class="waves-effect waves-light btn">Download</a>
      </li>
    </ul>
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
      files: []
    };
  },
  props: ['id'],
  created() {
    this.fetchDoc(this.id)
      .then(module => {
        this.name = module.name;
        this.description = module.description;
        this.files = module.files;
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
