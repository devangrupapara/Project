// HowItWorksSection.js
import React from 'react';
import workImg from '../assets/imgback.png';

const HowItWorksSection = () => {
  return (
    <section className="w-full bg-white py-12">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-primary text-lg md:text-xl font-semibold tracking-wide uppercase">
          How It Works
        </h2>
        <h1 className="text-3xl md:text-4xl font-bold mt-2 text-gray-800">
          Flowing 3 Working Steps
        </h1>
        <div className="mt-10">
          <img
            src={workImg}
            alt="How it works illustration"
            className="w-full max-w-3xl mx-auto rounded-xl"
          />
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
