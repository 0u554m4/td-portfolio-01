import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db, auth } from "../../firebase";
import { motion } from "framer-motion";
import { fadeIn } from "../../utils/motion";

const AdminDashboard = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMessages(msgs);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/admin/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-primary p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-white font-black text-[40px]"
          >
            Admin Dashboard
          </motion.h1>
          <button
            onClick={handleLogout}
            className="bg-tertiary py-2 px-6 rounded-xl text-white font-bold glassmorphism hover:bg-white/10 transition-colors"
          >
            Logout
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
             <div className="w-10 h-10 border-4 border-t-[#915eff] border-white/10 rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {messages.map((msg, index) => (
              <motion.div
                key={msg.id}
                variants={fadeIn("up", "spring", index * 0.1, 0.75)}
                initial="hidden"
                animate="show"
                className="bg-black-100 p-6 rounded-3xl glassmorphism border border-white/5 flex flex-col gap-4 group hover:border-[#915eff]/30 transition-all"
              >
                <div className="flex justify-between items-start">
                  <h3 className="text-white font-bold text-[18px]">{msg.name}</h3>
                  <p className="text-secondary text-[12px]">
                    {msg.createdAt?.toDate().toLocaleDateString() || "Pending..."}
                  </p>
                </div>
                
                <p className="text-[#915eff] text-[14px] font-medium break-all">{msg.email}</p>
                
                <div className="h-[2px] w-full bg-white/5 rounded-full" />
                
                <p className="text-secondary text-[14px] leading-relaxed">
                  {msg.message}
                </p>

                <div className="mt-auto pt-4 flex flex-wrap gap-2">
                  <span className="text-[10px] text-white/20 uppercase tracking-widest font-bold">
                    ID: {msg.id.slice(0, 8)}...
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {!loading && messages.length === 0 && (
          <div className="text-center py-20 bg-black-100 rounded-3xl glassmorphism">
            <p className="text-secondary text-[18px]">No messages received yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
