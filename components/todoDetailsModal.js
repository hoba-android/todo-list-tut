import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  FlatList,
  Keyboard,
} from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import colors from "../Colors";

const todoDetailsModal = ({ closeModal, data, updateList }) => {
  const [newTask, setNewTask] = useState("");
  const { name, color, todos } = data;
  const completed = data.todos.filter((item) => item.completed).length;
  const taskCount = data.todos.length;

  const toggleTodoCompleted = (index) => {
    data.todos[index].completed = !data.todos[index].completed;

    updateList(data);
  };

  const addTask = () => {
    data.todos.push({ title: newTask, completed: false });
    updateList(data);
    setNewTask("");
    Keyboard.dismiss();
  };
  const renderTodoItem = (todo, index) => {
    return (
      <View style={styles.todoContainer}>
        <TouchableOpacity onPress={() => toggleTodoCompleted(index)}>
          <Ionicons
            name={todo.completed ? "ios-square" : "ios-square-outline"}
            size={24}
            color={colors.gray}
            style={{ width: 32 }}
          />
        </TouchableOpacity>
        <Text
          style={[
            styles.todo,
            {
              color: todo.completed ? colors.gray : colors.black,
              textDecorationLine: todo.completed ? "line-through" : "none",
            },
          ]}
        >
          {todo.title}
        </Text>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <TouchableOpacity
          style={{ position: "absolute", top: 64, right: 32, zIndex: 10 }}
          onPress={closeModal}
        >
          <AntDesign name="close" size={24} color={colors.black} />
        </TouchableOpacity>

        <View
          style={[styles.section, styles.header, { borderBottomColor: color }]}
        >
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.taskCount}>
            {completed} of {taskCount} completed
          </Text>
        </View>
        <View style={[styles.section, { flex: 3 }]}>
          <FlatList
            contentContainerStyle={{
              paddingHorizontal: 32,
              paddingVertical: 64,
            }}
            showsVerticalScrollIndicator={false}
            data={todos}
            key={(item, index) => index.toString()}
            renderItem={({ item, index }) => renderTodoItem(item, index)}
          />
        </View>

        <View behavior="padding" style={[styles.section, styles.footer]}>
          <TextInput
            style={[styles.input, { borderColor: color }]}
            onChangeText={(t) => setNewTask(t)}
            value={newTask}
          />
          <TouchableOpacity
            onPress={addTask}
            style={[styles.addtodo, { backgroundColor: color }]}
          >
            <AntDesign name="plus" size={16} color={colors.white} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default todoDetailsModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  section: {
    flex: 1,
    alignSelf: "stretch",
  },
  header: {
    justifyContent: "flex-end",
    borderBottomWidth: 3,
    marginLeft: 64,
  },
  title: {
    fontSize: 30,
    fontWeight: "900",
    color: colors.black,
  },
  taskCount: {
    marginTop: 4,
    marginBottom: 16,
    fontWeight: "600",
    color: colors.gray,
  },
  input: {
    flex: 1,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 6,
    height: 48,
    marginRight: 6,
    paddingHorizontal: 8,
  },
  footer: {
    flexDirection: "row",
    paddingHorizontal: 30,
    alignItems: "center",
  },
  addtodo: {
    borderRadius: 4,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  todoContainer: {
    flexDirection: "row",
    paddingVertical: 16,
    alignItems: "center",
  },
  todo: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.black,
  },
});
