import React, { useRef } from "react";
import useScrollAnimation from "../hooks/useScrollAnimation";
import "../styles/animations.css"; // Import styles for animations

const ScrollElementGroup = ({ children }) => {
  const elementRef = useRef(null);
  const isVisible = useScrollAnimation(elementRef);

  return (
    <div
      ref={elementRef}
      className={`animate-on-scroll ${isVisible ? "visible" : "hidden"}`}
    >
      {children}
    </div>
  );
};

export default ScrollElementGroup;