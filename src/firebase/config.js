import firebase from 'firebase/compat/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyDsnUpG-_aW28Es41-XkiLU0Q9VHKlh_AA",
    authDomain: "olxclone-e502f.firebaseapp.com",
    projectId: "olxclone-e502f",
    storageBucket: "olxclone-e502f.appspot.com",
    messagingSenderId: "720213793257",
    appId: "1:720213793257:web:ee4db57f1636d5a061d378",
    measurementId: "G-09CDXX2HL2"
  };

  export const Firebase = firebase.initializeApp(firebaseConfig)