import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Twitter, Instagram, Facebook, MessageCircle, Send } from "lucide-react";
import { FaTiktok } from "react-icons/fa6";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

import SectionWrapper from "../hoc/SectionWrapper";
import { slideIn } from "../utils/motion";
import { useLanguage } from "../utils/i18n";

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const { t } = useLanguage();

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addDoc(collection(db, "messages"), {
        name: form.name,
        email: form.email,
        message: form.message,
        createdAt: serverTimestamp(),
      });

      setLoading(false);
      alert(t('contact.success'));

      setForm({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      setLoading(false);
      console.error(error);
      alert(t('contact.error'));
    }
  };

  const socialLinks = [
    { name: 'linkedin', icon: <Linkedin size={28} />, url: 'https://www.linkedin.com/in/oussahmane/' },
    { name: 'github', icon: <Github size={28} />, url: 'https://github.com/oussahmane' },
    { name: 'twitter', icon: <Twitter size={28} />, url: 'https://x.com/oussahmane' },
    { name: 'instagram', icon: <Instagram size={28} />, url: 'https://www.instagram.com/oussahmane/' },
    { name: 'facebook', icon: <Facebook size={28} />, url: 'https://www.facebook.com/oussahmane' },
    { name: 'whatsapp', icon: <MessageCircle size={28} />, url: 'https://whatsapp.com' },
    { name: 'telegram', icon: <Send size={28} />, url: 'https://telegram.com' },
    { name: 'gmail', icon: <Mail size={28} />, url: 'mailto:oussahmane@gmail.com' },
    { name: 'tiktok', icon: <FaTiktok size={28} />, url: 'https://www.tiktok.com/@oussahmane' },
  ];

  return (
    <div className='xl:mt-12 flex flex-col gap-10 overflow-hidden'>
      <div className='flex xl:flex-row flex-col-reverse gap-10'>
        <motion.div
          variants={slideIn("left", "tween", 0.2, 1)}
          className='flex-1 p-8 rounded-3xl bg-transparent border border-white/10 hover:bg-white/5 transition-all duration-500 hover:shadow-[0_0_30px_rgba(145,94,255,0.2)] overflow-hidden'
        >
          <p className='sm:text-[18px] text-[14px] text-secondary uppercase tracking-widest'>{t('contact.subtitle')}</p>
          <h3 className='text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]'>{t('contact.title')}</h3>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className='mt-12 flex flex-col gap-8'
          >
            <label className='flex flex-col'>
              <span className='text-white font-medium mb-4'>{t('contact.nameLabel')}</span>
              <input
                type='text'
                name='name'
                value={form.name}
                onChange={handleChange}
                placeholder={t('contact.namePlaceholder')}
                className='bg-transparent py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border border-white/20 font-medium focus:border-accent/50 transition-colors'
              />
            </label>
            <label className='flex flex-col'>
              <span className='text-white font-medium mb-4'>{t('contact.emailLabel')}</span>
              <input
                type='email'
                name='email'
                value={form.email}
                onChange={handleChange}
                placeholder={t('contact.emailPlaceholder')}
                className='bg-transparent py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border border-white/20 font-medium focus:border-accent/50 transition-colors'
              />
            </label>
            <label className='flex flex-col'>
              <span className='text-white font-medium mb-4'>{t('contact.messageLabel')}</span>
              <textarea
                rows={7}
                name='message'
                value={form.message}
                onChange={handleChange}
                placeholder={t('contact.messagePlaceholder')}
                className='bg-transparent py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border border-white/20 font-medium focus:border-accent/50 transition-colors'
              />
            </label>

            <button
              type='submit'
              className='bg-transparent py-3 px-8 rounded-xl outline-none w-fit text-white font-bold border border-white/20 hover:bg-accent/20 hover:border-accent/50 hover:scale-105 transition-all'
            >
              {loading ? t('contact.sending') : t('contact.send')}
            </button>
          </form>
        </motion.div>
      </div>

      {/* Social Footer Section */}
      <motion.div
        variants={slideIn("up", "tween", 0.3, 1)}
        className='flex flex-col items-center gap-6 py-10'
      >
        <div className='w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent mb-4' />
        <div className='flex flex-wrap justify-center gap-4 sm:gap-6'>
          {socialLinks.map((link) => (
            <a 
              key={link.name}
              href={link.url} 
              target='_blank' 
              rel='noreferrer' 
              title={link.name}
              className='text-secondary hover:text-white hover:scale-125 transition-all cursor-pointer'
            >
              {link.icon}
            </a>
          ))}
        </div>
        <p className='text-secondary text-[21px] font-medium tracking-widest opacity-60 mt-2'>
          © {new Date().getFullYear()} oussahmane@gmail.com | All Rights Reserved
        </p>
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
