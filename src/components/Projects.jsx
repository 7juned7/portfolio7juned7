"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ExternalLink } from "lucide-react";

const cards = [
 {
  id: 1,
  title: "E-commerce Website",
  image: "https://res.cloudinary.com/ddy8vp8zy/image/upload/v1753362134/WhatsApp_Image_2025-07-24_at_6.01.46_AM_u3svct.jpg",
  tech: "Next.js, Tailwind CSS",
description: "Freelance e-commerce project featuring secure payment integration, email service, and webhooks. Developed a secure backend and hosted the application on AWS.",

  link: "https://www.daminiharts.com/",
},
  {
    id: 2,
    title: "Restrogram",
    image: "https://res.cloudinary.com/ddy8vp8zy/image/upload/v1753364015/WhatsApp_Image_2025-07-24_at_6.29.32_AM_jfdege.jpg",
    tech: "React, Redux, Node.js",
    description: "Full-stack digital platform where resturant can create the digital menu and scan qr to access menu.",
    link: "https://www.restrogram.in/ff",
  },
  {
    id: 3,
    title: "AassPass",
    image: "https://res.cloudinary.com/ddy8vp8zy/image/upload/v1753363815/WhatsApp_Image_2025-07-24_at_6.29.32_AM_jfdege.jpg",
    tech: "Socket.io, Express",
description: "SaaS platform enabling local businesses to register, appear on a map, and publish location-based ads. Utilized Mapbox API and implemented an RBAC system to manage user roles.",

    link: "https://www.aasspass.co.in/",
  },
 
];


const Projects = () => {
  const [activeCard, setActiveCard] = useState(null);

  const cardWidth = 180;
  const spreadAngle = 60;

  return (
    <div className="flex w-full h-full z-10 absolute top-0  left-0 justify-center items-center overflow-hidden">
      {cards.map((card, i) => {
      

        const middleIndex = (cards.length - 1) / 2;
        const offset = i - middleIndex;

        const rotate = offset * (spreadAngle / cards.length);
        const translateY = Math.abs(offset) * 10;
        const translateX = offset * cardWidth * .9;

        const isActive = activeCard === i;

        return (
          <motion.div
            key={card.id}
            onClick={() => setActiveCard(isActive ? null : i)}
            animate={{
              rotate: isActive ? 0 : rotate,
              scale: isActive ? 1.2 : 1,
              x: isActive ? 0 : translateX,
              y: isActive ? -80 : translateY,
              zIndex: isActive ? 999 : i,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="absolute w-64 h-72 bg-white rounded-md shadow-xl text-black font-medium flex flex-col overflow-hidden cursor-pointer"
           
          >
             <Image
              src={card.image}
              alt={card.title}
              width={600}
              height={600}
              className="w-full h-32 object-contain"
            />
            <div className="p-1 flex flex-col gap-4 flex-grow">
              <h3 className="text-sm flex gap-1">{card.title} 
                <a
  href={card.link}
  target="_blank"
  rel="noopener noreferrer"
  className="text-blue-500 underline inline-flex items-center gap-1"
>
  <ExternalLink className="w-3 h-3" />
</a>
              </h3>
              
              {/* <p className="text-xs text-gray-500">{card.tech}</p> */}
              <p className="text-xs text-gray-600">{card.description}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default Projects;
