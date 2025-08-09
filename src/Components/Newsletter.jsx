import { useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaPaperPlane } from "react-icons/fa";
import Swal from "sweetalert2";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Show SweetAlert popup
    Swal.fire({
      title: "Subscribed!",
      text: `A confirmation email has been sent to ${email}`,
      icon: "success",
      confirmButtonColor: "#3B82F6", // Tailwind's blue-500
    });

    console.log("Subscribed:", email);
    setEmail("");
  };

  return (
    <section
      id="news"
      className="py-16 px-4 w-11/12 lg:rounded-full rounded-2xl mx-auto bg-gray-100 dark:bg-gray-900 transition-colors duration-300"
    >
      <div className="text-center">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <FaEnvelope className="text-5xl text-blue-500 mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
            Stay Updated on Lost & Found Alerts
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Subscribe to our newsletter and get instant notifications when items
            matching your search are posted. Be the first to know!
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="w-full sm:w-2/3 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                       bg-white dark:bg-gray-800 text-gray-800 dark:text-white 
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg 
                       hover:bg-blue-600 transition duration-300"
          >
            <FaPaperPlane /> Subscribe
          </button>
        </motion.form>

        {/* Privacy Note */}
        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          We respect your privacy. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
};

export default Newsletter;
