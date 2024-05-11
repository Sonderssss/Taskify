import React from "react";
import { Droppable } from "react-beautiful-dnd";
import SingleTodo from "./SingleTodo";
import { Todo } from "../model";

interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  completedTodos: Todo[];
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList: React.FC<Props> = ({
  todos,
  setTodos,
  completedTodos,
  setCompletedTodos,
}) => {
  return (
    <div className="container">
      <Droppable droppableId="todosList">
        {(provided, snapshot) => (
          <div
            className={
              "todos" + (snapshot.isDraggingOver ? " drag-active" : "")
            }
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todosheading">Active Tasks</span>
            {todos.map((todo, index) => (
              <SingleTodo
                index={index}
                todo={todo}
                key={todo.id}
                setTodos={setTodos}
                todos={todos} // Pass todos array as prop
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId="todosCompleted">
        {(provided, snapshot) => (
          <div
            className={
              "remove" + (snapshot.isDraggingOver ? " drag-active" : "")
            }
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todosheading">Completed Tasks</span>
            {completedTodos.map((todo, index) => (
              <SingleTodo
                index={index}
                todo={todo}
                key={todo.id}
                setTodos={setCompletedTodos}
                todos={completedTodos} // Pass completedTodos array as prop
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TodoList;
