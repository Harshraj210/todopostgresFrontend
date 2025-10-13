import { useState } from 'react';

function TodoItem({ todo, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.title);

  const handleSave = () => {
    if (editText.trim()) {
      onUpdate(todo.id, { title: editText });
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return (
      <div className="flex items-center gap-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
        <input
          type="text" value={editText} onChange={(e) => setEditText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSave()} autoFocus
          className="flex-grow text-lg bg-transparent text-gray-900 dark:text-white focus:outline-none"
        />
        <button onClick={handleSave} className="px-4 py-2 text-sm font-semibold text-white bg-green-500 rounded-md hover:bg-green-600">Save</button>
      </div>
    );
  }

  return (
    <div className={`flex items-center p-4 rounded-lg transition-colors duration-300 ${todo.completed ? 'bg-gray-100 dark:bg-gray-900' : 'bg-white dark:bg-gray-800'} hover:bg-gray-50 dark:hover:bg-gray-700`}>
      
      <span
        onClick={() => onUpdate(todo.id, { completed: !todo.completed })}
        className={`flex-grow text-lg cursor-pointer ${todo.completed ? 'line-through text-gray-500' : 'text-gray-900 dark:text-white'}`}
      >
        {todo.title}
      </span>
      <div className="flex items-center gap-2 ml-4">
        <button onClick={() => setIsEditing(true)} className="text-gray-400 hover:text-blue-500">✏️</button>
        <button onClick={() => onDelete(todo.id)} className="text-gray-400 hover:text-red-500">🗑️</button>
      </div>
    </div>
  );
}

export default TodoItem;