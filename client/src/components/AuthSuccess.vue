<template>
  <div>
    <h1>{{ msg }}</h1>
    <button @click="logOut">Log out</button>
    <hr>
    <img :src="photo" style="height: 120px"> <br>
    <p>{{name}}</p>
    <p>{{email}}</p>
    <p>{{userId}}</p>
    <hr>
    <pre>{{user}}</pre>
  </div>
</template>

<script>
import firebase from 'firebase';
export default {
  name: 'AuthSuccess',
  data() {
    return {
      photo: '',
      userId: '',
      name: '',
      email: '',
      user: {},
      msg: ''
    };
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.name = user.displayName;
        this.email = user.email;
        this.photo = user.photoURL;
        this.userId = user.uid;
        this.user = user;
        this.msg = 'Logged in.';
      } else {
        this.msg = 'You are not logged in';
      }
    });
  },
  methods: {
    logOut() {
      firebase.auth().signOut();
    }
  }

};
</script>
