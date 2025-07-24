"use client";
import { motion, AnimatePresence } from "framer-motion";

export default function DesktopProjectButton({ isModalOpen, setIsModalOpen }) {
  return (
    <div className="hidden md:flex justify-start relative">
      <AnimatePresence>
        <motion.div
          initial={false}
          animate={{
            width: isModalOpen ? "85%" : "8.6rem",
            height: isModalOpen ? "80%" : "2.5rem",
            translateY: isModalOpen ? "-20rem" : "0rem",
          }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute top-[75%] left-20 z-[1000] 
            cursor-pointer bg-gradient-to-r from-[#EE6F57] to-violet-600 
            text-white px-5 py-2 rounded shadow-xl 
            transition-[background-position] duration-500 ease-in-out 
            bg-[length:200%_100%] bg-[position:0%_0%] 
            hover:bg-[position:100%_0%] 
            dark:from-indigo-500 dark:to-purple-500 
            dark:hover:from-purple-600 dark:hover:to-indigo-600 
            overflow-hidden"
        >
          <div className="relative">
            {/* Your content goes here */}
            <div
              onClick={(e) => {
                e.stopPropagation();
                setIsModalOpen((prev) => !prev);
              }}
              className="absolute bottom-2 left-1/2 transform -translate-x-1/2 transition-all duration-500 ease-in-out cursor-pointer"
            >
              {isModalOpen ? "Hide Projects" : "View Projects"}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
