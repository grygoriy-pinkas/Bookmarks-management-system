import * as firebase from "firebase";

let config = {
  apiKey: "AIzaSyB_8c1EdXahsCgi9yUOE7Ufd0iywtTEdt4",
  authDomain: "bookmark-managemant-system.firebaseapp.com",
  databaseURL: "https://bookmark-managemant-system.firebaseio.com",
  projectId: "bookmark-managemant-system",
  storageBucket: "bookmark-managemant-system.appspot.com",
  messagingSenderId: "497161489119"
};

firebase.initializeApp(config);

export default firebase;
