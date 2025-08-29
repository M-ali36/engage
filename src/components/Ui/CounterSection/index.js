import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CounterSection = () => {
  const counterRef = useRef(null);
  
  useEffect(() => {
    const counterElement = counterRef.current;
    const targetNumber = 1000000; // Example target value (1M)
    const startNumber = 100000;  // Start from 100K

    // GSAP animation from 100K to 1M, increasing by 10K increments
    gsap.fromTo(
      counterElement,
      { innerText: startNumber },
      {
        innerText: targetNumber,
        duration: 5, // Duration of the animation
        snap: { innerText: 10000 }, // Snap to increments of 10K
        onUpdate: () => {
          // Update the element text as we animate the number
          counterElement.innerText = formatNumber(Math.floor(counterElement.innerText));
        },
      }
    );
  }, []);

  // Function to format the number with K or M suffix
  function formatNumber(number) {
    if (number >= 1000000) {
      return (number / 1000000).toFixed(1) + 'M'; // For millions
    } else if (number >= 1000) {
      return (number / 1000).toFixed(1) + 'K'; // For thousands
    }
    return number.toString(); // For numbers less than 1000
  }

  return (
    <section style={{ height: '200px', marginTop: '50px' }}>
      <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>
        <span ref={counterRef}>0</span>
      </div>
    </section>
  );
};

export default CounterSection;
