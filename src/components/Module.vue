<template>
  <div class="container">
    <h2>Module {{ module.name }}
      <a href="#" v-if="canEdit" @click.prevent="toggleEdit"><i class="material-icons">edit</i></a>
      <a href="#" v-if="canDelete" @click.prevent="confirmAndDelete"><i class="material-icons">delete_forever</i></a>
    </h2>
    <div class="grid">
      <div class="main">
        <img  v-for="img in images" :src="img.path" :key="img.filename" :alt="img.originalname"/>
        <p>{{ module.description }}</p>
        <div v-if="showEdit">
          <New :edit="module"/>
        </div>
      </div>
      <div class="sidebar">
        <ul class="collection with-header">
          <li class="collection-header"><h5>Properties</h5></li>
          <li class="collection-item" v-show="isSnapComp">Snap compatible</li>
          <li class="collection-item" v-show="isNbComp">NetsBlox compatible</li>
          <li v-show="isAdmin" class="collection-item" v-bind:class="{yellow: !module.published, green: module.published}">
            {{ module.published ? 'Confirmed' : 'Unconfirmed' }}
          </li>
        </ul>
        <ul class="collection with-header">
          <li class="collection-header"><h5>Files</h5></li>
          <li class="collection-item" v-for="file in projectFiles" :key="file.filename">
            <div>
              {{ file.originalname }}:
              <a class="secondary-content" :href="file.path" :filename="file.originalname"> <i class="material-icons right">file_download</i> </a>
            </div>
          </li>
        </ul>
          <button v-show="isAdmin" @click="togglePublish" class="btn">
            {{ module.published ? 'Unconfirm' : 'Confirm' }}
          </button>
      </div>
    </div>
  </div>
</template>

<script>
/* global confirm */
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
    },
    isSnapComp() {
      return this.module.compats && this.module.compats.includes('snap');
    },
    isNbComp() {
      return this.module.compats && this.module.compats.includes('netsblox');
    },
    canEdit() {
      return this.user.admin === true || (this.module.author && (this.module.author === this.user.uid));
    },
    canDelete() {
      return this.user.admin === true;
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
  mounted() {
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
    toggleEdit() {
      this.showEdit = !this.showEdit;
    },
    confirmAndDelete() {
      if (confirm('Are you sure you want to delete this module?')) {
        return modulesRef.doc(this.id).delete()
          .then(() => {
            this.module = {};
            this.$router.push('/');
            // TODO delete server side
          });
      }
    },
    togglePublish() {
      // apply the effect to a copy untill its successfully change in the database
      let modCopy = {...this.module};
      modCopy.published = !modCopy.published;
      return modulesRef.doc(modCopy.id).set(modCopy)
        .then(res => {
          this.module.published = modCopy.published; // racecond?
        });
    }
  }
};
</script>

<style scoped>
img {
  margin: 0 auto;
  max-height: 50vh;
}

.grid {
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-gap: 2rem;
}

@media (max-width: 700px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
