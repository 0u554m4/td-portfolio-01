import React from 'react';
import { 
  LayoutDashboard, 
  MessageSquare, 
  Settings, 
  LogOut, 
  ChevronRight,
  User
} from 'lucide-react';
import { motion } from 'framer-motion';

const AdminSidebar = ({ activeTab, setActiveTab, onLogout }) => {
  const menuItems = [
    { id: 'messages', label: 'Messages', icon: <MessageSquare size={20} /> },
    { id: 'analytics', label: 'Analytics', icon: <LayoutDashboard size={20} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={20} /> },
  ];

  return (
    <div className="w-64 h-screen fixed left-0 top-0 bg-black-100 border-r border-white/10 glassmorphism flex flex-col p-6 z-[100]">
      <div className="flex items-center gap-3 mb-12 px-2">
        <div className="w-10 h-10 rounded-xl bg-[#915eff] flex items-center justify-center shadow-[0_0_15px_rgba(145,94,255,0.4)]">
          <User className="text-white" size={20} />
        </div>
        <div>
          <h2 className="text-white font-bold text-lg leading-tight">Admin</h2>
          <p className="text-secondary text-xs uppercase tracking-widest font-semibold">Panel</p>
        </div>
      </div>

      <nav className="flex-1 flex flex-col gap-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex items-center justify-between w-full px-4 py-3 rounded-xl transition-all duration-300 group ${
              activeTab === item.id 
                ? 'bg-[#915eff] text-white shadow-lg shadow-[#915eff]/20' 
                : 'text-secondary hover:bg-white/5 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3 font-semibold text-sm">
              {item.icon}
              {item.label}
            </div>
            {activeTab === item.id && (
              <motion.div layoutId="sidebar-active" className="text-white">
                <ChevronRight size={16} />
              </motion.div>
            )}
          </button>
        ))}
      </nav>

      <button
        onClick={onLogout}
        className="mt-auto flex items-center gap-3 px-4 py-3 text-secondary hover:text-red-400 hover:bg-red-400/5 rounded-xl transition-all font-semibold text-sm group"
      >
        <LogOut size={20} className="group-hover:translate-x-1 transition-transform" />
        Logout
      </button>
    </div>
  );
};

export default AdminSidebar;
