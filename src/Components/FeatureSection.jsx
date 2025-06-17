import React from 'react';
/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion';
/* eslint-enable no-unused-vars */
import {
    FaSearch,
    FaBell,
    FaMapMarkerAlt,
    FaHandsHelping,
    FaShieldAlt,
    FaMobileAlt,
    FaBoxOpen,
    FaUserFriends,
    FaCamera,
    FaHeart
} from 'react-icons/fa';

const FeatureSection = () => {
    // Feature items data for Lost & Found platform
    const features = [
        {
            title: "Quick Reporting",
            description: "Instantly report lost items with photos and details",
            icon: <FaBoxOpen className="text-primary" />
        },
        {
            title: "Advanced Search",
            description: "Filter found items by location, category, and date",
            icon: <FaSearch className="text-secondary" />
        },
        {
            title: "Location Tracking",
            description: "View items on a map to find those near you",
            icon: <FaMapMarkerAlt className="text-accent" />
        },
        {
            title: "Instant Notifications",
            description: "Get alerts when matching items are reported",
            icon: <FaBell className="text-info" />
        },
        {
            title: "Secure Connections",
            description: "Verified user profiles and secure messaging",
            icon: <FaShieldAlt className="text-success" />
        },
        {
            title: "Community Support",
            description: "Help others reunite with their belongings",
            icon: <FaUserFriends className="text-warning" />
        }
    ];

    // Floating background icons with different colors
    const floatingIcons = [
        { icon: <FaBoxOpen className="text-primary opacity-20" />, size: "text-4xl", delay: 0, duration: 12 },
        { icon: <FaCamera className="text-secondary opacity-20" />, size: "text-5xl", delay: 2, duration: 15 },
        { icon: <FaHeart className="text-accent opacity-20" />, size: "text-3xl", delay: 1, duration: 10 },
        { icon: <FaMobileAlt className="text-neutral opacity-20" />, size: "text-4xl", delay: 3, duration: 14 },
    ];

    return (
        <section className="py-16 px-4 bg-base-100 relative overflow-hidden">
            {/* Floating animated background icons */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {floatingIcons.map((item, index) => (
                    <motion.div
                        key={`floating-${index}`}
                        initial={{
                            opacity: 0,
                            x: Math.random() * 100 - 50,
                            y: Math.random() * 100 - 50
                        }}
                        animate={{
                            opacity: [0, 0.3, 0],
                            x: [0, Math.random() * 200 - 100, 0],
                            y: [0, Math.random() * 200 - 100, 0],
                            rotate: [0, 360]
                        }}
                        transition={{
                            duration: item.duration,
                            delay: item.delay,
                            repeat: Infinity,
                            repeatType: "loop",
                            ease: "easeInOut",
                        }}
                        className={`absolute ${item.size}`}
                        style={{
                            left: `${Math.random() * 90 + 5}%`,
                            top: `${Math.random() * 80 + 10}%`,
                        }}
                    >
                        {item.icon}
                    </motion.div>
                ))}
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl font-bold mb-4 text-base-content"
                    >
                        Reconnect With What Matters
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-xl text-base-content/70 max-w-2xl mx-auto"
                    >
                        Our platform makes it easy to report and recover lost items through community support
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{
                                y: -5,
                                scale: 1.03,
                                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
                            }}
                            className="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow"
                        >
                            <div className="card-body items-center text-center">
                                <motion.div
                                    animate={{
                                        scale: [1, 1.1, 1],
                                        rotate: [0, 10, -10, 0]
                                    }}
                                    transition={{
                                        duration: 4,
                                        repeat: Infinity,
                                        repeatType: "reverse",
                                        ease: "easeInOut",
                                        delay: index * 0.3
                                    }}
                                    className="text-5xl mb-4"
                                >
                                    {feature.icon}
                                </motion.div>
                                <h3 className="card-title text-xl text-base-content">
                                    {feature.title}
                                </h3>
                                <p className="text-base-content/70">
                                    {feature.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeatureSection;