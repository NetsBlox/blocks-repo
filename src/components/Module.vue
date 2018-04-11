<template>
  <div class="container">
    <h2>Module {{ module.name }}</h2>
    <p>{{ module.description }}</p>
    <img class="materialboxed" v-for="img in images" :src="img.path" :key="img.filename" :alt="img.originalname"/>
    <ul>
      <li v-for="file in projectFiles" :key="file.filename">{{ file.originalname }}:
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
      module: {
        name: '',
        description: '',
        files: []
      }
    };
  },
  props: ['id'],
  computed: {
    images() {
      let images = this.module.files.filter(f => {
        return f.mimetype.includes('image');
      });
      return images;
    },
    projectFiles() {
      return this.module.files.filter(f => {
        return !f.mimetype.includes('image');
      });
    }
  },
  created() {
    this.fetchDoc(this.id)
      .then(module => {
        this.module = module;
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
            this.module.name = 'Not found.';
            throw new Error(`document ${id} does not exist.`);
          }
        });
    }
  }
};
</script>

<style scoped>
  img {
    max-height: 50vh;
  }
</style>
