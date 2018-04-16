<template>
  <div class="container">
    <h2>Module {{ module.name }}
      <a href="#" v-if="canEdit" @click.prevent="toggleEdit"><i class="material-icons">edit</i></a>
    </h2>
    <div class="grid">
      <div class="main">
        <img class="materialboxed" v-for="img in images" :src="img.path" :key="img.filename" :alt="img.originalname"/>
        <p>{{ module.description }}</p>
        <div v-if="showEdit">
          <New :edit="module"/>
        </div>
      </div>
      <div class="sidebar">
        <ul class="collection with-header">
          <li class="collection-header"><h5>Files</h5></li>
          <li class="collection-item" v-for="file in projectFiles" :key="file.filename">
            <div>
              {{ file.originalname }}:
              <a class="secondary-content" :href="file.path" :filename="file.originalname"> <i class="material-icons right">file_download</i> </a>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { modulesRef } from '@/firebase';
import { userMixin } from '@/mixins';
import New from '@/components/New';

export default {
  name: 'Module',
  data() {
    return {
      showEdit: false,
      module: {
      }
    };
  },
  components: {
    New
  },
  mixins: [userMixin],
  props: ['id'],
  computed: {
    images() {
      if (!this.module.files) return [];
      let images = this.module.files.filter(f => {
        return f.mimetype.includes('image');
      });
      return images;
    },
    projectFiles() {
      if (!this.module.files) return [];
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
            let theDoc = doc.data();
            theDoc.id = id;
            return theDoc;
          } else {
            this.module.name = 'Not found.';
            throw new Error(`document ${id} does not exist.`);
          }
        });
    },
    canEdit() {
      console.log('user n mod', this.user, this.module);
      return this.user.admin === true || (this.module.author && (this.module.author === this.user.uid));
    },
    toggleEdit() {
      this.showEdit = !this.showEdit;
    }
  }
};
</script>

<style scoped>
img {
max-height: 50vh;
}

.grid {
display: grid;
grid-template-columns: 3fr 1fr;
grid-gap: 2rem;
}
</style>
