import { useState, useEffect } from "react";

export const useParallax = () => {
  const [y, setY] = useState(0);
  const [rotate, setRotate] = useState(5);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      // Parallax movement (negative for upward movement)
      const newY = scrollY * -0.2;

      // Rotation based on scroll (starts at 5deg, reduces to 0deg)
      const rotationFactor = Math.min(scrollY / 500, 1);
      const newRotate = 5 - rotationFactor * 5;

      setY(newY);
      setRotate(newRotate);
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { y, rotate };
};
