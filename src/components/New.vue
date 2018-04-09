<template>
  <div>
    <h1>Post a new module</h1>
    <div class="container">
      <form method="post" accept-charset="utf-8">
        <div class="input-field">
          <input v-model="name" type="text">
          <label>Name</label>
        </div>
        <div class="input-field">
          <input v-model="description" type="text">
          <label>Description</label>
        </div>
        <div class="file-field input-field">
          <div class="btn">
            <span>File</span>
            <input type="file" multiple>
          </div>
          <div class="file-path-wrapper">
            <!-- <input type="file" multiple :disabled="isSaving" @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length" accept="image/*" class="input-file"> -->
            <input class="file-path validate" type="text" placeholder="Upload one or more files" @change="filesChanged">
          </div>
        </div>
        <button class="btn" @click.prevent="postModule()">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
import { modulesRef } from '@/firebase';
import axios from 'axios';
export default {
  name: 'New',
  data() {
    return {
      name: '',
      description: '',
      hash: '',
      isUploading: false
    };
  },
  methods: {
    postModule() {
      // TODO upload the file
      // post the module
      modulesRef.add({
        name: this.name,
        description: this.description,
        hash: this.hash
      })
        .then(function() {
          console.log('Document successfully written!');
        });
    },
    getFiles() {
      let files = document.querySelector('input[type="file"]').files;
      return files;
    },
    filesChanged(e) {
      console.log('files changed');
    },
    uploadFiles(files) {
      const uploadUrl = '/upload';
      let formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append(i, files[i]);
      }
      return axios.post(uploadUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
