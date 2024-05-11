import React, { useRef } from "react";
import "./Styles.css";

interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e: React.FormEvent) => void;
}

const InputField = ({ todo, setTodo, handleAdd }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form
      action=""
      className="input"
      onSubmit={(e) => {
        handleAdd(e);
        inputRef.current?.blur;
      }}
    >
      <input
        ref={inputRef}
        id="todoInput"
        type="input"
        placeholder="Enter a task"
        className="inputbox"
        value={todo}
        onChange={(e) => {
          setTodo(e.target.value);
        }}
      />
      <button className="inputsubmit" type="submit">
        GO
      </button>
    </form>
  );
};

export default InputField;
