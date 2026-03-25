import React, { useEffect } from 'react';
import { 
  X, 
  Mail, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  User, 
  Calendar,
  Undo2,
  ExternalLink,
  MessageCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MessageDetail = ({ 
  message, 
  isOpen, 
  onClose, 
  onToggleRead, 
  onToggleResolve, 
  onDelete 
}) => {
  // Handle escape key to close
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen || !message) return null;

  const isRead = message.status === 'read';
  const isResolved = message.processingStatus === 'resolved';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[1000] flex justify-end overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Panel */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="relative w-full max-w-2xl h-full bg-primary border-l border-white/10 shadow-2xl flex flex-col"
        >
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between glassmorphism-navbar sticky top-0 z-10">
            <div className="flex items-center gap-4">
              <button 
                onClick={onClose}
                className="p-2 rounded-xl hover:bg-white/5 text-secondary hover:text-white transition-all"
              >
                <X size={24} />
              </button>
              <div>
                <h2 className="text-white font-bold text-xl">Message Details</h2>
                <div className="flex gap-2 mt-1">
                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                    isResolved ? 'bg-green-500/10 text-green-500' : 'bg-amber-500/10 text-amber-500'
                  }`}>
                    {isResolved ? 'Resolved' : 'Pending'}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onToggleRead(message.id, message.status)}
                className="p-2.5 rounded-xl bg-white/5 text-secondary hover:text-white hover:bg-white/10 transition-all"
                title={isRead ? "Mark as unread" : "Mark as read"}
              >
                {isRead ? <Undo2 size={20} /> : <Mail size={20} />}
              </button>
              <button
                onClick={() => onToggleResolve(message.id, message.processingStatus)}
                className={`p-2.5 rounded-xl transition-all ${
                  isResolved ? 'bg-amber-500/10 text-amber-500 hover:bg-amber-500/20' : 'bg-green-500/10 text-green-500 hover:bg-green-500/20'
                }`}
                title={isResolved ? "Mark as pending" : "Mark as resolved"}
              >
                {isResolved ? <Clock size={20} /> : <CheckCircle2 size={20} />}
              </button>
              <div className="w-[1px] h-8 bg-white/10 mx-2" />
              <button
                onClick={() => {
                   if(window.confirm("Delete this message permanentely?")) {
                      onDelete(message.id);
                      onClose();
                   }
                }}
                className="p-2.5 rounded-xl bg-red-500/10 text-red-400 hover:text-red-500 hover:bg-red-500/20 transition-all font-bold"
                title="Delete Message"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-8 space-y-10">
            {/* Sender Info */}
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 rounded-3xl bg-[#915eff]/20 flex items-center justify-center text-[#915eff]">
                <User size={32} />
              </div>
              <div className="space-y-1">
                <h3 className="text-white text-3xl font-black">{message.name}</h3>
                <div className="flex items-center gap-2 text-secondary font-medium">
                  <Mail size={16} />
                  <a href={`mailto:${message.email}`} className="hover:text-[#915eff] transition-colors">
                    {message.email}
                  </a>
                  <ExternalLink size={14} className="opacity-50" />
                </div>
              </div>
            </div>

            {/* Metadata Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-1">
                <div className="flex items-center gap-2 text-secondary text-xs font-bold uppercase tracking-widest">
                  <Calendar size={12} />
                  Sent On
                </div>
                <p className="text-white font-semibold">
                  {message.createdAt?.toDate ? message.createdAt.toDate().toLocaleString(undefined, {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  }) : 'Recently'}
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-1">
                <div className="flex items-center gap-2 text-secondary text-xs font-bold uppercase tracking-widest">
                  <MessageCircle size={12} />
                  Status
                </div>
                <p className="text-white font-semibold capitalize">
                  {message.status} &middot; {message.processingStatus}
                </p>
              </div>
            </div>

            {/* Body */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-secondary text-xs font-bold uppercase tracking-widest">
                 Message
              </div>
              <div className="p-8 rounded-3xl glassmorphism border border-white/5 text-white leading-relaxed text-lg whitespace-pre-wrap min-h-[200px]">
                {message.message}
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-8 border-t border-white/10 glassmorphism-navbar text-center">
            <p className="text-secondary text-sm mb-6 font-medium">
              Want to reply to this inquiry?
            </p>
            <div className="flex gap-4 justify-center">
              <a 
                href={`mailto:${message.email}?subject=Re: Portfolio Inquiry&body=Hi ${message.name},%0D%0A%0D%0A`}
                className="bg-[#915eff] py-4 px-10 rounded-2xl text-white font-bold flex items-center justify-center gap-3 shadow-lg shadow-[#915eff]/20 hover:scale-[1.02] transition-transform flex-1 max-w-xs"
              >
                <Mail size={20} />
                Send Email Reply
              </a>
              <button 
                 onClick={onClose}
                 className="bg-white/5 py-4 px-10 rounded-2xl text-white font-bold border border-white/10 hover:bg-white/10 transition-all flex-1 max-w-xs"
              >
                Close View
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default MessageDetail;
