import React from "react";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import { motion } from "framer-motion";

import "react-vertical-timeline-component/style.min.css";

import { experiences } from "../constants";
import SectionWrapper from "../hoc/SectionWrapper";
import { textVariant } from "../utils/motion";

const ExperienceCard = ({ experience, index }) => {
  const side = index % 2 === 0 ? "left" : "right";
  
  return (
    <VerticalTimelineElement
      position={side}
      contentStyle={{
        background: "rgba(255, 255, 255, 0.02)",
        color: "#fff",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255, 255, 255, 0.05)",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
        borderRadius: "32px",
      }}
      contentArrowStyle={{ borderRight: "7px solid  #232631" }}
      date={experience.date}
      iconStyle={{ background: experience.iconBg }}
      icon={
        <div className='flex justify-center items-center w-full h-full'>
          <div className='w-[60%] h-[60%] object-contain text-white'>
             {experience.icon}
          </div>
        </div>
      }
    >
      <div>
        <h3 className='text-white text-[24px] font-bold'>{experience.title}</h3>
        <p
          className='text-secondary text-[16px] font-semibold'
          style={{ margin: 0 }}
        >
          {experience.company_name}
        </p>
      </div>

      <ul className='mt-5 list-disc ml-5 space-y-2'>
        {experience.points.map((point, index) => (
          <li
            key={`experience-point-${index}`}
            className='text-white-100 text-[14px] pl-1 tracking-wider'
          >
            {point}
          </li>
        ))}
      </ul>
    </VerticalTimelineElement>
  );
};

const Experience = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className='sm:text-[18px] text-[14px] text-secondary uppercase tracking-widest'>What I have done so far</p>
        <h2 className='text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]'>Work Experience.</h2>
      </motion.div>

      <div className='mt-20 flex flex-col'>
        <VerticalTimeline animate={true}>
          {experiences.map((experience, index) => (
            <motion.div
              key={`experience-${index}`}
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true, amount: 0.1 }}
            variants={{
                hidden: { 
                  opacity: 0, 
                  x: index % 2 === 0 ? -100 : 100 
                },
                visible: { 
                  opacity: 1, 
                  x: 0, 
                  transition: { 
                    type: "spring", 
                    duration: 1.25, 
                    delay: index * 0.4 
                  } 
                }
              }}
            >
              <ExperienceCard experience={experience} index={index} />
            </motion.div>
          ))}
        </VerticalTimeline>
      </div>
    </>
  );
};

export default SectionWrapper(Experience, "work");
