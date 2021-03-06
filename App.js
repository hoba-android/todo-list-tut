import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Modal,
  ActivityIndicator,
} from "react-native";
import colors from "./Colors";
import tempData from "./tempData";
import Todolist from "./components/todolist";
import AddListModal from "./components/addListModal";
import { AntDesign } from "@expo/vector-icons";

///// set tiemout workaround code //////
import { Platform, InteractionManager } from "react-native";

const _setTimeout = global.setTimeout;
const _clearTimeout = global.clearTimeout;
const MAX_TIMER_DURATION_MS = 60 * 1000;
if (Platform.OS === "android") {
  // Work around issue `Setting a timer for long time`
  // see: https://github.com/firebase/firebase-js-sdk/issues/97
  const timerFix = {};
  const runTask = (id, fn, ttl, args) => {
    const waitingTime = ttl - Date.now();
    if (waitingTime <= 1) {
      InteractionManager.runAfterInteractions(() => {
        if (!timerFix[id]) {
          return;
        }
        delete timerFix[id];
        fn(...args);
      });
      return;
    }

    const afterTime = Math.min(waitingTime, MAX_TIMER_DURATION_MS);
    timerFix[id] = _setTimeout(() => runTask(id, fn, ttl, args), afterTime);
  };

  global.setTimeout = (fn, time, ...args) => {
    if (MAX_TIMER_DURATION_MS < time) {
      const ttl = Date.now() + time;
      const id = "_lt_" + Object.keys(timerFix).length;
      runTask(id, fn, ttl, args);
      return id;
    }
    return _setTimeout(fn, time, ...args);
  };

  global.clearTimeout = (id) => {
    if (typeof id === "string" && id.startsWith("_lt_")) {
      _clearTimeout(timerFix[id]);
      delete timerFix[id];
      return;
    }
    _clearTimeout(id);
  };
}

////////////////////////
/// uid : PfTJTBDE6jfOsqjYXu8P1Eu1HBH2
//////////////////
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

/////////////////////

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [lists, setLists] = useState([]);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // console.log("logged", user);
      } else {
        // console.log("user", user.uid);
        firebase
          .auth()
          .signInAnonymously()
          .catch((error) => {
            console.log(error);
          });
      }

      let uid = firebase.auth().currentUser.uid;
      const unsubscribe = firebase
        .firestore()
        .collection("users")
        .doc(uid)
        .collection("lists")
        .onSnapshot((snapshot) => {
          const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setLists(data);
          setLoading(false);
        });

      setUser(user);
    });
  }, []);

  const addList2 = (list) => {
    let uid = firebase.auth().currentUser.uid;
    let ref = firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .collection("lists");

    ref.add(list);
  };

  const updateList2 = (list) => {
    let uid = firebase.auth().currentUser.uid;
    let ref = firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .collection("lists");

    ref.doc(list.id).update(list);
  };

  const toggleMoadalVisiblitly = () => {
    setModalVisible(!modalVisible);
  };

  const renderList = (list) => {
    return <Todolist list={list} updateList={updateList} />;
  };

  const addList = (list) => {
    /// local data
    // setLists([...lists, { ...list, id: lists.length + 1, todos: [] }]);
    /// firebase add list
    addList2({
      name: list.name,
      color: list.color,
      todos: [],
    });
  };

  const updateList = (list) => {
    // local
    // setLists(
    //   lists.map((item) => {
    //     return item.id === list.id ? list : item;
    //   })
    // );

    // firebas update
    updateList2(list);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.blue} />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={toggleMoadalVisiblitly}
      >
        <AddListModal closeModal={toggleMoadalVisiblitly} addlist={addList} />
      </Modal>

      <View style={{ flexDirection: "row" }}>
        <View style={styles.divider} />
        <Text style={styles.title}>
          ToDo
          <Text style={{ fontWeight: "300", color: colors.blue }}>List</Text>
        </Text>
        <View style={styles.divider} />
      </View>

      <View style={{ marginVertical: 38 }}>
        <TouchableOpacity
          style={styles.addtolist}
          onPress={toggleMoadalVisiblitly}
        >
          <AntDesign name="plus" size={16} color={colors.lightblue} />
        </TouchableOpacity>
        <Text style={styles.add}>Add list</Text>
      </View>

      <View style={{ paddingLeft: 30, height: 235 }}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={lists}
          key={(item) => item.id.toString()}
          renderItem={({ item }) => renderList(item)}
          keyboardShouldPersistTaps="always"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  divider: {
    height: 1,
    flex: 1,
    alignSelf: "center",
    backgroundColor: colors.lightblue,
  },
  title: {
    paddingHorizontal: 64,
    fontSize: 38,
    fontWeight: "800",
    color: colors.black,
  },
  addtolist: {
    borderWidth: 2,
    borderRadius: 4,
    borderColor: colors.lightblue,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  add: {
    color: colors.blue,
    fontSize: 16,
    fontWeight: "400",
    marginTop: 8,
  },
});
