import { Link } from "react-router-dom";
import { FaLinkedin, FaGithub, FaInstagram, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 text-gray-700 mt-10">
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">

          <div>
            <Link to="/" className="flex items-center justify-center md:justify-start space-x-2">
              <img
                src="https://i.postimg.cc/cCtpxKgt/Chat-GPT-Image-Nov-6-2025-12-25-57-AM-1.png"
                alt="Connecto Logo"
                className="w-28 h-auto object-contain"
              />
            </Link>
            <p className="mt-3 text-sm text-gray-500">
              Connecto — the place where professionals connect, share, and grow.
            </p>
          </div>


          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="hover:text-indigo-600 transition-colors duration-300"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/create"
                  className="hover:text-indigo-600 transition-colors duration-300"
                >
                  Create Post
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="hover:text-indigo-600 transition-colors duration-300"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-indigo-600 transition-colors duration-300"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>


          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Follow Us</h3>
            <div className="flex justify-center md:justify-start space-x-5 text-xl">
              <a
                href="https://www.linkedin.com/in/harshmishra06/"
                target="_blank"
                rel="noreferrer"
                className="text-gray-500 hover:text-indigo-600 transition-colors duration-300"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://github.com/harshmishra00"
                target="_blank"
                rel="noreferrer"
                className="text-gray-500 hover:text-indigo-600 transition-colors duration-300"
              >
                <FaGithub />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="text-gray-500 hover:text-indigo-600 transition-colors duration-300"
              >
                <FaInstagram />
              </a>
              <a
                href="mailto:connecto@example.com"
                className="text-gray-500 hover:text-indigo-600 transition-colors duration-300"
              >
                <FaEnvelope />
              </a>
            </div>
          </div>
        </div>


        <div className="border-t border-gray-200 mt-8 pt-4 text-center text-sm text-gray-500">
          Harsh's Creation
        </div>
      </div>
    </footer>
  );
};

export default Footer;
