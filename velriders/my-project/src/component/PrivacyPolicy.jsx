import React from 'react';
import { motion } from 'framer-motion';
import Footer from './Footer';

function PrivacyPolicy() {
  return (
    <>
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="max-w-6xl mx-auto px-4 py-8"
    >
      <h1 className="text-3xl font-bold mb-6 text-center text-[#38A4A6]">Privacy Policy</h1>

      <div className="space-y-6 text-gray-800">
        <div>
          <h2 className="text-xl font-semibold mb-2">1. Overview</h2>
          <p>
            At Shailesh Car & Bike Pvt Ltd, we are committed to protecting your privacy and ensuring the security of your personal information.
            This privacy policy outlines how we collect, use, disclose, and protect your data when you use our vehicle rental services.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">2. Information We Collect</h2>
          <ul className="list-disc pl-6">
            <li>Contact details (name, address, email, phone number)</li>
            <li>Driver's license information</li>
            <li>Payment information</li>
            <li>Vehicle usage and location data</li>
            <li>Customer feedback</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">3. How We Use Your Information</h2>
          <ul className="list-disc pl-6">
            <li>Processing and confirming reservations</li>
            <li>Providing rental services and support</li>
            <li>Verifying your identity and driver's eligibility</li>
            <li>Communicating with you about reservations, promotions, and updates</li>
            <li>Improving our services and customer experience</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">4. Data Security</h2>
          <p>
            We employ industry-standard security measures to protect your data from unauthorized access, disclosure, alteration, and destruction.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">5. Information Sharing</h2>
          <ul className="list-disc pl-6">
            <li>Third-party service providers for operational purposes</li>
            <li>Authorities if required by law or to protect our rights</li>
            <li>Affiliated companies for internal business purposes</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">6. Your Choices</h2>
          <ul className="list-disc pl-6">
            <li>Access, correct, or delete your personal information</li>
            <li>Opt-out of marketing communications</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">7. Cookies and Tracking Technologies</h2>
          <p>
            We use cookies and similar technologies to enhance your browsing experience and collect usage data. You can manage your preferences through your browser settings.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">8. Changes to this Privacy Policy</h2>
          <p>
            We may update this policy to reflect changes in our practices. Please review it periodically.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">9. Contact Us</h2>
          <p>
            For any questions or concerns about this privacy policy, contact us at{' '}
            <a href="mailto:info@velriders.com" className="text-blue-600 underline">
              info@velriders.com
            </a>
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-600">Effective Date: 01-01-2024</p>
        </div>
      </div>
    </motion.div>
<Footer/>
    </>
  );
}

export default PrivacyPolicy;
