import { motion } from "framer-motion";
import multipleCars from "../assets/multiplecars.png";
import Footer from "./Footer";

const About = () => {
  return (
    <>
      <div className="container mx-auto px-4 py-12 flex flex-col items-center">
           
        <motion.div 
          initial={{ opacity: 0, y: -50 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold text-[#38A4A6]">About</h1>
          <p className="text-lg text-gray-500 mt-2">Who We Are</p>
        </motion.div>

        {/* Content Section */}
        <div className="mt-10 flex flex-col md:flex-row items-center md:items-start gap-10 max-w-6xl">
          {/* Image Section */}
          <motion.div 
            initial={{ opacity: 0, x: -100 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-full md:w-1/2 flex justify-center"
          >
            <img src={multipleCars} alt="Car Image" className="w-full max-w-md rounded-lg " />
          </motion.div>

          {/* Text Content with Animation */}
          <motion.div 
            initial={{ opacity: 0, x: 100 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-full md:w-1/2 bg-[#38A4A6] text-white p-8 rounded-lg shadow-lg"
          >
            <p>
              Welcome to VelRiders - Your Premier Car and Bike Rental Hub! Since 2017, we've been
              revolutionizing travel with a tech-driven platform, offering 200+ vehicles in various
              cities. Based in Jamnagar, our team of 60+ professionals ensures a top-notch user
              experience.
            </p>

            <h3 className="text-xl font-semibold mt-4">About VelRiders:</h3>
            <p>
              Empowering Hosts and Guests: Join our community for seamless car and bike sharing. <br />
              Local Exploration Made Easy: Whether local or a visitor, VelRiders is your go-to for
              convenient and comfortable city exploration. <br />
              A Vehicle for Every Occasion: Choose from our diverse fleet for short city trips or
              scenic drives.
            </p>

            <h3 className="text-xl font-semibold mt-4">Renting Made Easy in 3 Steps:</h3>
            <ul className="list-disc list-inside ml-4">
              <li>📅 Choose your travel date and time.</li>
              <li>🚘 Select from our extensive range.</li>
              <li>✨ Book and ride away with VelRiders!</li>
            </ul>

            <h3 className="text-xl font-semibold mt-4">VelRiders:</h3>
            <p className="italic mt-2">Your Perfect Ride Awaits! 🌟 Book now for a memorable journey!</p>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
