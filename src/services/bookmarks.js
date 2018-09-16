import firebase from "../firebase";

export default {
  get: () => {
    var rootRef = firebase.database().ref("links");
    return rootRef.once("value");
  }
};
