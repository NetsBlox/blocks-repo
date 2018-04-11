<template>
  <div>
    <h2>Post a new module</h2>
    <div class="container">
      <p>Share your Snap or Netsblox modules with others!</p>
      <form method="post" accept-charset="utf-8">
        <div class="input-field">
          <input v-model="module.name" type="text">
          <label>Name</label>
        </div>
        <div class="input-field">
          <input v-model="module.description" type="text">
          <label>Description</label>
        </div>
        <div class="file-field input-field">
          <div class="btn">
            <span>File</span>
            <input type="file" multiple>
          </div>
          <div class="file-path-wrapper">
            <input class="file-path validate" :disabled="isUploading" required type="text" placeholder="Upload one or more files" @change="filesChanged">
          </div>
        </div>
        <button class="btn" :disabled="isUploading" @click.prevent="postModule()">Submit</button>
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
      module: {
        name: '',
        description: '',
        files: [],
        tags: [],
        isSnapCompatible: false,
        isNBCompatible: false,
        published: false
      },
      isUploading: false
    };
  },
  methods: {
    postModule() {
      // post the metadata
      this.isUploading = true;
      this.uploadFiles(this.getFiles())
        .then(res => {
          let uploadResults = res.data;
          this.module.files = uploadResults;
          return modulesRef.add(this.module);
        })
        .then(res => {
          this.isUploading = false;
          this.module = {};
          console.log('Document successfully written!', res.id);
          this.$router.push('/modules/' + res.id);
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
