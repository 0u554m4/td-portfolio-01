import { motion } from "framer-motion";
import { textVariant } from "../utils/motion";

const Hero = () => {
  return (
    <section className={`relative w-full h-screen mx-auto overflow-hidden`}>
      <div
        className={`absolute inset-0 top-[120px] max-w-7xl mx-auto sm:px-16 px-6 flex flex-row items-start gap-5 z-10`}
      >
        <div className='flex flex-col justify-center items-center mt-5'>
          <div className='w-5 h-5 rounded-full bg-[#915eff]' />
          <div className='w-1 sm:h-80 h-40 violet-gradient' />
        </div>

        <div>
          <motion.h1 
            variants={textVariant(0.1)}
            className={`font-black text-white lg:text-[80px] sm:text-[60px] xs:text-[50px] text-[40px] lg:leading-[98px] mt-2`}
          >
            Hi, I'm <span className='text-[#915eff] drop-shadow-[0_0_15px_rgba(145,94,255,0.5)]'>Ouss Ama</span>
          </motion.h1>
          <motion.p 
            variants={textVariant(0.2)}
            className={`text-[#dfd9ff] font-medium lg:text-[30px] sm:text-[26px] xs:text-[20px] text-[16px] lg:leading-[40px] mt-2`}
          >
            Building modern, high-performance <br className='sm:block hidden' />
            applications for web, mobile, and desktop
          </motion.p>
          
          <motion.div 
            variants={textVariant(0.3)}
            className="mt-10 flex gap-5"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='bg-[#915eff] py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary'
              onClick={() => window.location.href = '#work'}
            >
              View Projects
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='border border-[#915eff] py-3 px-8 rounded-xl outline-none w-fit text-white font-bold'
              onClick={() => window.location.href = '#contact'}
            >
              Contact Me
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Premium 2D Visual Element - Animated Gradient Orbs */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
           animate={{
             scale: [1, 1.2, 1],
             rotate: [0, 90, 0],
             opacity: [0.3, 0.5, 0.3]
           }}
           transition={{
             duration: 10,
             repeat: Infinity,
             ease: "linear"
           }}
           className="w-[500px] h-[500px] bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full blur-[120px]"
        />
        <motion.div
           animate={{
             scale: [1.2, 1, 1.2],
             rotate: [0, -90, 0],
             opacity: [0.2, 0.4, 0.2]
           }}
           transition={{
             duration: 12,
             repeat: Infinity,
             ease: "linear"
           }}
           className="w-[400px] h-[400px] bg-gradient-to-r from-blue-500/10 to-teal-500/10 rounded-full blur-[100px] absolute ml-40 mt-20"
        />
      </div>


      <div className='absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center z-10'>
        <a href='#about'>
          <div className='w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2'>
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className='w-3 h-3 rounded-full bg-secondary mb-1'
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
