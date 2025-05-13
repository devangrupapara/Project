import React, { useEffect, useState } from 'react';
import kiran from '../assets/profile1.png';
import zala from '../assets/profile2.png';
import rahul from '../assets/profile3.png';
import meet from '../assets/profile4.png';

const TestimonialSlider = () => {
  const testimonials = [
    {
      name: 'Kiranraj Jain',
      image: kiran,
      review: 'Very good car condition... And good people in service.. Thank u ...velcars',
      rating: 5,
    },
    {
      name: 'Zala Hardev',
      image: zala,
      review: 'Good price and Good Condition car and super services',
      rating: 5,
    },
    {
      name: 'Rahul Soni',
      image: rahul,
      review: 'Very good service Good staff I enjoyed the drive vehicle',
      rating: 5,
    },
    {
      name: 'Meet Raval',
      image: meet,
      review: 'Good Service provided by the business. Process is hassle free during pick as well as Drop. Good experience 😊',
      rating: 5,
    },
    // Note: You have multiple duplicate "Meet Raval" entries. Consider replacing them with unique testimonials for variety.
    {
      name: 'Meet Raval',
      image: zala,
      review: 'Good Service provided by the business. Process is hassle free during pick as well as Drop. Good experience 😊',
      rating: 5,
    },
    {
      name: 'Meet Raval',
      image: meet,
      review: 'Good Service provided by the business. Process is hassle free during pick as well as Drop. Good experience 😊',
      rating: 5,
    },
    {
      name: 'Meet Raval',
      image: zala,
      review: 'Good Service provided by the business. Process is hassle free during pick as well as Drop. Good experience 😊',
      rating: 5,
    },
    {
      name: 'Meet Raval',
      image: meet,
      review: 'Good Service provided by the business. Process is hassle free during pick as well as Drop. Good experience 😊',
      rating: 5,
    },
    {
      name: 'Meet Raval',
      image: zala,
      review: 'Good Service provided by the business. Process is hassle free during pick as well as Drop. Good experience 😊',
      rating: 5,
    },
    {
      name: 'Meet Raval',
      image: zala,
      review: 'Good Service provided by the business. Process is hassle free during pick as well as Drop. Good experience 😊',
      rating: 5,
    },
    {
      name: 'Meet Raval',
      image: meet,
      review: 'Good Service provided by the business. Process is hassle free during pick as well as Drop. Good experience 😊',
      rating: 5,
    },
    {
      name: 'Meet Raval',
      image: rahul,
      review: 'Good Service provided by the business. Process is hassle free during pick as well as Drop. Good experience 😊',
      rating: 5,
    },
    {
      name: 'Meet Raval',
      image: meet,
      review: 'Good Service provided by the business. Process is hassle free during pick as well as Drop. Good experience 😊',
      rating: 5,
    },
    {
      name: 'Meet Raval',
      image: rahul,
      review: 'Good Service provided by the business. Process is hassle free during pick as well as Drop. Good experience 😊',
      rating: 5,
    },
    {
      name: 'Meet Raval',
      image: meet,
      review: 'Good Service provided by the business. Process is hassle free during pick as well as Drop. Good experience 😊',
      rating: 5,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const testimonialsPerPage = 3;
  const autoSlideInterval = 1000;

  // Calculate total number of pages for dot indicators
  const totalPages = Math.ceil(testimonials.length / testimonialsPerPage);

  // Move to the next set of testimonials
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + testimonialsPerPage;
      return nextIndex >= testimonials.length ? 0 : nextIndex;
    });
    setIsPaused(true); // Pause auto-sliding on manual interaction
  };

  // Move to the previous set of testimonials
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => {
      const prevIndexStart = prevIndex - testimonialsPerPage;
      return prevIndexStart < 0 ? Math.max(0, testimonials.length - testimonialsPerPage) : prevIndexStart;
    });
    setIsPaused(true); // Pause auto-sliding on manual interaction
  };

  // Go to a specific page when a dot is clicked
  const goToPage = (page) => {
    setCurrentIndex(page * testimonialsPerPage);
    setIsPaused(true); // Pause auto-sliding on manual interaction
  };

  // Auto-slide effect
  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          const nextIndex = prevIndex + testimonialsPerPage;
          return nextIndex >= testimonials.length ? 0 : nextIndex;
        });
      }, autoSlideInterval);
      return () => clearInterval(interval); // Cleanup interval on unmount or pause
    }
  }, [isPaused, testimonials.length]);

  return (
    <div className="container mx-auto py-12">
      <h2 className="text-center text-3xl md:text-4xl font-bold text-[#38A4A6]">
        See The Testimonials And Opinions.
        <br />
        Shared By Our Valued Users.
      </h2>
      <div
        className="relative mt-8"
        onMouseEnter={() => setIsPaused(true)} // Pause on hover
        onMouseLeave={() => setIsPaused(false)} // Resume on hover exit
      >
        <div className="flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
            {testimonials.slice(currentIndex, currentIndex + testimonialsPerPage).map((testimonial, index) => (
              <div
                key={index}
                className="bg-gray-100 rounded-lg shadow-md p-6 text-center"
              >
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full mx-auto mb-4"
                />
                <div className="flex justify-center mb-2">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.15c.969 0 1.371 1.24.588 1.81l-3.357 2.44a1 1 0 00-.364 1.118l1.287 3.97c.3.921-.755 1.688-1.54 1.118l-3.357-2.44a1 1 0 00-1.175 0l-3.357 2.44c-.784.57-1.838-.197-1.54-1.118l1.287-3.97a1 1 0 00-.364-1.118L2.314 9.397c-.783-.57-.38-1.81.588-1.81h4.15a1 1 0 00.95-.69l1.286-3.97z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 mb-4">{testimonial.review}</p>
                <h3 className="text-lg font-semibold">{testimonial.name}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* Previous Button */}
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 transform -translate-y-1/2  hover:bg-gray-400 rounded-full  p-2 ml-14"
        >
          <svg
            className="w-6 h-6 text-gray-800"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {/* Next Button */}
        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 transform -translate-y-1/2  hover:bg-gray-400 rounded-full  p-2 mr-14"
        >
          <svg
            className="w-6 h-6 text-gray-800"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        {/* Dot Indicators */}
        <div className="flex justify-center mt-4">
          {Array.from({ length: totalPages }).map((_, page) => (
            <button
              key={page}
              className={`w-3 h-3 rounded-full mx-1 ${
                Math.floor(currentIndex / testimonialsPerPage) === page ? 'bg-teal-500' : 'bg-gray-300'
              }`}
              onClick={() => goToPage(page)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialSlider;