import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import colors from "../Colors";
import tempData from "../tempData";

const addListModal = ({ closeModal, addlist }) => {
  const [name, setName] = useState("");

  const backgroundColors = [
    "#5CD859",
    "#24A6D9",
    "#595BD9",
    "#8022D9",
    "#D159D8",
    "#D85963",
    "#D88559",
  ];

  const [color, setBgColor] = useState(backgroundColors[0]);

  const renderColor = () => {
    return backgroundColors.map((color) => {
      return (
        <TouchableOpacity
          key={color.toString()}
          style={[styles.selecetColor, { backgroundColor: color }]}
          onPress={() => setBgColor(color)}
        />
      );
    });
  };

  const createList = () => {
    addlist({ name, color });
    setName("");
    closeModal();
  };

  return (
    <KeyboardAvoidingView style={styles.contianer} behavior="padding">
      <TouchableOpacity
        style={{ position: "absolute", top: 64, right: 32 }}
        onPress={closeModal}
      >
        <AntDesign name="close" size={24} color={colors.black} />
      </TouchableOpacity>

      <View style={{ alignSelf: "stretch", marginHorizontal: 32 }}>
        <Text style={styles.title}>Create TODO List</Text>
        <TextInput
          style={styles.input}
          placeholder="List Name?"
          onChangeText={(t) => setName(t)}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: 12,
          }}
        >
          {renderColor()}
        </View>

        <TouchableOpacity
          style={[styles.create, { backgroundColor: color }]}
          onPress={createList}
        >
          <Text style={{ color: colors.white, fontWeight: "700" }}>Create</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default addListModal;

const styles = StyleSheet.create({
  contianer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: colors.black,
    alignSelf: "center",
    marginBottom: 16,
  },
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.blue,
    borderRadius: 6,
    height: 58,
    marginTop: 8,
    paddingHorizontal: 16,
    fontSize: 18,
  },
  create: {
    marginTop: 24,
    height: 50,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  selecetColor: {
    width: 30,
    height: 30,
    borderRadius: 4,
  },
});
