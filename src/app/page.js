'use client';
import BallGame from "@/components/BallGame";
import HeroSection from "@/components/HeroSection";
import Projects from "@/components/Projects";
import { useState, useRef } from "react";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showCards, setShowCards] = useState(false);
  const buttonRef = useRef(null); // You can now use this ref for collision logic

  const handleToggleModal = () => {
    if (isModalOpen) {
      setShowCards(false);
      setTimeout(() => {
        setIsModalOpen(false);
      }, 400);
    } else {
      setIsModalOpen(true);
      setTimeout(() => {
        setShowCards(true);
      }, 50);
    }
  };

  return (
    <>
      {/* Always-visible toggle button */}
     <button
  ref={buttonRef}
  className="cursor-pointer absolute left-33 bottom-10 md:bottom-20 md:left-20 z-50 px-5 collidable py-2 bg-red-500 text-white"
  onClick={handleToggleModal}
>
  {isModalOpen ? "Hide Projects" : "View Projects"}
</button>

      {/* Hero section only visible when modal is not open */}
      {!isModalOpen && (
        <HeroSection
          handleToggleModal={handleToggleModal}
          isModalOpen={isModalOpen}
          showCards={showCards}
        />
      )}

      {/* Modal projects */}
      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full z-40 bg-white dark:bg-gray-900 overflow-hidden p-6">
          <Projects showCards={showCards} />
        </div>
      )}

      {/* BallGame uses ref and toggle logic */}
      <BallGame handleToggleModal={handleToggleModal} buttonRef={buttonRef} />
    </>
  );
}
