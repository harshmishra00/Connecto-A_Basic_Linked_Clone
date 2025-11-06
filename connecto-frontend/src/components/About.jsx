import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const AboutUs = () => {
  return (
    <div className=" bg-gray-50 text-gray-800 flex flex-col items-center py-12 px-6">

      <h1 className="text-4xl font-extrabold mb-6 text-center text-blue-700 tracking-wide">
        About Connecto
      </h1>
      <p className="max-w-3xl text-center text-lg mb-10 text-gray-600">
        Welcome to <span className="font-semibold text-blue-700">Connecto</span> — a place where professionals, students, and creators
        come together to share ideas, showcase skills, and build real
        connections. Our goal is to make networking more human, creative, and
        rewarding.
      </p>


      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-2xl w-full text-center border border-gray-200">
        <img
          src="https://avatars.githubusercontent.com/u/148937385?v=4" 
          alt="Harsh Mishra"
          className="w-28 h-28 mx-auto rounded-full object-cover border-4 border-blue-600 shadow-md mb-4"
        />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Harsh Mishra</h2>
        <p className="text-gray-600 mb-4">Full-Stack Developer | MERN Enthusiast | UI/UX Learner</p>
        <p className="text-gray-500 mb-6 text-sm">
          Hi, I'm Harsh — the creator of <span className="font-semibold text-blue-700">Connecto</span>.  
          I’m passionate about building intuitive web experiences, crafting scalable 
          backend systems, and making products that connect people meaningfully.  
          Love for code, design, and constant learning drives me every day.
        </p>


        <div className="flex justify-center space-x-6">
          <a
            href="https://github.com/harshmishra00" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-gray-900 transition transform hover:scale-110"
          >
            <FaGithub size={26} />
          </a>
          <a
            href="https://linkedin.com/in/harshmishra06"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 hover:text-blue-900 transition transform hover:scale-110"
          >
            <FaLinkedin size={26} />
          </a>
          
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
