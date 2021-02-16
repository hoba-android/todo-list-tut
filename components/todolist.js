import React, { useState } from "react";
import { View, Text, StyleSheet, Modal, TouchableOpacity } from "react-native";
import colors from "../Colors";

import TodoDetailsModal from "./todoDetailsModal";

const todolist = ({ list, updateList }) => {
  const [listVisible, setListVisible] = useState(false);
  const completedCount = list.todos.filter((item) => item.completed).length;
  const remaingCount = list.todos.length - completedCount;

  const toggleMoadalVisiblitly = () => {
    setListVisible(!listVisible);
  };

  return (
    <View>
      <Modal
        animationType="slide"
        visible={listVisible}
        onRequestClose={toggleMoadalVisiblitly}
      >
        <TodoDetailsModal
          data={list}
          closeModal={toggleMoadalVisiblitly}
          updateList={updateList}
        />
      </Modal>

      <TouchableOpacity
        onPress={toggleMoadalVisiblitly}
        style={[styles.listcontainer, { backgroundColor: list.color }]}
      >
        <Text style={styles.listTitle} numberOfLines={1}>
          {list.name}
        </Text>

        <View style={{ alignItems: "center" }}>
          <Text style={styles.count}>{remaingCount}</Text>
          <Text style={styles.subtitle}>Remaining</Text>
        </View>

        <View style={{ alignItems: "center" }}>
          <Text style={styles.count}>{completedCount}</Text>
          <Text style={styles.subtitle}>Completed</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default todolist;

const styles = StyleSheet.create({
  listcontainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginHorizontal: 12,
    borderRadius: 6,
    alignItems: "center",
    width: 200,
  },
  listTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.white,
  },
  count: {
    fontSize: 48,
    fontWeight: "200",
    color: colors.white,
  },
  subtitle: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.white,
  },
});
