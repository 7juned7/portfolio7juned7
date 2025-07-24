"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import SkillsBox from "./SkillsBox";
import ProjectsBox from "./ProjectBox";
import { Sun, Moon } from "lucide-react"; // You can use any icon library
import Projects from "./Projects";

const headings = [
  {
    title: "Assalamu Alaikum wa Rahmatullah",
    sublines: [
      "Peace, mercy  and blessings of Allah be upon you.",
      "Let’s code with sincerity and purpose.",
    ],
  },
  {
    title: "I'm Juned",
    sublines: [
      "Building with intention, clarity and barakah.",
      "Code with ihsaan — excellence in every detail.",
    ],
  },
];

const wordAnimation = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1 },
  }),
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

const HeroSection = () => {
  const [headingIndex, setHeadingIndex] = useState(0);
  const [sublineIndex, setSublineIndex] = useState(0);
  const [isDark, setIsDark] = useState(true);

    const [isModalOpen, setIsModalOpen] = useState(false);

 
  // Handle theme toggle
  const toggleTheme = () => {
    const newTheme = isDark ? "light" : "dark";
    setIsDark(!isDark);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  // On mount, read theme
  useEffect(() => {
    const storedTheme = localStorage.theme;
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (storedTheme === "dark" || (!storedTheme && systemPrefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

 

  useEffect(() => {
    const sublineInterval = setInterval(() => {
      setSublineIndex(
        (prev) => (prev + 1) % headings[headingIndex].sublines.length
      );
    }, 4000);

    return () => clearInterval(sublineInterval);
  }, [headingIndex]);

  useEffect(() => {
    const headingInterval = setInterval(() => {
      setHeadingIndex((prev) => (prev + 1) % headings.length);
      setSublineIndex(0);
    }, 9000);

    return () => clearInterval(headingInterval);
  }, []);

  const renderWords = (text) =>
    text.split(" ").map((word, i) => (
      <motion.span
        key={`${word}-${i}`}
        custom={i}
        variants={wordAnimation}
        initial="hidden"
        animate="visible"
        exit="exit"
    className="inline-block font-karla mr-1 text-[#CB3737] dark:text-cyan-300 transition-colors duration-500"
      >
        {word}
      </motion.span>
    ));

  return (
    <section className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#FAFAFA] via-white  to-gray-[#E3E3E3] dark:from-gray-950 dark:via-gray-900 dark:to-black text-gray-900 dark:text-white transition-colors duration-500">
      <div className="absolute top-6 right-6 z-50">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full cursor-pointer border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          aria-label="Toggle Theme"
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>

      <div className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-between gap-10 px-4">
        {/* Left */}
        <div className="flex-1 flex flex-col justify-center items-center md:items-start gap-6">
          <div className="flex flex-col gap-2 text-center md:text-left">
            <motion.div
              className="w-full flex flex-col"
              initial={{ x: -100, opacity: 0, rotate: -5 }}
              animate={{ x: 0, opacity: 1, rotate: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="flex flex-col gap-4 min-h-[200px] lg:min-h-[240px]">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 dark:from-cyan-300 dark:to-purple-400">
                  <motion.span key={headings[headingIndex].title}>
                    {renderWords(headings[headingIndex].title)}
                  </motion.span>
                </h2>

                <div className="text-lg md:text-xl text-gray-600 dark:text-gray-300">
                  <motion.span
                    key={headings[headingIndex].sublines[sublineIndex]}
                  >
                    {renderWords(
                      headings[headingIndex].sublines[sublineIndex]
                    )}
                  </motion.span>
                </div>
              </div>
            </motion.div>
          </div>

          <p className="text-gray-600 dark:text-gray-400 text-center md:text-left max-w-md">
            Passionate about clean code and meaningful digital experiences.
            Let’s build with intention and barakah.
          </p>

         <div className="flex gap-4">
  {/* Projects Button */}
  
{/* Projects Component Floating Over Content */}
{isModalOpen && (
  <div className="fixed top-0 left-0 w-full h-full z-30 bg-white dark:bg-gray-900 overflow-y-auto p-6">
    <Projects />
  </div>
)}

{/* Toggle Button Always Accessible */}
<button
  className="cursor-pointer z-50 px-5 py-2 bg-red-500 text-white "
  onClick={() => setIsModalOpen((prev) => !prev)}
>
  {isModalOpen ? "Hide Projects" : "View Projects"}
</button>


 
</div>
        </div>

        {/* Right */}
        <div className="flex-1 flex h-100 flex-col justify-center items-center">
          <SkillsBox />
        </div>
      </div>

    
    </section>
  );
};

export default HeroSection;
