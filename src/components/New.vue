<template>
  <div>
    <h2>{{ title }}</h2>
    <div class="container">
      <p>Share your Snap or Netsblox modules with others!</p>
      <form method="post" accept-charset="utf-8">
        <div class="input-field">
          <input v-model="module.name" type="text">
          <label>Name</label>
        </div>
        <div class="input-field">
          <textarea class="materialize-textarea" v-model="module.description"></textarea>
          <label>Description</label>
        </div>
        <div class="checkboxes">
          <p>Which platform(s) is this block compatible with?</p>
          <label>
            <input type="checkbox" value="netsblox" v-model="module.compats">
            <span>NetsBlox</span>
          </label>
          <label>
            <input type="checkbox" value="snap" v-model="module.compats">
            <span>Snap</span>
          </label>
        </div>
        <p>Upload block xml files and optional images related to the library and its functionality</p>
        <div class="file-field input-field">
          <div class="btn">
            <span>File</span>
            <input type="file" multiple>
          </div>
          <div class="file-path-wrapper">
            <input class="file-path validate" :disabled="isUploading" required type="text" placeholder="Upload one or more files" @change="filesChanged">
          </div>
        </div>
        <button class="btn waves-effect waves-light" :disabled="isUploading" @click.prevent="postModule()">Submit <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
/* global M */
import { modulesRef } from '@/firebase';
import { userMixin } from '@/mixins';
import axios from 'axios';
export default {
  name: 'New',
  data() {
    return {
      module: {
        name: '',
        description: '',
        files: [],
        tags: [],
        compats: [],
        published: false,
        author: null
      },
      isUploading: false
    };
  },
  props: ['edit'],
  created() {
    if (this.edit) this.module = this.edit;
  },
  mounted() {
    // reinitalize material input fields
    M.updateTextFields();
  },
  mixins: [userMixin],
  computed: {
    title() {
      let msg = this.isEditing() ? 'Edit the submission' : 'Post a new module';
      return msg;
    }
  },
  methods: {
    isEditing() {
      return this.edit;
    },
    postModule() {
      // post the metadata
      let filesHandles = this.getFiles();
      this.isUploading = true;
      return this.uploadFiles(filesHandles)
        .then(uploadResults => {
          this.module.files = uploadResults;
          console.log('posting', this.module);
          if (this.isEditing()) {
            return modulesRef.doc(this.module.id).set(this.module);
          } else {
            // set the author if the creator is logged in
            if (this.user.uid) this.module.author = this.user.uid;
            return modulesRef.add(this.module);
          }
        })
        .then(res => {
          this.isUploading = false;
          // compute the doc id since res might b undefined (because of edit)
          let id = res ? res.id : this.module.id;
          console.log('Document successfully written!', id);
          alert('Your request has been submitted and will be published once it\'s approved.');
          this.$router.push({name: 'Home'});
        })
        .catch(err => {
          this.isUploading = false;
          console.error(err);
        });
    },
    getFiles() {
      let files = document.querySelector('input[type="file"]').files;
      return files;
    },
    filesChanged(e) {
      console.log('files changed');
    },
    uploadFiles(fileList) {
      if (fileList.length === 0 && this.isEditing()) {
        return Promise.resolve(this.module.files);
      }
      // FIXME this should be a relative path on production
      const uploadUrl = 'http://localhost:5000/upload';
      let formData = new FormData();
      this.fileListToArr(fileList)
        .forEach((file) => {
          formData.append('modules', file);
        });
      return axios.post(uploadUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then(({ data }) => {
          return data;
        });
    },
    fileListToArr(fileList) {
      // try Array.from()
      let files = [];
      for (let i = 0; i < fileList.length; i++) {
        files.push(i, fileList[i]);
      }
      return files;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.checkboxes label {
  margin-right: 2rem;
}
</style>
