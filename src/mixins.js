import { usersRef } from '@/firebase';
import firebase from 'firebase';

export const userMixin = {
  data() {
    return {
      user: {}
    };
  },
  created() {
    this.listenForUser();
  },
  methods: {
    // FIXME this is not going to work for a second call (solution: state management)
    // listens for changes to user and keeps it updated
    listenForUser() {
      firebase.auth().onAuthStateChanged(user => {
        console.log('got user', user);
        if (user) {
          usersRef.doc(user.uid).get()
            .then(userDoc => {
              this.user = userDoc.data();
              this.user.uid = user.uid;
            });
        } else {
          this.user = {}; // or maybe undefined?! vuex
        }
      });
    },
    isAdmin() {
      return this.user && this.user.admin;
    }
  }
};
