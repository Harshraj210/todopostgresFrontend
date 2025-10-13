import { Outlet, Link } from 'react-router-dom';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 font-sans">
      <nav className="bg-white dark:bg-gray-800 shadow-md">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="text-2xl font-bold text-blue-500">
              TodoApp
            </Link>
            <div className="flex items-center space-x-4">
              <Link to="/login" className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400">Login</Link>
              <Link to="/signup" className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">Sign Up</Link>
            </div>
          </div>
        </div>
      </nav>
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
}

export default App;