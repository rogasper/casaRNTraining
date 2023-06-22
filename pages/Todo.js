const { useState, useReducer } = require("react");
import { Text, View, TextInput, Button, StyleSheet } from "react-native";
import TodoItem from "../components/TodoItem";

const initialState = {
  todos: [],
  title: "",
};

const actions = {
  ADD_TODO: "add_todo",
  CHANGE_TITLE: "change_title",
  CHOOSE_TODO: "choose_todo",
  UPDATE_TODO: "update_todo",
  CHOOSE_TODO_FOR_DELETE: "choose_todo_for_delete",
  DELETE_TODO: "delete_todo",
};

const todoReducer = (state, action) => {
  switch (action.type) {
    case actions.ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    case actions.CHANGE_TITLE:
      return {
        ...state,
        title: action.payload,
      };
    case actions.CHOOSE_TODO:
      const { title } = action.payload;
      return {
        ...state,
        selectedTodo: action.payload,
        title,
      };
    case actions.UPDATE_TODO:
      const todo = state.todos.find(
        (todo) => todo.id === state.selectedTodo.id
      );
      todo.title = state.title;
      return {
        ...state,
        todos: [
          ...state.todos.filter((todo) => todo.id !== state.selectedTodo.id),
          todo,
        ],
        title: "",
        selectedTodo: null,
      };
    default:
      break;
  }
};
function Todo() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  const [state, dispatch] = useReducer(todoReducer, initialState);
  console.log(state);

  const addTodo = () => {
    if (!title) return;

    // const newTodos = todos.slice(0);
    // newTodos.push(title);

    // setTodos(newTodos);

    dispatch({ type: actions.ADD_TODO });
  };

  const updateTodo = () => {
    if (!state.title) return;
    dispatch({ type: actions.UPDATE_TODO });
  };

  const chooseTodoToUpdate = (todo) => {
    dispatch({ type: actions.CHOOSE_TODO, payload: todo });
  };

  const deleteTodo = (todo) => {};

  return (
    <View style={styles.wrapper}>
      <Text>Todo</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={state.title}
          onChangeText={(text) =>
            dispatch({ type: actions.CHANGE_TITLE, payload: text })
          }
        />
        <Button
          title="Submit"
          onPress={state.selectedTodo ? updateTodo : addTodo}
        ></Button>
      </View>
      <View style={styles.todoContainer}>
        {todos.map((todo, index) => (
          <TodoItem
            todo={todo}
            chooseTodo={chooseTodoToUpdate}
            chooseTodoForDelete={cho}
            key={index}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    margin: 40,
    marginTop: 80,
  },
  inputContainer: {
    paddingVertical: 8,
    paddingHorizontal: 6,
    flexDirection: "row",
    columnGap: 8,
  },
  input: {
    borderColor: "#000",
    width: 220,
    borderWidth: 1,
  },
  todoContainer: {
    paddingVertical: 8,
  },
});

export default Todo;
