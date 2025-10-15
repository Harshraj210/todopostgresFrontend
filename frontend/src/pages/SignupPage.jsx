import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delayChildren: 0.3, staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null); // Clear previous errors

    try {
      await axios.post(
        "https://todo-postgres-backend.vercel.app/api/v1/users/signup",
        {
          name,
          email,
          password,
        }
      );

      alert("Signup successful! Please proceed to login.");
      navigate("/login"); // Redirect to the login page on success
    } catch (err) {
      console.error("Signup failed:", err);
      setError("Signup failed. The email may already be in use.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gray-100 dark:bg-gray-900">
      <motion.div
        className="w-full p-6 bg-white md:max-w-md md:p-8 md:shadow-2xl md:rounded-2xl dark:bg-gray-800"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-3xl font-bold text-center text-gray-900 md:text-4xl dark:text-white"
          variants={itemVariants}
        >
          Create Your Account
        </motion.h1>

        <motion.form
          onSubmit={handleSubmit}
          className="mt-8 space-y-6"
          variants={itemVariants}
        >
          <div className="relative">
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="peer w-full p-4 text-lg bg-transparent border-b-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-transparent focus:outline-none focus:border-blue-500"
              placeholder="Name"
            />
            <label
              htmlFor="name"
              className="absolute left-0 -top-3.5 text-gray-600 dark:text-gray-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-5 peer-focus:-top-3.5 peer-focus:text-blue-500 peer-focus:text-sm"
            >
              Name
            </label>
          </div>
          <div className="relative">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="peer w-full p-4 text-lg bg-transparent border-b-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-transparent focus:outline-none focus:border-blue-500"
              placeholder="Email"
            />
            <label
              htmlFor="email"
              className="absolute left-0 -top-3.5 text-gray-600 dark:text-gray-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-5 peer-focus:-top-3.5 peer-focus:text-blue-500 peer-focus:text-sm"
            >
              Email
            </label>
          </div>
          <div className="relative">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="peer w-full p-4 text-lg bg-transparent border-b-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-transparent focus:outline-none focus:border-blue-500"
              placeholder="Password"
            />
            <label
              htmlFor="password"
              className="absolute left-0 -top-3.5 text-gray-600 dark:text-gray-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-5 peer-focus:-top-3.5 peer-focus:text-blue-500 peer-focus:text-sm"
            >
              Password
            </label>
          </div>
          <motion.button
            type="submit"
            className="w-full py-4 text-lg text-white font-semibold bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Create Account
          </motion.button>
        </motion.form>

        {error && <p className="mt-4 text-center text-red-500">{error}</p>}

        <motion.p
          className="mt-6 text-center text-gray-600 dark:text-gray-400"
          variants={itemVariants}
        >
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-blue-500 hover:underline"
          >
            Login
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
}

export default SignupPage;
