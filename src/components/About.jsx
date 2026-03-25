import React from "react";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";

import { services } from "../constants";
import SectionWrapper from "../hoc/SectionWrapper";
import { fadeIn, textVariant } from "../utils/motion";

const ServiceCard = ({ index, title, icon }) => (
  <motion.div
    variants={fadeIn("up", "spring", index * 0.1, 0.5)}
  >
    <Tilt
      tiltMaxAngleX={15}
      tiltMaxAngleY={15}
      scale={1.1}
      transitionSpeedMs={450}
      className='w-[160px] h-[160px] p-4 rounded-[24px] glassmorphism border border-white/10 flex flex-col items-center justify-center gap-3 transition-all duration-500 hover:shadow-[0_0_30_px_rgba(145,94,255,0.4)] premium-shine overflow-hidden group'
    >
      <div className='w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center relative transition-colors duration-300 group-hover:bg-[#915eff]/20'>
        <div className='absolute inset-0 rounded-xl blur-lg opacity-10 bg-[#915eff] group-hover:opacity-30' />
        <div className='text-[#915eff] group-hover:scale-110 transition-transform'>
          {React.cloneElement(icon, { className: "w-5 h-5" })}
        </div>
      </div>

      <h3 className='text-white text-[14px] font-semibold text-center leading-tight'>
        {title}
      </h3>
    </Tilt>
  </motion.div>
);

const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className='sm:text-[18px] text-[14px] text-secondary uppercase tracking-[0.3em] font-medium'>Introduction</p>
        <h2 className='text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px] mt-2'>
          Designing <span className='text-[#915eff]'>Experiences.</span>
        </h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className='mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]'
      >
        I am a full-stack developer with experience in web, mobile, and desktop applications.
        I specialize in creating high-performance, scalable, and modern software solutions.
        My work includes enterprise-level POS systems, wholesale marketplaces, and interactive
        applications for multiple platforms.
      </motion.p>

      <div className='mt-20 flex flex-wrap gap-10 justify-center'>
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
