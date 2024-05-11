import React, { useEffect, useRef, useState } from "react";
import { Todo } from "../model";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { IoMdDoneAll } from "react-icons/io";
import { Draggable } from "react-beautiful-dnd";

type Props = {
  index: number;
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const SingleTodo = ({ todo, todos, setTodos, index }: Props) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleDone = () => {
    setTodos(
      todos.map((todoItem) =>
        todoItem.id === todo.id
          ? { ...todoItem, isDone: !todoItem.isDone }
          : todoItem
      )
    );
  };

  const handleDelete = () => {
    setTodos(todos.filter((todoItem) => todoItem.id !== todo.id));
  };

  const handleEdit = (e: React.FormEvent) => {
    e.preventDefault();
    setTodos(
      todos.map((todoItem) =>
        todoItem.id === todo.id ? { ...todoItem, todo: editTodo } : todoItem
      )
    );
    setEdit(false);
  };

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided) => (
        <form
          className="todossingle"
          onSubmit={handleEdit}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {edit ? (
            <input
              value={editTodo}
              onChange={(e) => setEditTodo(e.target.value)}
              className="todossingletext"
              ref={inputRef}
              onBlur={() => setEdit(false)} // Close edit mode on blur
            />
          ) : todo.isDone ? (
            <s className="todossingletext">{todo.todo}</s>
          ) : (
            <span className="todossingletext">{todo.todo}</span>
          )}
          <div>
            <span
              className="icon"
              onClick={() => setEdit(!edit)} // Toggle edit mode
            >
              <AiFillEdit />
            </span>
            <span className="icon" onClick={handleDelete}>
              <AiFillDelete /> {/* Add delete icon */}
            </span>
            <span className="icon" onClick={handleDone}>
              <IoMdDoneAll />
            </span>
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default SingleTodo;
