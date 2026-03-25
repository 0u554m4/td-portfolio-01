import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { collection, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db, auth } from "../../firebase";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, SlidersHorizontal, RefreshCw, MessageSquare, Menu, X } from "lucide-react";

import AdminSidebar from "./AdminSidebar";
import MessageCard from "./MessageCard";
import MessageDetail from "./MessageDetail";

const AdminDashboard = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("messages");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterProcess, setFilterProcess] = useState("all");
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map(doc => ({
        id: doc.id,
        status: doc.data().status || "unread",
        processingStatus: doc.data().processingStatus || "pending",
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

  const handleToggleRead = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === "read" ? "unread" : "read";
      await updateDoc(doc(db, "messages", id), { status: newStatus });
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const handleToggleResolve = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === "resolved" ? "pending" : "resolved";
      await updateDoc(doc(db, "messages", id), { processingStatus: newStatus });
    } catch (err) {
      console.error("Error updating processing status:", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      try {
        await deleteDoc(doc(db, "messages", id));
        if (selectedMessage?.id === id) setSelectedMessage(null);
      } catch (err) {
        console.error("Error deleting message:", err);
      }
    }
  };

  const handleOpenDetail = (message) => {
    setSelectedMessage(message);
    if (message.status === "unread") {
      handleToggleRead(message.id, "unread");
    }
  };

  const handleCloseDetail = () => {
    setSelectedMessage(null);
  };

  const filteredMessages = useMemo(() => {
    return messages.filter((msg) => {
      const matchesSearch = 
        msg.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        msg.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        msg.message?.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = filterStatus === "all" || msg.status === filterStatus;
      const matchesProcess = filterProcess === "all" || msg.processingStatus === filterProcess;

      return matchesSearch && matchesStatus && matchesProcess;
    });
  }, [messages, searchQuery, filterStatus, filterProcess]);

  const stats = useMemo(() => ({
    total: messages.length,
    unread: messages.filter(m => m.status === 'unread').length,
    pending: messages.filter(m => m.processingStatus === 'pending').length
  }), [messages]);

  return (
    <div className="min-h-screen bg-transparent flex overflow-hidden">
      <AdminSidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onLogout={handleLogout} 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <main className="flex-1 lg:ml-64 p-4 sm:p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          {/* Header & Stats */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 relative">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-3 bg-white/5 rounded-xl text-[#915eff] mb-2 shadow-lg glassmorphism border border-white/10"
            >
              <Menu size={24} />
            </button>
            
            <div>
              <h1 className="text-white font-black text-[32px] sm:text-[42px] leading-tight capitalize">
                {activeTab} Panel
              </h1>
              <p className="text-secondary font-medium text-base sm:text-lg mt-1">
                Welcome back, manager.
              </p>
            </div>

            <div className="flex gap-4">
              <div className="glassmorphism-navbar text-center py-3 px-6 rounded-2xl border border-white/5">
                <p className="text-secondary text-xs uppercase font-bold tracking-widest mb-1">Unread</p>
                <p className="text-[#915eff] text-2xl font-black">{stats.unread}</p>
              </div>
              <div className="glassmorphism-navbar text-center py-3 px-6 rounded-2xl border border-white/5">
                <p className="text-secondary text-xs uppercase font-bold tracking-widest mb-1">Pending</p>
                <p className="text-amber-500 text-2xl font-black">{stats.pending}</p>
              </div>
            </div>
          </div>

          {activeTab === 'messages' && (
            <div className="space-y-8">
              {/* Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-6 p-4 glassmorphism border border-white/10 rounded-2xl">
                <div className="relative flex-1 min-w-[300px]">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary" size={18} />
                  <input
                    type="text"
                    placeholder="Search by name, email or message..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white/5 py-3 pl-12 pr-4 text-white rounded-xl border border-white/10 outline-none focus:border-[#915eff] transition-all"
                  />
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-secondary text-sm font-bold">
                    <Filter size={16} />
                    <span>Status:</span>
                    <select 
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="bg-white/5 border border-white/10 rounded-lg px-2 py-1.5 outline-none focus:border-[#915eff]"
                    >
                      <option value="all">All</option>
                      <option value="unread">Unread</option>
                      <option value="read">Read</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-2 text-secondary text-sm font-bold border-l border-white/10 pl-4">
                    <SlidersHorizontal size={16} />
                    <span>Process:</span>
                    <select 
                      value={filterProcess}
                      onChange={(e) => setFilterProcess(e.target.value)}
                      className="bg-white/5 border border-white/10 rounded-lg px-2 py-1.5 outline-none focus:border-[#915eff]"
                    >
                      <option value="all">All</option>
                      <option value="pending">Pending</option>
                      <option value="resolved">Resolved</option>
                    </select>
                  </div>

                  <button 
                    onClick={() => {
                      setSearchQuery("");
                      setFilterStatus("all");
                      setFilterProcess("all");
                    }}
                    className="p-2 text-secondary hover:text-white transition-colors"
                    title="Reset Filters"
                  >
                    <RefreshCw size={18} />
                  </button>
                </div>
              </div>

              {/* Messages Grid */}
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="w-12 h-12 border-4 border-t-[#915eff] border-white/10 rounded-full animate-spin" />
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                  <AnimatePresence>
                    {filteredMessages.map((msg) => (
                      <MessageCard
                        key={msg.id}
                        message={msg}
                        onToggleRead={handleToggleRead}
                        onToggleResolve={handleToggleResolve}
                        onDelete={handleDelete}
                        onClick={handleOpenDetail}
                      />
                    ))}
                  </AnimatePresence>
                </div>
              )}

              {!loading && filteredMessages.length === 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-24 bg-black-100/50 rounded-3xl glassmorphism border border-dashed border-white/10"
                >
                  <MessageSquare size={48} className="mx-auto text-white/10 mb-4" />
                  <p className="text-secondary text-lg font-medium">
                    No messages match your current filters.
                  </p>
                </motion.div>
              )}
            </div>
          )}

          {activeTab !== 'messages' && (
            <div className="text-center py-32 glassmorphism border border-white/10 rounded-3xl">
              <h2 className="text-white text-2xl font-bold mb-4 capitalize">{activeTab}</h2>
              <p className="text-secondary">This module is coming soon...</p>
            </div>
          )}
        </div>
      </main>

      <MessageDetail
        message={selectedMessage}
        isOpen={!!selectedMessage}
        onClose={handleCloseDetail}
        onToggleRead={handleToggleRead}
        onToggleResolve={handleToggleResolve}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default AdminDashboard;

