import React from 'react';

const About = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen p-8 bg-gray-700 text-slate-300">
      <h1 className="text-3xl font-bold mb-4">About Us</h1>
      <p className="text-lg mb-4">
        Welcome to our MERN Blog App! We are passionate about sharing knowledge, experiences, and insights through our blog posts. Whether you're a developer, designer, or simply someone who loves to read interesting articles, you'll find valuable content here.
      </p>
      <p className="text-lg mb-4">
        Our goal is to provide you with valuable resources, tutorials, and insights that can help you enhance your skills, stay updated with the latest industry trends, and inspire you to create amazing projects.
      </p>
      <p className="text-lg mb-4">
        Feel free to explore our blog, read our articles, and engage with our community through comments and discussions. We appreciate your support and feedback, and we hope you find our content valuable and enjoyable.
      </p>
      <p className="text-lg mb-4">
        Thank you for visiting our MERN Blog App! If you have any questions or suggestions, please don't hesitate to reach out to us.
      </p>
    </div>
  );
};

export default About;