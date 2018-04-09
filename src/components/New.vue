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
            <input class="file-path validate" required type="text" placeholder="Upload one or more files" @change="filesChanged">
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
      isUploading: false
    };
  },
  methods: {
    postModule() {
      // TODO upload the file
      // post the metadata
      this.uploadFiles(this.getFiles())
        .then(res => {
          let uploadResults = res.data;
          console.log(this.name, this.description, uploadResults)
          return modulesRef.add({
            name: this.name,
            description: this.description,
            files: uploadResults
          });
        })
        .then(res => {
          console.log('Document successfully written!');
        })
        .catch(console.error);
    },
    getFiles() {
      let files = document.querySelector('input[type="file"]').files;
      return files;
    },
    filesChanged(e) {
      console.log('files changed');
    },
    uploadFiles(fileList) {
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
</style>
