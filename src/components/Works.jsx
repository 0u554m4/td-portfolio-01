import React from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";

import { projects } from "../constants";
import SectionWrapper from "../hoc/SectionWrapper";
import { fadeIn, textVariant } from "../utils/motion";

const ProjectCard = ({
  index,
  name,
  description,
  tags,
  image,
  source_code_link,
  live_demo_link,
}) => {
  return (
    <motion.div variants={fadeIn(index % 2 === 0 ? "right" : "left", "spring", index * 0.5, 0.75)}>
      <Tilt
        tiltMaxAngleX={45}
        tiltMaxAngleY={45}
        scale={1.05}
        transitionSpeedMs={450}
        className='bg-tertiary p-5 rounded-3xl sm:w-[360px] w-full glassmorphism border border-white/5 hover:border-white/20 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(145,94,255,0.2)] premium-shine'
      >
        <div className='relative w-full h-[230px]'>
          <div className='w-full h-full object-cover rounded-2xl bg-black-200 overflow-hidden relative group'>
             {/* Premium dynamic gradient placeholder */}
             <div className={`absolute inset-0 bg-gradient-to-br ${
               index === 0 ? "from-indigo-600/30 to-purple-600/30" : 
               index === 1 ? "from-blue-600/30 to-teal-600/30" : 
               "from-pink-600/30 to-orange-600/30"
             } flex flex-col items-center justify-center border border-white/5`}>
                 <div className="w-16 h-16 rounded-full bg-white/5 blur-xl absolute" />
                 <span className="text-white font-black text-4xl opacity-10 select-none">Project</span>
                 <span className="text-white/40 font-bold uppercase tracking-widest text-[10px] z-10">
                    {name}
                 </span>
             </div>
          </div>

          <div className='absolute inset-0 flex justify-end m-3 card-img_hover gap-2'>
            <div
              onClick={() => window.open(source_code_link, "_blank")}
              className='black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer hover:scale-110 transition-transform'
            >
              <Github className="w-1/2 h-1/2 text-white" />
            </div>
            <div
              onClick={() => window.open(live_demo_link, "_blank")}
              className='black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer hover:scale-110 transition-transform'
            >
              <ExternalLink className="w-1/2 h-1/2 text-white" />
            </div>
          </div>
        </div>

        <div className='mt-5'>
          <h3 className='text-white font-bold text-[24px]'>{name}</h3>
          <p className='mt-2 text-secondary text-[14px]'>{description}</p>
        </div>

        <div className='mt-4 flex flex-wrap gap-2'>
          {tags.map((tag) => (
            <p
              key={`${name}-${tag.name}`}
              className={`text-[14px] ${tag.color}`}
            >
              #{tag.name}
            </p>
          ))}
        </div>
      </Tilt>
    </motion.div>
  );
};

const Works = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className='sm:text-[18px] text-[14px] text-secondary uppercase tracking-widest'>My work</p>
        <h2 className='text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]'>Projects.</h2>
      </motion.div>

      <div className='w-full flex'>
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className='mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]'
        >
          Following projects showcases my skills and experience through
          real-world examples of my work. Each project is briefly described with
          links to code repositories and live demos in it. It reflects my
          ability to solve complex problems, work with different technologies,
          and manage projects effectively.
        </motion.p>
      </div>

      <div className='mt-20 flex flex-wrap gap-7'>
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Works, "");
