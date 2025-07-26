import { useEffect, useRef, useState } from "react";
import {
  FaReact,
  FaNodeJs,
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaAws,
} from "react-icons/fa";
import { SiNextdotjs, SiExpress, SiTailwindcss, SiMongodb } from "react-icons/si";

const defaultSkills = [
  {
    icon: <FaReact />,
    name: "React",
    color: "#61DBFB",
    description: "A JavaScript library for building fast, dynamic, and component-based user interfaces."
  },
  {
    icon: <FaNodeJs />,
    name: "Node.js",
    color: "#3C873A",
    description: "A runtime environment that lets you run JavaScript server-side, ideal for scalable backend services."
  },
  {
    icon: <FaHtml5 />,
    name: "HTML5",
    color: "#E44D26",
    description: "The standard markup language for structuring web content and applications."
  },
  {
    icon: <FaCss3Alt />,
    name: "CSS3",
    color: "#264de4",
    description: "A styling language used for designing and visually formatting HTML elements."
  },
  {
    icon: <FaJs />,
    name: "JavaScript",
    color: "#F7DF1E",
    description: "The core scripting language of the web, enabling interactive and dynamic behavior in websites."
  },
  {
    icon: <FaAws />,
    name: "AWS",
    color: "#FF9900",
    description: "Amazon Web Services offers cloud solutions for hosting, storage, compute, and more."
  },
  {
    icon: <SiNextdotjs />,
    name: "Next.js",
    color: "#1A202C",
    description: "A powerful React framework for server-side rendering, static sites, and fullstack applications."
  },
  {
    icon: <SiExpress />,
    name: "Express",
    color: "#4A5568",
    description: "A minimalist Node.js web application framework used to build robust APIs and web servers."
  },
  {
    icon: <SiTailwindcss />,
    name: "Tailwind CSS",
    color: "#38B2AC",
    description: "A utility-first CSS framework for rapidly building modern, responsive UIs."
  },
  {
    icon: <SiMongodb />,
    name: "MongoDB",
    color: "#47A248",
    description: "A NoSQL database known for its scalability and flexibility, storing data in JSON-like documents."
  },
];


const SkillsBox = ({ skills = defaultSkills }) => {
  const [activeSkill, setActiveSkill] = useState(null);
  const [origin, setOrigin] = useState({ top: 0, left: 0 });
  const [animateIn, setAnimateIn] = useState(false);
  const modalRef = useRef(null);

const handleTransition = (e,skill) => {
  const card = e.target.closest(".skill3d-item");
  if (!card) return;

  const container = document.querySelector(".skills-3d-container");
  if (container) container.style.animation = "none";

  const rect = e.target.getBoundingClientRect();
  setOrigin({
    top: rect.top + window.scrollY + rect.height / 2,
    left: rect.left + window.scrollX + rect.width / 2,
  });
const existingModals = document.querySelectorAll(".modal-skill");
existingModals.forEach((m, index) => {
  m.style.transform = `translate(-50%, -50%) rotateZ(${(index + 1) * 5}deg) scale(0.95)`;
  m.style.zIndex = `${10 - (index + 1)}`; // Push old modals behind
});
  const modal = document.createElement("div");
  
  modal.classList.add("modal-skill");
   modal.style.overflow="hidden"
  modal.style.position = "fixed";
  modal.style.left = `${rect.left}px`;
  modal.style.top = `${rect.top}px`;
  modal.style.width = `${rect.width}px`;
  modal.style.height = `${rect.height}px`;
  modal.style.background = skill.color;
  modal.style.border = `2px solid ${skill.color}`;
  modal.style.zIndex = "10";
  modal.style.borderRadius = "1rem";
  modal.style.transition = "all 0.4s ease";
  modal.style.display = "flex";
  modal.style.flexDirection = "column";
  modal.style.padding = "1rem";

  // Close Button
  const closeBtn = document.createElement("button");
  closeBtn.textContent = "✕";
  closeBtn.style.position = "absolute";
  closeBtn.style.top = "10px";
  closeBtn.style.right = "10px";
 
  closeBtn.style.border = "none";
  closeBtn.style.color = '#ffffff';
  closeBtn.style.borderRadius = "50%";
  closeBtn.style.width = "30px";
  closeBtn.style.height = "30px";
  closeBtn.style.cursor = "pointer";
  closeBtn.style.fontSize = "16px";
  closeBtn.classList.add("close-btn");
  closeBtn.onclick = () => {
  modal.style.transition = "all 0.4s ease";
  modal.style.left = `${rect.left}px`;
  modal.style.top = `${rect.top}px`;
  modal.style.transform = "translate(0, 0)";
  modal.style.width = `${rect.width}px`;
  modal.style.height = `${rect.height}px`;

  setTimeout(() => {
    modal.remove();

    // Restore previous modal to center
    const modals = document.querySelectorAll(".modal-skill");
    const last = modals[modals.length - 1];
    if (last) {
      last.style.transform = "translate(-50%, -50%) rotateZ(0deg) scale(1)";
      last.style.zIndex = "10";
    }
  }, 400);
};

  modal.appendChild(closeBtn);

  // Clone the skill icon
  const icon = card.querySelector("svg").cloneNode(true);
  icon.style.width = "50px";
  icon.style.height = "50px";

  const title = document.createElement("h2");
  title.textContent = skill.description || "Skill";
  title.style.color = "#fff";
  title.style.marginTop = "1rem";

  modal.appendChild(icon);
  modal.appendChild(title);
  document.body.appendChild(modal);

  // Animate to center
  setTimeout(() => {
  modal.style.left = "50%";
  modal.style.top = "50%";
  modal.style.transform = "translate(-50%, -50%) rotateZ(0deg)";
  modal.style.width = "300px";
  modal.style.height = "300px";
}, 50);
};



  useEffect(() => {
    if (activeSkill) {
      // Delay one frame to trigger transition
      requestAnimationFrame(() => setAnimateIn(true));
    }
  }, [activeSkill]);

 

  return (
    <div className="skills3d-rotate">
      {skills.map((skill, i) => {
        const angle = (i * 360) / skills.length;
        return (
          <div
            key={i}
            className="skill3d-item w-15 h-15 flex items-center justify-center rounded-xl bg-gray-900 border-2 cursor-pointer"
            style={{
              transform: `rotateY(${angle}deg) translateZ(150px)`,
              color: skill.color,
            }}
            onClick={(e) => handleTransition(e, skill)}
            title={skill.name}
          >
            <div>{skill.icon}</div>
          </div>
        );
      })}

   
    </div>
  );
};

export default SkillsBox;
