import * as firebase from "firebase";

var config = {
  apiKey: "AIzaSyB_8c1EdXahsCgi9yUOE7Ufd0iywtTEdt4",
  authDomain: "bookmark-managemant-system.firebaseapp.com",
  databaseURL: "https://bookmark-managemant-system.firebaseio.com",
  projectId: "bookmark-managemant-system",
  storageBucket: "bookmark-managemant-system.appspot.com",
  messagingSenderId: "497161489119"
};

firebase.initializeApp(config);
// firebase.initializeApp(config);
// var rootRef = firebase.database().ref("links");
// rootRef.once("value").then(function(snapshot) {
// let data = snapshot.val();

//   console.log(data);
// //   window.localStorage.setItem("links", JSON.stringify(data));
// })

export default firebase;
