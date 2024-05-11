// App.js
import React, { useState } from "react";
import "./App.css";
import InputField from "./components/InputField";
import { Todo } from "./model";
import TodoList from "./components/TodoList";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

function App() {
  const [todo, setTodo] = useState<string>("");

  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo) {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          todo: todo,
          isDone: false,
        },
      ]);
      setTodo("");
    }
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    // If there's no destination, or the destination is the same as the source, do nothing
    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      return;
    }

    // Retrieve the source and destination lists
    const sourceList =
      source.droppableId === "todosList"
        ? todos.slice()
        : completedTodos.slice();
    const destList =
      destination.droppableId === "todosList"
        ? todos.slice()
        : completedTodos.slice();

    // Extract the dragged item
    const [draggedItem] = sourceList.splice(source.index, 1);

    // Insert the dragged item into the destination list
    destList.splice(destination.index, 0, draggedItem);

    // Update state for both source and destination lists
    setTodos(source.droppableId === "todosList" ? destList : sourceList);
    setCompletedTodos(
      destination.droppableId === "todosList" ? destList : sourceList
    );
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className="heading">Taskify</span>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        <TodoList
          todos={todos}
          setTodos={setTodos}
          completedTodos={completedTodos}
          setCompletedTodos={setCompletedTodos}
        />
      </div>
    </DragDropContext>
  );
}

export default App;
