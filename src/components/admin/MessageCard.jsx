import React from 'react';
import { 
  Mail, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  MoreVertical,
  Undo2
} from 'lucide-react';
import { motion } from 'framer-motion';

const MessageCard = ({ 
  message, 
  onToggleRead, 
  onToggleResolve, 
  onDelete,
  onClick
}) => {
  const isRead = message.status === 'read';
  const isResolved = message.processingStatus === 'resolved';

  return (
    <motion.div
      layout
      onClick={() => onClick(message)}
      className={`p-6 rounded-3xl glassmorphism border cursor-pointer transition-all duration-300 ${
        !isRead ? 'border-[#915eff]/40 bg-[#915eff]/5 shadow-lg shadow-[#915eff]/10 hover:border-[#915eff]/60' : 'border-white/5 opacity-80 hover:opacity-100 hover:border-white/20'
      } flex flex-col gap-4 group relative hover:scale-[1.02] active:scale-[0.98]`}
    >
      <div className="absolute top-4 right-4 flex gap-1 items-center">
        {!isRead && (
          <span className="flex h-2 w-2 rounded-full bg-[#915eff] animate-pulse" />
        )}
      </div>

      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${
            !isRead ? 'bg-[#915eff]/20 text-[#915eff]' : 'bg-white/5 text-secondary'
          }`}>
            <Mail size={24} />
          </div>
          <div>
            <h3 className={`font-bold text-lg ${!isRead ? 'text-white' : 'text-secondary'}`}>
              {message.name}
            </h3>
            <p className="text-secondary text-sm font-medium">{message.email}</p>
          </div>
        </div>
        
        <div className="text-right">
          <p className="text-secondary text-[10px] uppercase tracking-widest font-bold">
            {message.createdAt?.toDate ? message.createdAt.toDate().toLocaleDateString(undefined, {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            }) : 'Pending...'}
          </p>
        </div>
      </div>

      <div className="h-[1px] w-full bg-white/5" />

      <p className="text-secondary text-sm leading-relaxed line-clamp-3 group-hover:line-clamp-none transition-all duration-500">
        {message.message}
      </p>

      <div className="mt-auto pt-4 flex items-center justify-between border-t border-white/5">
        <div className="flex gap-2">
          <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 ${
            isResolved ? 'bg-green-500/10 text-green-500' : 'bg-amber-500/10 text-amber-500'
          }`}>
            {isResolved ? <CheckCircle2 size={12} /> : <Clock size={12} />}
            {isResolved ? 'Resolved' : 'Pending'}
          </span>
          {isRead && (
            <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-500/10 text-blue-500 border border-blue-500/20">
              Seen
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => { e.stopPropagation(); onToggleRead(message.id, message.status); }}
            title={isRead ? "Mark as unread" : "Mark as read"}
            className="p-2 rounded-lg bg-white/5 text-secondary hover:text-white hover:bg-white/10 transition-all"
          >
            {isRead ? <Undo2 size={18} /> : <Mail size={18} />}
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onToggleResolve(message.id, message.processingStatus); }}
            title={isResolved ? "Mark as pending" : "Mark as resolved"}
            className={`p-2 rounded-lg transition-all ${
              isResolved ? 'bg-amber-500/10 text-amber-500 hover:bg-amber-500/20' : 'bg-green-500/10 text-green-500 hover:bg-green-500/20'
            }`}
          >
            {isResolved ? <Clock size={18} /> : <CheckCircle2 size={18} />}
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onDelete(message.id); }}
            title="Delete"
            className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:text-red-500 hover:bg-red-500/20 transition-all ml-2"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default MessageCard;
