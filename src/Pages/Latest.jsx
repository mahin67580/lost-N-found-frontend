import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import { motion } from 'framer-motion';

const Latest = () => {
    const [latestItems, setLatestItems] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(true);

    useEffect(() => {
        const fetchLatestItems = async () => {
            try {
                const res = await axios.get('https://lost-and-found-server-nine.vercel.app/items');
                const sortedItems = res.data
                    .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
                    .slice(0, 10);
                setLatestItems(sortedItems);
                setIsSubmitting(false);
            } catch (error) {
                console.error('Failed to fetch latest items:', error);
            }
        };

        fetchLatestItems();
    }, []);

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                when: "beforeChildren"
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    const buttonVariants = {
        hover: {
            scale: 1.05,
            transition: {
                duration: 0.3,
                yoyo: Infinity
            }
        },
        tap: {
            scale: 0.95
        }
    };

    return (
        <motion.div 
            className="   py-10"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <motion.h2 
                className="text-3xl font-bold mb-8 text-center text-primary"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                Latest Lost & Found Posts
            </motion.h2>

            <div>
                {isSubmitting ? (
                    <motion.div 
                        className="flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <span className="loading loading-spinner loading-sm mr-2"></span>
                        Fetching Data ...
                    </motion.div>
                ) : (
                    <motion.div 
                        className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-5 "
                        variants={containerVariants}
                    >
                        {latestItems.map((item) => (
                            <motion.div
                                key={item._id}
                                className="card border  border-blue-600 p-4  bg-base-100 shadow-md hover:shadow-2xl transition-shadow duration-300"
                                variants={itemVariants}
                                whileHover={{ y: -5 }}
                            >
                                <figure className="h-48 w-full p-4 overflow-hidden">
                                    <motion.img
                                        src={item.thumbnail}
                                        alt={item.title}
                                        className="object-cover rounded-full border-4   w-full h-full"
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 0.3 }}
                                    />
                                </figure>

                                <div className="card-body border-l-2  flex items-center text-center ">
                                    <h3 className="card-title text-lg font-semibold">{item.title}</h3>
                                    <p className="text-sm ">📍 Location: {item.location}</p>
                                    <p className="text-sm  ">📂 Category: {item.category}</p>

                                    <div className="card-actions justify-end mt-4">
                                        <Link to={`/items/${item._id}`}>
                                            <motion.button 
                                                className="btn btn-sm btn-primary"
                                                variants={buttonVariants}
                                                whileHover="hover"
                                                whileTap="tap"
                                            >
                                                View Details
                                            </motion.button>
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </div>

            <motion.div 
                className='text-center mt-11'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
            >
                <Link to={'/LostFoundItemsPage'}>
                    <motion.button 
                        className="btn btn-lg btn-primary"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        See All
                    </motion.button>
                </Link>
            </motion.div>
        </motion.div>
    );
};

export default Latest;