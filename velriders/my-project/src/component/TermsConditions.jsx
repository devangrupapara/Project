import React, { useState } from "react";
import { motion } from "framer-motion";
import Footer from "./Footer";

const TermsConditions = () => {
  // Animation variants for fade-in effect
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  // State for agreement checkbox
  const [isAgreed, setIsAgreed] = useState(false);

  const handleAgreement = () => {
    setIsAgreed(!isAgreed);
    if (!isAgreed) {
      alert("You have agreed to the Terms of Service!");
    }
  };

  return (
    <>
    <motion.div
      className="w-full max-w-8xl mx-auto p-6 rounded-lg mt-10 mb-10 shadow-md"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <div className="w-full text-center mb-6">
        <h1 className="w-full text-3xl font-bold text-[#38A4A6]">
          Terms of Service
        </h1>
        <h2 className="w-full text-xl font-semibold text-gray-700 mt-2">
          Shailesh Car And Bike PVT LTD Terms and Conditions for Hosts and
          Guests
        </h2>
      </div>

      {/* Introduction */}
      <section className="w-full space-y-6 text-gray-600">
        <p className="text-base leading-relaxed">
          Welcome to Shailesh Car And Bike PVT LTD Host Services (“Shailesh Car
          And Bike PVT LTD Host Services”) located at{" "}
          <a
            href="https://www.velriders.com"
            className="text-blue-600 hover:underline"
          >
            www.velriders.com
          </a>{" "}
          (the “Site”) and the mobile application (the “App”). The Site and App
          (each the “Platform”) are owned and operated by Shailesh Car And Bike
          PVT LTD India, a company incorporated under the Companies Act 1956,
          having its registered office at Ground Floor, Shop No-5, Dwarkesh
          Complex, Near Samarpan Over Bridge, Below Shiv Hari Hotel, Jamnagar,
          Gujarat, 361008 (also referred to as “Shailesh Car And Bike PVT LTD,”
          “we,” “us,” or “our”).
        </p>
        <p className="text-base leading-relaxed">
          All access and use of the Platform and the services thereon are
          governed by our general Platform terms (the “General Terms”), privacy
          policy available at{" "}
          <a
            href="https://www.velriders.com"
            className="text-blue-600 hover:underline"
          >
            WWW.VELRIDERS.COM
          </a>{" "}
          (the “Privacy Policy”), and service-specific terms.
        </p>
        <p className="text-base leading-relaxed">
          These Terms of Service, including specific terms and conditions
          applicable to the Hosts and Guests and Add-on Services (this
          “Agreement” or “Host T&C”) read together with the Privacy Policy, Fee
          Policy, and other applicable policies (“Governing Policies”),
          collectively create the legally binding terms and conditions on
          which Shailesh Car And Bike PVT LTD offers to you or the entity you
          represent (“you,” “User,” or “your”) the Shailesh Car And Bike PVT LTD
          Host Services (defined below), including your access and use of
          Shailesh Car And Bike PVT LTD Host Services.
        </p>
        <p className="text-base leading-relaxed">
          Please read each of the Governing Policies carefully to ensure that
          you understand each provision and before using or registering on the
          website or accessing any material, information, or availing services
          through the Platform. If you do not agree to any of its terms, please
          do not use the Platform or avail any services through the Platform.
          The Governing Policies take effect when you click an “I Agree” button
          or checkbox presented with these terms or, if earlier, when you use
          any of the services offered on the Platform (the “Effective Date”).
          To serve you better, our Platform is continuously evolving, and we
          may change or discontinue all or any part of the Platform, at any
          time and without notice, at our sole discretion.
        </p>
      </section>

      {/* Privacy Practices */}
      <section className="w-full mt-6 space-y-6">
        <h3 className="w-full text-lg font-semibold text-gray-700 border-b-2 border-gray-300 pb-2">
          1. Privacy Practices
        </h3>
        <p className="text-base leading-relaxed text-gray-600">
          We recognize the importance of safeguarding your personal information
          and we have formulated a Privacy Policy{" "}
          <a
            href="https://www.velriders.com"
            className="text-blue-600 hover:underline"
          >
            WWW.VELRIDERS.COM
          </a>{" "}
          to ensure that your personal information is sufficiently protected.
          We encourage you to read it to better understand how you can update
          and manage your information on the Platform.
        </p>
      </section>

      {/* Amendments/Modifications */}
      <section className="w-full mt-6 space-y-6">
        <h3 className="w-full text-lg font-semibold text-gray-700 border-b-2 border-gray-300 pb-2">
          2. Amendments/Modifications
        </h3>
        <p className="text-base leading-relaxed text-gray-600">
          Shailesh Car And Bike PVT LTD reserves the right to change the
          particulars contained in the Agreement from time to time and at any
          time. If Shailesh Car And Bike PVT LTD decides to make changes to the
          Agreement, it will post the new version on the website and update the
          date specified above or communicate the same to you by other means.
          Any change or modification to the Agreement will be effective
          immediately from the date of upload of the Agreement on the Platform.
          It is pertinent that you review the Agreement whenever we modify them
          and keep yourself updated about the latest terms of Agreement because
          if you continue to use the Shailesh Car And Bike PVT LTD Host Services
          after we have posted a modified Agreement, you are indicating to us
          that you agree to be bound by the modified Agreement. If you don’t
          agree to be bound by the modified terms of the Agreement, then you
          may not use the Shailesh Car And Bike PVT LTD Host Services anymore.
        </p>
      </section>

      {/* Shailesh Car And Bike PVT LTD Host Services */}
      <section className="w-full mt-6 space-y-6">
        <h3 className="w-full text-lg font-semibold text-gray-700 border-b-2 border-gray-300 pb-2">
          3. Shailesh Car And Bike PVT LTD Host Services
        </h3>
        <p className="text-base leading-relaxed text-gray-600">
          Shailesh Car And Bike PVT LTD Host Services is a marketplace feature
          of the Platform more particularly described below that helps owners
          of vehicles (“Hosts”/ “Lessors”) connect with users in temporary need
          of a vehicle on a leasehold basis (“Guests”) for their personal use
          (“Shailesh Car And Bike PVT LTD Host Services”). Shailesh Car And Bike
          PVT LTD does not itself lease or deal with such vehicles in any
          manner whatsoever and only provides a service connecting the Hosts
          to the Guests so they may enter into a Lease Agreement (defined
          below). You understand and agree that Shailesh Car And Bike PVT LTD
          is not a party to the Lease Agreement entered into between you as the
          Host of the vehicle or you as the Guest of the vehicle, nor is
          Shailesh Car And Bike PVT LTD a transportation service, agent, or
          insurer. Shailesh Car And Bike PVT LTD has no control over the
          conduct of the Users of the Shailesh Car And Bike PVT LTD Host
          Services and disclaims all liability in this regard.
        </p>
        <p className="text-base leading-relaxed text-gray-600">
          Shailesh Car And Bike PVT LTD Host Services aims to establish and
          provide a robust marketplace of reliable Hosts and Guests. Although
          Shailesh Car And Bike PVT LTD Host Services provides support for the
          transaction between Hosts and Guests, we do not guarantee the quality
          or safety of the vehicles listed on the Platform, nor can we
          guarantee the truth or accuracy of any listings, or whether Hosts and
          Guests will consummate a transaction, including the completion of
          any payment obligations.
        </p>
      </section>

      {/* Services Information */}
      <section className="w-full mt-6 space-y-6">
        <h3 className="w-full text-lg font-semibold text-gray-700 border-b-2 border-gray-300 pb-2">
          4. Services Information
        </h3>
        <p className="text-base leading-relaxed text-gray-600">
          Shailesh Car And Bike PVT LTD Host Services comprises of (a) the
          marketplace feature of the Platform{" "}
          <a
            href="https://www.velriders.com"
            className="text-blue-600 hover:underline"
          >
            https://www.velriders.com
          </a>{" "}
          that enables Hosts and Guests satisfying the applicable eligibility
          criteria listed below to connect with one another for leasing of
          vehicle for personal use; (b) support/facilitation services for
          leasing including, among others, assistance with execution of the
          lease agreement, payment facilitation, vehicle cleaning/sanitization,
          vehicle delivery, maintaining minimum fuel level, on-road assistance,
          prospective Guest diligence, and vehicle usage/location tracking
          (“Add-on Services”); and (iii) web widgets, feeds, mobile device
          software applications, applications for third-party web sites and
          services, and any other mobile or online services and/or applications
          owned, controlled, or offered by Shailesh Car And Bike PVT LTD.
          Shailesh Car And Bike PVT LTD attempts to be as accurate as possible
          in the description of succession the Shailesh Car And Bike PVT LTD Host Services.
          However, Shailesh Car And Bike PVT LTD does not warrant that the
          Shailesh Car And Bike PVT LTD Host Services, information, or other
          content of the Platform is accurate, complete, reliable, current, or
          error-free. The Platform may contain typographical errors or
          inaccuracies and may not be complete or current.
        </p>
        <p className="text-base leading-relaxed text-gray-600">
          Shailesh Car And Bike PVT LTD reserves the right to correct, change,
          or update information, errors, inaccuracies, subjective conclusions,
          interpretations, views, opinions, or even human error, or omissions
          at any time (including after an order has been submitted) without
          prior notice. Please note that such errors, inaccuracies, or
          omissions may also relate to availability and Shailesh Car And Bike
          PVT LTD Host Services. The user of the Shailesh Car And Bike PVT LTD
          Host Services shall not hold Shailesh Car And Bike PVT LTD liable for
          any loss or damage relating to the same.
        </p>
      </section>

      {/* Use of Services */}
      <section className="w-full mt-6 space-y-6">
        <h3 className="w-full text-lg font-semibold text-gray-700 border-b-2 border-gray-300 pb-2">
          5. Use of Shailesh Car And Bike PVT LTD Host Services
        </h3>
        <p className="text-base leading-relaxed text-gray-600">
          While you may use some sections/features of the Platform without
          registering with us, to access the Shailesh Car And Bike PVT LTD Host
          Services you will be required to register and create an account with
          us. Thereafter, only the Hosts and Guests satisfying the applicable
          eligibility criteria (listed below) will be able to use the services
          subject to the terms and conditions of this Agreement.
        </p>
      </section>

      {/* Eligibility */}
      <section className="w-full mt-6 space-y-6">
        <h3 className="w-full text-lg font-semibold text-gray-700 border-b-2 border-gray-300 pb-2">
          6. Eligibility
        </h3>
        <p className="text-base leading-relaxed text-gray-600">
          The Shailesh Car And Bike PVT LTD Host Services are intended solely
          for users who are 18 years or older and satisfy user-specific criteria
          below. Any use of the Shailesh Car And Bike PVT LTD Host Services by
          anyone that does not meet these requirements is expressly prohibited.
        </p>
        <h4 className="text-md font-semibold text-gray-700">
          Host/Vehicle Eligibility Criteria
        </h4>
        <ul className="list-disc pl-5 text-base leading-relaxed text-gray-600">
          <li>
            The Host must have a valid passport, Aadhar number, and/or other
            form of government-issued identification document.
          </li>
          <li>
            The vehicle(s) proposed to be listed must be an eligible
            non-transport or private personal use vehicle registered solely in
            your name. At the time of listing, the vehicle(s) being listed
            should also not have any pending insurance claims and/or other
            ongoing litigations, legal claims, or any other claims that may
            arise in tort or law.
          </li>
          <li>
            Your vehicle must be registered, located in the state in India where
            it is sought to be listed, and have a valid registration certificate
            issued by the relevant regional transport authority under the Motor
            Vehicles Act, 1988 (“MVA”).
          </li>
          <li>
            Your vehicle must be less than 7 years old and should meet all legal
            requirements of the state of its registration and usage.
          </li>
          <li>
            Your vehicle must be clean, well-maintained, and have the basic
            accessories, including a safety device as per our maintenance,
            component, and safety standards/equipment specifications attached
            hereto as Annexure I.
          </li>
          <li>
            You must abide by our exclusivity policy, which mandates that
            vehicles you list on the Platform must be exclusively shared on the
            Platform and can’t appear on another car sharing/leasing platform.
          </li>
          <li>
            Your vehicle must meet our minimum insurance requirements of having
            Third Party Comprehensive Insurance as is mandated under the Motor
            Vehicle Act, 1988.
          </li>
          <li>
            Your vehicle must have fewer than 70,000 kilometers and have never
            been declared a total loss.
          </li>
          <li>
            You must have fitment of the In-Vehicle Devices in your vehicle to
            ensure safety and tracking of the vehicle.
          </li>
        </ul>
        <h4 className="text-md font-semibold text-gray-700">
          Guest Eligibility Criteria
        </h4>
        <ul className="list-disc pl-5 text-base leading-relaxed text-gray-600">
          <li>
            The Guest must have a valid driving license issued by the
            appropriate authority under the Government of India.
          </li>
          <li>
            The Guest must have a valid passport, Aadhar number, and/or other
            form of government-issued identification document.
          </li>
          <li>
            The Guest must be legally solvent with a minimum monthly income of
            not less than INR 30,000 as substantiated by a bank account
            statement of 6 months.
          </li>
          <li>
            The Guest must have no recent vehicle accidents in the last year,
            major traffic violations in the last year, more than 2 recent
            moving violations, and a history of non-payment or failure to pay.
          </li>
          <li>
            The Guest must have a clean criminal record, including but not
            limited to no felony(s), no violent crime(s), theft(s), or offense
            related to prohibited substances(s).
          </li>
        </ul>
      </section>

      {/* Note and Agreement Checkbox */}
      <section className="w-full mt-6 space-y-6">
        <p className="text-base text-gray-600">
          Please read each of the Governing Policies carefully to ensure that
          you understand each provision and before using or registering on the
          website or accessing any material, information, or availing services
          through the Platform. If you do not agree to any of its terms, please
          do not use the Platform or avail any services through the Platform.
          The Governing Policies take effect when you click an “I Agree” button
          or checkbox presented with these terms or, if earlier, when you use
          any of the services.
        </p>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="agree"
            checked={isAgreed}
            onChange={handleAgreement}
            className="w-5 h-5 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="agree" className="text-base text-gray-700">
            I Agree to the Terms of Service
          </label>
        </div>
        {isAgreed && (
          <button
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => alert("Proceeding with agreed terms!")}
          >
            Proceed
          </button>
        )}
      </section>

      {/* Note: Add remaining sections as needed */}
      <section className="w-full mt-6 space-y-6">
        <p className="italic text-sm text-gray-500">
          Note: This is a partial implementation. Additional sections such as
          Responsibilities of Guests, Registering and Creating Your Account,
          Online Booking Terms, etc., can be added similarly by extending this
          structure. Let me know if you'd like me to include more sections!
        </p>
      </section>
    </motion.div>
    <Footer/>
    </>
  );
};

export default TermsConditions;