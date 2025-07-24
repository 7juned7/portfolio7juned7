'use client';
import { useEffect, useRef } from 'react';

const WalkAnimation = () => {
  const canvasRef = useRef(null);
  const spriteWidth = 6876 / 12; // adjust if needed
  const spriteHeight = 523 / 10; // adjust based on sprite sheet rows
  const frameCount = 8; // number of frames in walking animation
  const rowIndex = 6; // assuming row 6 is "walk" animation row
  const scale = 1.5;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const sprite = new Image();
    sprite.src = '/sprites/shadow_dog.png';

    let frame = 0;
    let gameFrame = 0;
    const staggerFrames = 5;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const positionX = frame * spriteWidth;
      const positionY = rowIndex * spriteHeight;
      ctx.drawImage(
        sprite,
        positionX,
        positionY,
        spriteWidth,
        spriteHeight,
        0,
        0,
        spriteWidth * scale,
        spriteHeight * scale
      );

      gameFrame++;
      if (gameFrame % staggerFrames === 0) {
        frame = (frame + 1) % frameCount;
      }
      requestAnimationFrame(animate);
    };

    sprite.onload = animate;
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={spriteWidth * scale}
      height={spriteHeight * scale}
    />
  );
};

export default WalkAnimation;
