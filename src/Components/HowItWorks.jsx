import { FaSearch, FaPlusCircle, FaBell, FaCheckCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useEffect } from 'react';

const HowItWorks = () => {
   useEffect(() => {
          document.title = 'WorkFlow';
          window.scrollTo(0, 0);
      }, []);
  const steps = [
    {
      icon: <FaSearch className="text-3xl text-blue-500" />,
      title: "Search Items",
      description: "Browse through our database of lost and found items using filters or keywords."
    },
    {
      icon: <FaPlusCircle className="text-3xl text-green-500" />,
      title: "Report Item",
      description: "Submit details about a lost or found item with photos and location."
    },
    {
      icon: <FaBell className="text-3xl text-yellow-500" />,
      title: "Get Notified",
      description: "Set up alerts for when items matching your description are posted."
    },
    {
      icon: <FaCheckCircle className="text-3xl text-purple-500" />,
      title: "Claim Success",
      description: "Verify ownership and arrange pickup for matched items."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="  py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold  mb-4">How It Works</h2>
          <p className="text-lg  max-w-2xl mx-auto">
            Our simple 4-step process helps reunite lost items with their owners quickly and efficiently.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <div className="flex flex-col items-center text-center">
                <div className="bg-white dark:bg-gray-600 p-4 rounded-full shadow-md mb-4">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
                <div className="mt-4 text-sm font-medium text-blue-500 dark:text-blue-400">
                  Step {index + 1}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-16"
        >
          
        </motion.div>
      </div>
    </div>
  );
};

export default HowItWorks;