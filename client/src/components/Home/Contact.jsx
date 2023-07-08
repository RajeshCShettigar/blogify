import React from 'react';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

const Contact = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-700 text-slate-300">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <div className="flex items-center mb-4">
        <FiMail className="mr-2" />
        <a href="mailto:example@example.com" className="text-blue-500 hover:underline">example@example.com</a>
      </div>
      <div className="flex items-center mb-4">
        <FiPhone className="mr-2" />
        <a href="tel:+1234567890" className="text-blue-500 hover:underline">123-456-7890</a>
      </div>
      <div className="flex items-center mb-4">
        <FiMapPin className="mr-2" />
        <p>123 Main St, City, Country</p>
      </div>
    </div>
  );
};

export default Contact;
