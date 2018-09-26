import firebase from "../firebase";

export default {
  get: () => {
    let rootRef = firebase.database().ref("links");
    return rootRef.once("value");
  }
};
