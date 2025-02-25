import React from "react";
import Counter from "./Counter";
import "../styles/Counter.css";

const CounterGridGroup = () => {
  return (
    <div className="counter-grid">
      <div className="counter-item">
        <Counter end={10} duration={1000} />
        <p>Years In Industry</p>
      </div>
      <div className="counter-item">
        <Counter end={500} duration={2000} />
        <p>Projects Completed</p>
      </div>
      <div className="counter-item">
        <Counter end={50} duration={1500} />
        <p>Expert Team</p>
      </div>
      <div className="counter-item">
        <Counter end={1000} duration={2500} />
        <p>Happy Customers</p>
      </div>
    </div>
  );
};

export default CounterGridGroup;