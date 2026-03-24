import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { motion } from "framer-motion";
import { fadeIn } from "../../utils/motion";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/admin/dashboard");
    } catch (err) {
      console.error(err);
      setError("Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-primary p-6">
      <motion.div
        variants={fadeIn("up", "spring", 0.5, 0.75)}
        initial="hidden"
        whileInView="show"
        className="w-full max-w-md bg-black-100 p-8 rounded-3xl glassmorphism border border-white/10"
      >
        <h2 className="text-white font-black text-[30px] mb-6 text-center">Admin Login</h2>
        
        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          <label className="flex flex-col">
            <span className="text-white font-medium mb-2">Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Admin Email"
              className="bg-tertiary py-3 px-6 placeholder:text-secondary text-white rounded-xl outline-none border-none font-medium glassmorphism"
              required
            />
          </label>

          <label className="flex flex-col">
            <span className="text-white font-medium mb-2">Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="bg-tertiary py-3 px-6 placeholder:text-secondary text-white rounded-xl outline-none border-none font-medium glassmorphism"
              required
            />
          </label>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="bg-[#915eff] py-3 px-8 rounded-xl outline-none w-full text-white font-bold shadow-md shadow-primary hover:scale-[1.02] transition-transform disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
