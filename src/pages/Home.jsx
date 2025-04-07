// import Navbar from "../components/Navbar";

// function Home() {
//   return (
//     <div className="min-h-screen bg-gray-100">
//       <Navbar />
//       <div className="flex flex-col items-center justify-center h-[calc(100vh-64px)]">
//         <h1 className="text-4xl font-bold text-gray-800 mb-6">
//           Welcome to PhD Report System
//         </h1>
//         <p className="text-lg text-gray-600 mb-8">
//           Manage your PhD reports efficiently and securely.
//         </p>
//         <div className="space-x-4">
//           <a
//             href="/login"
//             className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
//           >
//             Login
//           </a>
//           <a
//             href="/register"
//             className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition"
//           >
//             Register
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Home;
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { FiArrowRight, FiUsers, FiFileText, FiBarChart2 } from "react-icons/fi";

function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentFeature, setCurrentFeature] = useState(0);

  const features = [
    {
      icon: <FiFileText className="text-blue-600 text-3xl" />,
      title: "Report Generation",
      description: "Automated report templates with real-time collaboration",
    },
    {
      icon: <FiBarChart2 className="text-green-600 text-3xl" />,
      title: "Progress Tracking",
      description: "Visual dashboards to monitor your research milestones",
    },
    {
      icon: <FiUsers className="text-purple-600 text-3xl" />,
      title: "Supervisor Access",
      description: "Seamless communication with your research committee",
    },
  ];

  useEffect(() => {
    setIsLoaded(true);
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        when: "beforeChildren",
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  const featureVariants = {
    enter: { opacity: 0, x: 50 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
      transition: { duration: 0.2 },
    },
    tap: {
      scale: 0.98,
      boxShadow: "0 5px 10px rgba(0,0,0,0.1)",
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50 overflow-hidden">
      <Navbar />

      <div className="container mx-auto px-4 py-8 md:py-12 flex flex-col lg:flex-row items-center justify-center min-h-[calc(100vh-64px)] gap-8">
        {/* Left Content */}
        <motion.div
          className="w-full lg:w-1/2 space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
        >
          <motion.div variants={itemVariants}>
            <div className="text-sm font-semibold text-blue-600 mb-2 tracking-wider bg-blue-100 px-3 py-1 rounded-full inline-block">
              RAC REPORT GENERATION SYSTEM
            </div>
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight"
              variants={itemVariants}
            >
              <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                CS&IT MANUU
              </span>{" "}
              Research Portal
            </motion.h1>
          </motion.div>

          <motion.p
            className="text-lg text-gray-600 max-w-lg leading-relaxed"
            variants={itemVariants}
          >
            Streamline your research journey with our comprehensive PhD
            management platform. Track progress, submit reports, and collaborate
            with supervisors effortlessly.
          </motion.p>

          {/* Features Carousel */}
          <motion.div
            className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
            variants={itemVariants}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentFeature}
                variants={featureVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5 }}
                className="flex items-start gap-4"
              >
                {features[currentFeature].icon}
                <div>
                  <h3 className="font-bold text-lg text-gray-800">
                    {features[currentFeature].title}
                  </h3>
                  <p className="text-gray-600">
                    {features[currentFeature].description}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
            <div className="flex gap-2 mt-4">
              {features.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentFeature(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    currentFeature === index ? "bg-blue-600 w-4" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 pt-2"
            variants={itemVariants}
          >
            <motion.div
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Link
                to="/login"
                className="block bg-blue-600 text-white px-8 py-3 rounded-lg shadow-lg text-center font-medium relative overflow-hidden group"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Login <FiArrowRight />
                </span>
                <span className="absolute inset-0 bg-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Link>
            </motion.div>

            <motion.div
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Link
                to="/register"
                className="block bg-gradient-to-r from-green-500 to-teal-500 text-white px-8 py-3 rounded-lg shadow-lg text-center font-medium relative overflow-hidden group"
              >
                <span className="relative z-10">Register Now</span>
                <span className="absolute inset-0 bg-gradient-to-r from-green-600 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Trust Badge */}
          <motion.div
            className="flex items-center gap-4 pt-4"
            variants={itemVariants}
          >
            <div className="flex items-center -space-x-2">
              {[1, 2, 3].map((item) => (
                <motion.div
                  key={item}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1 * item }}
                  className="w-8 h-8 rounded-full bg-blue-100 border-2 border-white"
                />
              ))}
            </div>
            <div className="text-sm text-gray-500">
              Trusted by 100+ researchers at MANUU
            </div>
          </motion.div>
        </motion.div>

        {/* Right Image */}
        <motion.div
          className="w-full lg:w-1/2 relative"
          variants={itemVariants}
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          whileHover="hover"
        >
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border-8 border-white transform perspective-1000 rotate-y-6">
            <img
              src="/cseBuilding.-01.jpg"
              alt="CS&IT MANUU Department"
              className="w-full h-auto object-cover aspect-video"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent rounded-xl" />
            <div className="absolute bottom-6 left-6 text-white">
              <h3 className="text-xl md:text-2xl font-bold">
                Computer Science & IT
              </h3>
              <p className="text-blue-200 font-medium">
                Maulana Azad National Urdu University
              </p>
            </div>
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
              <span className="text-xs font-semibold text-blue-800">
                RAC Approved
              </span>
            </div>
          </div>

          <div className="absolute -z-10 w-full h-full bg-blue-100 rounded-2xl top-4 left-4" />
          <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-blue-500 rounded-full opacity-10" />
          <div className="absolute -top-6 -left-6 w-32 h-32 bg-teal-500 rounded-full opacity-10" />
        </motion.div>
      </div>
    </div>
  );
}

export default Home;
