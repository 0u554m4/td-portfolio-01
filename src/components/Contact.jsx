import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

import SectionWrapper from "../hoc/SectionWrapper";
import { slideIn } from "../utils/motion";

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

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
      alert("Thank you. I will get back to you as soon as possible.");

      setForm({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      setLoading(false);
      console.error(error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div
      className={`xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden`}
    >
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className='flex-1 p-8 rounded-3xl bg-white/5 glassmorphism border border-white/10 hover:bg-white/10 transition-all duration-500 hover:shadow-[0_0_30px_rgba(145,94,255,0.4)] premium-shine overflow-hidden'
      >
        <p className='sm:text-[18px] text-[14px] text-secondary uppercase tracking-widest'>Get in touch</p>
        <h3 className='text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]'>Contact.</h3>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className='mt-12 flex flex-col gap-8'
        >
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your Name</span>
            <input
              type='text'
              name='name'
              value={form.name}
              onChange={handleChange}
              placeholder="What's your good name?"
              className='bg-white/5 py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border border-white/10 font-medium glassmorphism focus:border-accent/50 transition-colors'
            />
          </label>
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your email</span>
            <input
              type='email'
              name='email'
              value={form.email}
              onChange={handleChange}
              placeholder="What's your web address?"
              className='bg-white/5 py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border border-white/10 font-medium glassmorphism focus:border-accent/50 transition-colors'
            />
          </label>
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your Message</span>
            <textarea
              rows={7}
              name='message'
              value={form.message}
              onChange={handleChange}
              placeholder='What you want to say?'
              className='bg-white/5 py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border border-white/10 font-medium glassmorphism focus:border-accent/50 transition-colors'
            />
          </label>

          <button
            type='submit'
            className='bg-accent/20 py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary border border-white/10 glassmorphism hover:bg-accent/30 hover:scale-105 transition-all'
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
      </motion.div>

    </div>
  );
};

export default SectionWrapper(Contact, "contact");
