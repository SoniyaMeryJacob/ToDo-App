import { useState } from "react";
import localFont from "next/font/local";
import Todo from "@/components/Todo";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home() {
  // State to store todos
  const [todos, setTodos] = useState([
    { title: "wakeup", completed: false },
    { title: "go to school", completed: false },
  ]);

  // State to store the input value
  const [newTodo, setNewTodo] = useState("");

  // Function to handle adding a new todo
  const handleAddTodo = () => {
    if (newTodo.trim() === "") return; // Ignore empty input
    const newTodoItem = { title: newTodo, completed: false };
    setTodos([...todos, newTodoItem]); 
    setNewTodo(""); 
  };

  // Function to handle deleting a todo
  const handleDeleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index); // Remove the todo at the given index
    setTodos(updatedTodos);
  };

  // Function to handle editing a todo
  const handleEditTodo = (index) => {
    const newTitle = prompt("Edit your todo:", todos[index].title);
    if (newTitle) {
      const updatedTodos = todos.map((todo, i) =>
        i === index ? { ...todo, title: newTitle } : todo
      );
      setTodos(updatedTodos);
    }
  };

  // Function to handle marking a todo as complete
  const handleCompleteTodo = (index) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  return (
    <div>
      <h1 className="text-5xl text-center mt-12">Todo App</h1>
      {/* Add Todo Input */}
      <div className="flex justify-center gap-6 mt-12">
        <input
          className="rounded-lg px-10 py-1 border border-gray-300 text-black"
          type="text"
          value={newTodo} 
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter a todo"
        />
        <button
          className="border-2 border-white px-2 py-1 rounded-lg hover:bg-white hover:text-black"
          onClick={handleAddTodo} 
        >
          Add Todo
        </button>
      </div>
      {/* Todo List */}
      <div className="mt-6 justify-center">
        {todos.map((todo, index) => (
          <Todo
            each_todo={todo}
            key={index}
            onDelete={() => handleDeleteTodo(index)}
            onEdit={() => handleEditTodo(index)} 
            onComplete={() => handleCompleteTodo(index)} 
          />
        ))}
      </div>
    </div>
  );
}
