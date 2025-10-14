import { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import TodoItem from "./components/TodoItem";

// --- API Functions ---
const apiClient = axios.create({ baseURL: "https://todo-postgres-backend.vercel.app/api/v1" });
const getTodos = async () => {
  const response = await apiClient.get("/todos");
  return response.data;
};

const createTodo = async (todoData) => {
  const response = await apiClient.post("/todos", todoData);
  return response.data;
};

const updateTodo = async (id, updateData) => {
  const response = await apiClient.put(`/todos/:${id}`, updateData);
  return response.data;
};

const deleteTodo = async (id) => {
  const response = await apiClient.delete(`/todos/:${id}`);
  return response.data;
};

function HomePage() {
  const [todos, setTodos] = useState([]);
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInitialTodos = async () => {
      try {
        setError(null);
        setIsLoading(true);
        const fetchedTodos = await getTodos();
        setTodos(fetchedTodos);
      } catch (err) {
        setError("Could not fetch to-dos.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchInitialTodos();
  }, []);

  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (!newTodoTitle.trim()) return;
    try {
      const newTodo = await createTodo({ title: newTodoTitle });
      setTodos([...todos, newTodo]);
      setNewTodoTitle("");
    } catch (err) {
      console.error("Failed to create todo:", err);
    }
  };

  const handleUpdateTodo = async (id, updateData) => {
    try {
      const updatedTodo = await updateTodo(id, updateData);
      setTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo)));
    } catch (err) {
      console.error("Failed to update todo:", err);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await deleteTodo(id);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (err) {
      console.error("Failed to delete todo:", err);
    }
  };

  if (isLoading)
    return <div className="text-center p-10 text-white">Loading...</div>;
  if (error)
    return <div className="text-center p-10 text-red-500">{error}</div>;

  return (
    <motion.div
      className="w-full max-w-2xl mx-auto mt-10 p-6 md:p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-8">
        My To-Do List
      </h1>

      <form onSubmit={handleAddTodo} className="flex gap-4 mb-8">
        <input
          type="text"
          value={newTodoTitle}
          onChange={(e) => setNewTodoTitle(e.target.value)}
          placeholder="What needs to be done?"
          className="flex-grow p-4 text-lg bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <motion.button
          type="submit"
          className="py-4 px-6 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Add
        </motion.button>
      </form>

      <ul className="space-y-4">
        <AnimatePresence>
          {todos.map((todo) => (
            <motion.li
              key={todo.id}
              layout // This is the magic prop for smooth reordering
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -50, transition: { duration: 0.3 } }}
              className="p-1" // Add padding to parent to prevent child margin collapse
            >
              <TodoItem
                todo={todo}
                onUpdate={handleUpdateTodo}
                onDelete={handleDeleteTodo}
              />
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </motion.div>
  );
}
// You'll need to re-add the API functions here if you removed them
// const getTodos = async () ... etc.

export default HomePage;
