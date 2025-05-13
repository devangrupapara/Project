import React, { useState } from 'react';
import { motion } from 'framer-motion';
import footerLogo from '../assets/footerlogo.png';
import footerMail from '../assets/footermail.png';
import footerCall from '../assets/footercall.png';
import ellipseImage from '../assets/Ellipse 793.png';
import kiteImage from '../assets/kite.png';
import Footer from './Footer';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
};

const ContactUs = () => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!form.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!form.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!form.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(form.phone)) {
      newErrors.phone = 'Phone number must be 10 digits';
    }
    if (!form.message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log('Form submitted:', form); // Replace with actual submission logic (e.g., API call)
      alert('Message sent successfully!');
      setForm({ firstName: '', lastName: '', email: '', phone: '', message: '' });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    // Clear error for the field being edited if it becomes valid
    if (errors[name]) {
      const newErrors = { ...errors };
      if (name === 'firstName' && value.trim()) delete newErrors.firstName;
      if (name === 'lastName' && value.trim()) delete newErrors.lastName;
      if (name === 'email' && /\S+@\S+\.\S+/.test(value)) delete newErrors.email;
      if (name === 'phone' && /^\d{10}$/.test(value)) delete newErrors.phone;
      if (name === 'message' && value.trim()) delete newErrors.message;
      setErrors(newErrors);
    }
  };

  return (
    <>
      <motion.div
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center gap-12 mt-8 bg-white px-4 pb-12"
      >
        {/* Heading */}
        <motion.div variants={fadeIn} className="text-center">
          <h1 className="text-4xl font-bold text-[#38A4A6]">Contact Us</h1>
          <p className="text-gray-500 mt-2">Any questions or remarks? Just write us a message!</p>
        </motion.div>

        {/* Contact Info and Form */}
        <motion.div
          variants={fadeIn}
          className="w-full max-w-6xl flex flex-col md:flex-row gap-8 p-4 rounded-lg"
        >
          {/* Left: Info */}
          <motion.div
            variants={fadeIn}
            className="bg-[#38A4A6] text-white p-8 rounded-lg w-full md:w-1/3 flex flex-col gap-12 relative shadow-lg"
          >
            <h2 className="text-2xl font-bold">Contact Information</h2>
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Get in Touch</h3>
              <div className="flex items-start gap-3">
                <img src={footerLogo} alt="Location" className="w-5 h-5 mt-1" />
                <p className="text-sm">
                  OFFICE NO. 215, Iscon Emporio, Satellite Rd, Ahmedabad, Gujarat
                </p>
              </div>
              <div className="flex items-start gap-3">
                <img src={footerMail} alt="Email" className="w-5 h-3 mt-1" />
                <a href="mailto:info@velriders.com" className="text-sm hover:underline">
                  info@velriders.com
                </a>
              </div>
              <div className="flex items-start gap-3">
                <img src={footerCall} alt="Phone" className="w-4 h-4 mt-1" />
                <a href="tel:08238224282" className="text-sm hover:underline">
                  082382 24282
                </a>
              </div>
            </div>
            <motion.img
              src={ellipseImage}
              alt="Decoration"
              className="absolute bottom-0 right-0 w-24 h-24 opacity-30"
              initial={{ scale: 0 }}
              animate={{ scale: 1, transition: { duration: 0.5 } }}
            />
          </motion.div>

          {/* Right: Form */}
          <motion.form
            variants={fadeIn}
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-lg w-full md:w-2/3 flex flex-col gap-6 relative shadow-lg"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="font-semibold text-gray-700">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  className={`w-full border-b ${errors.firstName ? 'border-red-500' : 'border-gray-400'} p-2 focus:outline-none focus:border-[#38A4A6] transition-colors`}
                />
                {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
              </div>
              <div>
                <label className="font-semibold text-gray-700">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  className={`w-full border-b ${errors.lastName ? 'border-red-500' : 'border-gray-400'} p-2 focus:outline-none focus:border-[#38A4A6] transition-colors`}
                />
                {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
              </div>
              <div>
                <label className="font-semibold text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className={`w-full border-b ${errors.email ? 'border-red-500' : 'border-gray-400'} p-2 focus:outline-none focus:border-[#38A4A6] transition-colors`}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
              <div>
                <label className="font-semibold text-gray-700">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className={`w-full border-b ${errors.phone ? 'border-red-500' : 'border-gray-400'} p-2 focus:outline-none focus:border-[#38A4A6] transition-colors`}
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>
            </div>
            <div>
              <label className="font-semibold text-gray-700">Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Write your message..."
                className={`w-full border-b ${errors.message ? 'border-red-500' : 'border-gray-400'} p-2 focus:outline-none focus:border-[#38A4A6] transition-colors resize-none h-28`}
              />
              {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
            </div>

            <div className="flex justify-end mt-4">
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#38A4A6] text-white px-6 py-3 rounded-md hover:bg-[#2c8385] transition-colors"
              >
                Send Message
              </motion.button>
            </div>

            <motion.img
              src={kiteImage}
              alt="Kite Decoration"
              className="absolute bottom-0 right-0 w-24 h-24 opacity-40"
              initial={{ rotate: -30, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1, transition: { duration: 0.6 } }}
            />
          </motion.form>
        </motion.div>
      </motion.div>

      <Footer />
    </>
  );
};

export default ContactUs;