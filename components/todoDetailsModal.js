import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Keyboard,
  Animated,
} from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import colors from "../Colors";
import { Swipeable } from "react-native-gesture-handler";
import { FlatList } from "react-native-gesture-handler";

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
    let list = data;
    list.todos.push({ title: newTask, completed: false });
    updateList(list);
    setNewTask("");
    Keyboard.dismiss();
  };

  const deleteTodo = (index) => {
    let list = data;
    list.todos.splice(index, 1);
    updateList(list);
  };
  const renderTodoItem = (todo, index) => {
    return (
      <Swipeable renderRightActions={(_, dragX) => righActions(dragX, index)}>
        <View style={styles.todoMain}>
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
          <TouchableOpacity
            onPress={deleteTodo}
            style={{ paddingHorizontal: 13, marginTop: 10 }}
          >
            <AntDesign name="delete" size={36} color={colors.red} />
          </TouchableOpacity>
        </View>
      </Swipeable>
    );
  };

  const righActions = (dragX, index) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0.9],
      extrapolate: "clamp",
    });
    const opacity = dragX.interpolate({
      inputRange: [-100, -20, 0],
      outputRange: [1, 0.9, 0],
      extrapolate: "clamp",
    });
    return (
      <TouchableOpacity onPress={() => deleteTodo(index)}>
        <Animated.View style={[styles.deletButton, { opacity }]}>
          <Animated.Text
            style={{
              color: colors.white,
              fontWeight: "800",
              transform: [{ scale }],
            }}
          >
            Delete
          </Animated.Text>
        </Animated.View>
      </TouchableOpacity>
    );
  };
  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <TouchableOpacity
          style={{ position: "absolute", top: 10, right: 32, zIndex: 10 }}
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
        <View style={[styles.section, { flex: 3, marginVertical: 16 }]}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={todos}
            key={(item) => item.title}
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
    alignSelf: "stretch",
  },
  header: {
    justifyContent: "flex-end",
    borderBottomWidth: 3,
    marginLeft: 64,
    paddingTop: 16,
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
    paddingVertical: 16,
  },
  addtodo: {
    borderRadius: 4,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  todoMain: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  todoContainer: {
    flexDirection: "row",
    paddingVertical: 16,
    alignItems: "center",
    paddingLeft: 32,
  },
  todo: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.black,
  },
  deletButton: {
    flex: 1,
    color: colors.red,
    justifyContent: "center",
    alignItems: "center",
    width: 80,
  },
});
