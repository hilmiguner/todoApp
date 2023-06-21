import React, { useState } from "react";
import { StyleSheet, Text, View, FlatList, Alert, TouchableWithoutFeedback, Keyboard } from "react-native";

import Header from "./components/header";
import TodoItem from "./components/todoItem";
import AddTodo from "./components/addTodo";
import Sandbox from "./components/sandbox";

export default function App(){
  const [todos, setTodos] = useState([
    { text: "buy coffee", key: "1"},
    { text: "create an app", key: "2"},
    { text: "play on the switch", key: "3"},
  ]);

  const submitHandler = (text: string) => {
    if(text.length > 3) {
      var newKey = (parseInt(todos[todos.length - 1].key) + 1).toString();
      setTodos((prevTodos) => {
        return [
          ...prevTodos,
          {text: text, key: newKey}
        ];
      });
    } else {
      Alert.alert("Oops", "Todos must be over 3 characters long.", [
        {text: "Understood", onPress: () => console.log("alert closed")}
      ]);
    }
  }

  const pressHandler = (key: string) => {
    setTodos((prevTodos) => (
      prevTodos.filter(todo => todo.key != key)
    ))
  }

  return (
    //<Sandbox/>
    <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
      <View style={styles.container}>
        {/* header */}
        <Header/>
        <View style={styles.content}>
          {/* to form */}
          <AddTodo submitHandler={submitHandler}/>
          <View style={styles.list}>
            <FlatList 
            data={todos}
            renderItem={({ item }) => (
              <TodoItem item={item} pressHandler={pressHandler}/>
            )}
            />
          </View>
        </View>
      </View>    
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    padding: 40,
    flex: 1,
  },
  list: {
    marginTop: 20,
    flex: 1,
  },
});