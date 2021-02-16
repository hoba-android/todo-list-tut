import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Modal,
} from "react-native";
import colors from "./Colors";
import tempData from "./tempData";
import Todolist from "./components/todolist";
import AddListModal from "./components/addListModal";
import { AntDesign } from "@expo/vector-icons";
import Fire from "./fire";
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
  const [lists, setLists] = useState(tempData);
  const [user, setUser] = useState({});

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

      setUser(user);
    });
  }, []);

  const toggleMoadalVisiblitly = () => {
    setModalVisible(!modalVisible);
  };

  const renderList = (list) => {
    return <Todolist list={list} updateList={updateList} />;
  };

  const addList = (list) => {
    setLists([...lists, { ...list, id: lists.length + 1, todos: [] }]);
  };

  const updateList = (list) => {
    setLists(
      lists.map((item) => {
        return item.id === list.id ? list : item;
      })
    );
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={toggleMoadalVisiblitly}
      >
        <AddListModal closeModal={toggleMoadalVisiblitly} addlist={addList} />
      </Modal>

      <View>
        <Text> User : {user.uid}</Text>
      </View>
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
          key={(item, index) => index.toString()}
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
