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
          className="relative w-full lg:max-w-2xl h-full bg-primary/40 border-l border-white/5 glassmorphism shadow-2xl flex flex-col z-[1001]"
        >
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-white/5 flex items-center justify-between glassmorphism-navbar sticky top-0 z-10">
            <div className="flex items-center gap-3 sm:gap-4">
              <button 
                onClick={onClose}
                className="p-2 rounded-xl hover:bg-white/5 text-secondary hover:text-white transition-all"
              >
                <X size={20} />
              </button>
              <div>
                <h2 className="text-white font-bold text-lg sm:text-xl">Inquiry</h2>
                <div className="flex gap-2 mt-1">
                  <span className={`px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider ${
                    isResolved ? 'bg-green-500/20 text-green-400' : 'bg-amber-500/20 text-amber-400'
                  }`}>
                    {isResolved ? 'Resolved' : 'Pending'}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1 sm:gap-2">
              <button
                onClick={() => onToggleRead(message.id, message.status)}
                className="p-2 rounded-lg bg-white/5 text-secondary hover:text-white hover:bg-white/10 transition-all"
                title={isRead ? "Mark as unread" : "Mark as read"}
              >
                {isRead ? <Undo2 size={18} /> : <Mail size={18} />}
              </button>
              <button
                onClick={() => onToggleResolve(message.id, message.processingStatus)}
                className={`p-2 rounded-lg transition-all ${
                  isResolved ? 'bg-amber-500/10 text-amber-500 hover:bg-amber-500/20' : 'bg-green-500/10 text-green-500 hover:bg-green-500/20'
                }`}
                title={isResolved ? "Mark as pending" : "Mark as resolved"}
              >
                {isResolved ? <Clock size={18} /> : <CheckCircle2 size={18} />}
              </button>
              <div className="w-[1px] h-6 bg-white/5 mx-1" />
              <button
                onClick={() => {
                   if(window.confirm("Delete this message permanentely?")) {
                      onDelete(message.id);
                      onClose();
                   }
                }}
                className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:text-red-500 hover:bg-red-500/20 transition-all"
                title="Delete Message"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-6 sm:space-y-10">
            {/* Sender Info */}
            <div className="flex items-start gap-4 sm:gap-6">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl sm:rounded-3xl bg-[#915eff]/10 flex items-center justify-center text-[#915eff]">
                <User size={24} />
              </div>
              <div className="space-y-1 min-w-0 flex-1">
                <h3 className="text-white text-xl sm:text-3xl font-black truncate">{message.name}</h3>
                <div className="flex items-center gap-2 text-secondary font-medium text-sm sm:text-base truncate">
                  <Mail size={14} className="flex-shrink-0" />
                  <a href={`mailto:${message.email}`} className="hover:text-[#915eff] transition-colors truncate">
                    {message.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Metadata Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/5 border border-white/5 space-y-1">
                <div className="flex items-center gap-2 text-secondary text-[10px] font-bold uppercase tracking-widest">
                  <Calendar size={12} />
                  Sent On
                </div>
                <p className="text-white font-semibold text-xs sm:text-sm">
                  {message.createdAt?.toDate ? message.createdAt.toDate().toLocaleString(undefined, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  }) : 'Recently'}
                </p>
              </div>
              <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/5 border border-white/5 space-y-1">
                <div className="flex items-center gap-2 text-secondary text-[10px] font-bold uppercase tracking-widest">
                  <MessageCircle size={12} />
                  Status
                </div>
                <p className="text-white font-semibold capitalize text-xs sm:text-sm">
                  {message.status} &middot; {message.processingStatus}
                </p>
              </div>
            </div>

            {/* Body */}
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center gap-2 text-secondary text-[10px] font-bold uppercase tracking-widest">
                 Message
              </div>
              <div className="p-4 sm:p-8 rounded-2xl sm:rounded-3xl bg-white/5 border border-white/5 text-white leading-relaxed text-base sm:text-lg whitespace-pre-wrap min-h-[150px]">
                {message.message}
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-4 sm:p-8 border-t border-white/5 glassmorphism-navbar text-center">
            <p className="text-secondary text-xs sm:text-sm mb-4 sm:mb-6 font-medium">
              Want to reply to this inquiry?
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <a 
                href={`mailto:${message.email}?subject=Re: Portfolio Inquiry&body=Hi ${message.name},%0D%0A%0D%0A`}
                className="bg-[#915eff] py-3 sm:py-4 px-6 sm:px-10 rounded-xl sm:rounded-2xl text-white font-bold flex items-center justify-center gap-2 sm:gap-3 shadow-lg shadow-[#915eff]/20 hover:scale-[1.02] transition-transform w-full sm:max-w-xs"
              >
                <Mail size={18} />
                Send Email Reply
              </a>
              <button 
                 onClick={onClose}
                 className="bg-white/5 py-3 sm:py-4 px-6 sm:px-10 rounded-xl sm:rounded-2xl text-white font-bold border border-white/5 hover:bg-white/10 transition-all w-full sm:max-w-xs"
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
