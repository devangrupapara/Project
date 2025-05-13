import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Mail, MapPin, Phone, Facebook, Instagram, Twitter, Linkedin
} from 'lucide-react';

import upperLeftImg from '../assets/footerupperleftimg.png';
import emailIcon from '../assets/upperrightmailimg.png';
import footerLogo from '../assets/footerleftlogo.png';
import googlePlayIcon from '../assets/googleplay.png';
import appStoreIcon from '../assets/appstore.png';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
};

const Footer = () => {
  const navigate = useNavigate();

  return (
    <motion.div initial="hidden" animate="visible" className="w-full h-auto">
      {/* Upper Section */}
      <motion.div variants={fadeIn} className="bg-gradient-to-b from-white to-[#38A4A6] flex justify-center">
        <div className="w-[90%] flex items-center justify-between p-4 md:p-10 bg-[#F2F2F2] rounded-2xl flex-col md:flex-row gap-6">
          <motion.img src={upperLeftImg} alt="Upper Left Logo" className="w-full max-w-[350px]" />

          <div className="flex flex-col items-center justify-center gap-4 w-full md:w-[95%] text-center">
            <h4 className="text-[#38A4A6] text-lg">Do you want to stay updated on</h4>
            <h1 className="text-[#38A4A6] text-2xl md:text-3xl font-bold">exclusive email offers?</h1>
            <div className="flex items-center gap-2 p-2 bg-white rounded-full w-full max-w-md shadow-md">
              <img src={emailIcon} alt="Email Icon" className="w-5 h-5 ml-4" />
              <input type="text" placeholder="Enter your email" className="flex-1 border-none outline-none text-black w-20" />
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                className="px-3 py-1 bg-[#38A4A6] text-white rounded-full hover:bg-opacity-90">
                Subscribe
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Footer */}
      <motion.div variants={fadeIn} className="bg-[#38A4A6] flex justify-center pt-10 pb-8">
        <div className="w-[85%] flex flex-col gap-8">
          <div className="flex flex-col md:flex-row flex-wrap justify-between gap-8 text-white capitalize">
            {/* Logo & About */}
            <motion.div variants={fadeIn} className="w-full md:w-[33%]">
              <img src={footerLogo} alt="Footer Logo" className="mb-4 max-w-[150px]" />
              <p>Rent your dream ride with Vel Riders – Cars and bikes for every adventure.</p>
            </motion.div>

            {/* Navigation */}
            <motion.div variants={fadeIn} className="w-full md:w-[23%] flex flex-col gap-6">
              <h2 className="text-xl font-bold">Helpful Links</h2>
              <div className="flex flex-col gap-2">
                <button onClick={() => navigate('/')} className="text-left hover:underline">Home</button>
                <button onClick={() => navigate('/about')} className="text-left hover:underline">About</button>
                <button onClick={() => navigate('/contact')} className="text-left hover:underline">Contact</button>
                <button onClick={() => navigate('/privacy-policy')} className="text-left hover:underline">Privacy and Condition</button>
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div variants={fadeIn} className="w-full md:w-[33%]">
              <h2 className="text-xl font-bold mb-4">Get in Touch</h2>
              <div className="flex flex-col gap-5">
                <a
                  href="https://www.google.com/maps?q=SHOP+NO.232,+Someshwar+Complex,+BRTS+STOP,+Satellite+Rd,+Ahmedabad,+Gujarat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex gap-3 items-start"
                >
                  <MapPin className="w-5 h-5 mt-1" />
                  <p className="text-sm">SHOP NO.232, Someshwar Complex, BRTS STOP, Satellite Rd, Ahmedabad, Gujarat 380015</p>
                </a>
                <a href="mailto:info@velriders.com" className="flex gap-3 items-center">
                  <Mail className="w-5 h-5" />
                  <p>info@velriders.com</p>
                </a>
                <a href="tel:08238224282" className="flex gap-3 items-center">
                  <Phone className="w-5 h-5" />
                  <p>082382 24282</p>
                </a>
              </div>
            </motion.div>
          </div>

          {/* Bottom Footer */}
          <motion.div variants={fadeIn} className="border-t border-white pt-4 flex flex-col md:flex-row justify-between items-center gap-4 text-white capitalize">
            <div className="flex gap-4">
              <motion.a href="https://www.facebook.com/shaileshcarbike" target="_blank" whileHover={{ scale: 1.1 }}>
                <Facebook className="w-6 h-6" />
              </motion.a>
              <motion.a href="#" whileHover={{ scale: 1.1 }}>
                <Twitter className="w-6 h-6" />
              </motion.a>
              <motion.a href="#" whileHover={{ scale: 1.1 }}>
                <Linkedin className="w-6 h-6" />
              </motion.a>
              <motion.a href="https://www.instagram.com/velriders/" target="_blank" whileHover={{ scale: 1.1 }}>
                <Instagram className="w-6 h-6" />
              </motion.a>
            </div>

            <div className="flex flex-col items-center md:items-end gap-2">
              <p>Download the app:</p>
              <div className="flex gap-4">
                <motion.a href="https://play.google.com/store/apps/details?id=com.imd.velriders" target="_blank" whileHover={{ scale: 1.1 }}>
                  <img src={googlePlayIcon} alt="Google Play" className="w-24" />
                </motion.a>
                <motion.img src={appStoreIcon} alt="App Store" className="w-24" whileHover={{ scale: 1.1 }} />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Footer;
