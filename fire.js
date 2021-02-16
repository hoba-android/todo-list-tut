import * as firebase from "firebase";
import "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyChNORfg3IPQE6Ybw7hoReNgXAy70ccgPc",
  authDomain: "signal-clone-81bd2.firebaseapp.com",
  projectId: "signal-clone-81bd2",
  storageBucket: "signal-clone-81bd2.appspot.com",
  messagingSenderId: "201515680034",
  appId: "1:201515680034:web:63273504f8aea4eca6657b",
};

class Fire {
  init(callback) {
    if (!firebase.apps.length) {
      console.log("app");
      firebase.initializeApp(firebaseConfig);
    }

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log("user", user);
        callback(null, user);
      } else {
        firebase
          .auth()
          .signInAnonymously()
          .catch((error) => {
            callback(error);
          });
      }
    });
  }
}

export default Fire;
