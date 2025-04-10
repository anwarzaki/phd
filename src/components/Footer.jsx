import { motion } from "framer-motion";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiTwitter,
  FiLinkedin,
  FiGithub,
} from "react-icons/fi";
import { Link } from "react-router-dom";

const Footer = () => {
  const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const socialLinks = [
    { icon: <FiTwitter />, url: "https://twitter.com/manuuhyd" },
    { icon: <FiLinkedin />, url: "https://linkedin.com/school/manuuhyd" },
    { icon: <FiGithub />, url: "https://github.com/manuu-csit" },
  ];

  return (
    <motion.footer
      className="bg-gradient-to-r from-blue-800 to-blue-900 text-white pt-12 pb-8"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={footerVariants}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About Section */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <span className="bg-blue-600 w-2 h-6 mr-2 rounded-full"></span>
              RAC Report System
            </h3>
            <p className="text-blue-100 mb-4">
              A comprehensive platform for managing PhD research progress at
              CS&IT, MANUU.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-blue-300 text-xl"
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.2 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-blue-100 hover:text-white transition"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="text-blue-100 hover:text-white transition"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="text-blue-100 hover:text-white transition"
                >
                  Register
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-blue-100 hover:text-white transition"
                >
                  About
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FiMail className="mt-1 mr-2 text-blue-300" />
                <span>rac@manuu.edu.in</span>
              </li>
              <li className="flex items-start">
                <FiPhone className="mt-1 mr-2 text-blue-300" />
                <span>+91 40 2300 8432</span>
              </li>
              <li className="flex items-start">
                <FiMapPin className="mt-1 mr-2 text-blue-300" />
                <span>
                  MANUU, Gachibowli
                  <br />
                  Hyderabad, Telangana 500032
                </span>
              </li>
            </ul>
          </motion.div>

          {/* University Info */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-semibold mb-4">CS&IT, MANUU</h4>
            <img
              src="/manuu_logo.jpg"
              alt="MANUU Logo"
              className="h-16 mb-4 rounded"
            />
            <p className="text-blue-100 text-sm">
              Department of Computer Science & Information Technology
              <br />
              Maulana Azad National Urdu University
            </p>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          className="pt-6 border-t border-blue-700 text-center text-blue-200 text-sm"
          variants={itemVariants}
        >
          <p>
            &copy; {new Date().getFullYear()} RAC Report System, CS&IT MANUU.
            All rights reserved.
          </p>
          <p className="mt-1">
            Developed by{" "}
            <span className="text-white">CS&IT Development Team</span>
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
