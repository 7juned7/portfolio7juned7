"use client";

import React, { useEffect, useRef } from "react";

export default function BallGame({handleToggleModal}) {
    const buttonRef = useRef(null);
  const canvasRef = useRef(null);
  const ballRef = useRef({
    x: 100,
    y: 100,
    radius: 10,
    dx: 0,
    dy: 0,
    onGround: false,
    onButton: false,
  });

  const keysPressed = useRef({});

 const checkCollisionsWithElements = () => {
  const ball = ballRef.current;
  const canvas = canvasRef.current;
  const elements = document.querySelectorAll(".collidable");

  if (!canvas || !elements.length) return;

  const canvasRect = canvas.getBoundingClientRect();
  let landed = false;

  elements.forEach((el) => {
    const rect = el.getBoundingClientRect();

    const elTop = rect.top - canvasRect.top;
    const elBottom = rect.bottom - canvasRect.top;
    const elLeft = rect.left - canvasRect.left;
    const elRight = rect.right - canvasRect.left;

    const ballBottom = ball.y + ball.radius;
    const ballTop = ball.y - ball.radius;
    const ballLeft = ball.x - ball.radius;
    const ballRight = ball.x + ball.radius;

    const isOnTop =
      ballBottom >= elTop &&
      ballBottom <= elTop + ball.dy + 1 &&
      ballRight >= elLeft &&
      ballLeft <= elRight;

    if (isOnTop) {
      ball.dy = 0;
      ball.y = elTop - ball.radius;
      ball.onGround = true;
      ball.currentElement = el; // Save the element we're on
      landed = true;
    }
  });

  if (!landed) {
    ball.currentElement = null;
    ball.onGround = false;
  }
};




  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const gravity = 0.6;
    const friction = 0.9;
    const groundFriction = 0.8;
    const moveSpeed = 5;
    const jumpForce = -15;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const ball = ballRef.current;

      // Movement input
      if (keysPressed.current["ArrowLeft"]) {
        ball.dx = -moveSpeed;
      } else if (keysPressed.current["ArrowRight"]) {
        ball.dx = moveSpeed;
      } else {
        ball.dx *= ball.onGround ? groundFriction : friction;
        if (Math.abs(ball.dx) < 0.1) ball.dx = 0;
      }

      // Reset ground state and check collisions
      ball.onGround = false;
    checkCollisionsWithElements();

      // Gravity
      if (!ball.onGround) {
        ball.dy += gravity;
      }

      // Update position
      ball.x += ball.dx;
      ball.y += ball.dy;

      // Collision with canvas walls
      if (ball.x - ball.radius < 0) {
        ball.x = ball.radius;
        ball.dx = 0;
      } else if (ball.x + ball.radius > canvas.width) {
        ball.x = canvas.width - ball.radius;
        ball.dx = 0;
      }

      // Collision with floor
      if (ball.y + ball.radius >= canvas.height) {
        ball.y = canvas.height - ball.radius;
        ball.dy = 0;
        ball.onGround = true;
      }

      // Collision with ceiling
      if (ball.y - ball.radius <= 0) {
        ball.y = ball.radius;
        ball.dy = 0;
      }

      // Draw ball
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
      ctx.fillStyle = "red";
      ctx.fill();
      ctx.closePath();

      requestAnimationFrame(draw);
    };

    draw();

    const handleKeyDown = (e) => {
      if (!keysPressed.current[e.key]) {
        keysPressed.current[e.key] = true;

        // Jump once when ArrowUp is pressed
        if (e.key === "ArrowUp" && ballRef.current.onGround) {
          ballRef.current.dy = jumpForce;
          ballRef.current.onGround = false;
        }
      }
    };

    const handleKeyUp = (e) => {
      keysPressed.current[e.key] = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);
 useEffect(() => {
  const handleKeyDown = (e) => {
    const ball = ballRef.current;

    if (
      e.key === "Enter" &&
      ball?.currentElement?.classList.contains("collidable") &&
      ball?.currentElement?.textContent?.includes("Projects")
    ) {
      handleToggleModal(); // This must be passed from props!
    }
  };

  window.addEventListener("keydown", handleKeyDown);
  return () => window.removeEventListener("keydown", handleKeyDown);
}, [handleToggleModal]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-screen h-screen z-50 pointer-events-none"
    />
  );
}
