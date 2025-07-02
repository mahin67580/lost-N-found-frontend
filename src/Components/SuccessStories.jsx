import { FaUserCircle, FaQuoteLeft, FaSmile, FaGrinHearts, FaLaughBeam, FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useState, useEffect, useMemo, use } from 'react';
import { AuthContext } from '../Provider/AuthContext';

const REACTION_MAP = {
    happy: { icon: <FaSmile className="text-2xl text-blue-500" />, value: 'happy' },
    love: { icon: <FaGrinHearts className="text-2xl text-pink-500" />, value: 'love' },
    laugh: { icon: <FaLaughBeam className="text-2xl text-yellow-500" />, value: 'laugh' }
};

const DEFAULT_STORIES = [
    {
        id: 1,
        quote: "I thought I'd never see my grandmother's ring again! Thanks to this platform, it's back on my finger where it belongs.",
        author: "Sarah J.",
        item: "Vintage Gold Ring",
        reactionType: "love",
        location: "Recovered in Central Park"
    },
    {
        id: 2,
        quote: "My lost laptop had all my thesis work. A kind stranger found it and contacted me through this site. Lifesaver!",
        author: "Michael T.",
        item: "MacBook Pro",
        reactionType: "laugh",
        location: "Recovered at Coffee Shop"
    },
    {
        id: 3,
        quote: "Within 24 hours of posting about my lost dog's collar, someone recognized it from the unique tag. Amazing community!",
        author: "Emma R.",
        item: "Dog Collar with ID Tag",
        reactionType: "happy",
        location: "Recovered in Downtown"
    }
];

const SuccessStories = () => {
    const { user } = use(AuthContext);
    const [storiesData, setStoriesData] = useState(() => {
        // Initialize with either localStorage data or default stories
        const savedStories = JSON.parse(localStorage.getItem('successStories'));
        return savedStories || DEFAULT_STORIES;
    });
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [newStory, setNewStory] = useState({
        quote: '',
        item: '',
        location: '',
        reactionType: 'happy'
    });

    // Memoized stories with reconstructed components
    const stories = useMemo(() => {
        return storiesData.map(story => ({
            ...story,
            reaction: REACTION_MAP[story.reactionType]?.icon || REACTION_MAP.happy.icon
        }));
    }, [storiesData]);

    // Save stories to localStorage when they change
    useEffect(() => {
        localStorage.setItem('successStories', JSON.stringify(storiesData));
    }, [storiesData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewStory(prev => ({ ...prev, [name]: value }));
    };

    const handleReactionSelect = (reactionType) => {
        setNewStory(prev => ({ ...prev, reactionType }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newStory.quote || !newStory.item || !newStory.location) return;

        const storyToAdd = {
            id: Date.now(),
            quote: newStory.quote,
            author: user?.displayName || 'Anonymous',
            item: newStory.item,
            reactionType: newStory.reactionType,
            location: newStory.location
        };

        setStoriesData(prev => [storyToAdd, ...prev]);
        setNewStory({
            quote: '',
            item: '',
            location: '',
            reactionType: 'happy'
        });
        setIsFormOpen(false);
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { y: 30, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.6, ease: "backOut" }
        },
        hover: {
            y: -5,
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
        }
    };

    return (
        <div className="    py-16 px-4">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-bold mb-4">Happy Reunions</h2>
                    <p className="text-lg   max-w-2xl mx-auto">
                        See how we've helped people recover their precious belongings
                    </p>
                </motion.div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {stories.map((story) => (
                        <motion.div
                            key={story.id}
                            className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700"
                            variants={itemVariants}
                            whileHover="hover"
                        >
                            <div className="flex flex-col h-full">
                                <div className="mb-4 text-blue-400 dark:text-blue-300">
                                    <FaQuoteLeft className="text-3xl opacity-30" />
                                </div>

                                <p className="text-gray-700 dark:text-gray-300 mb-6 flex-grow italic">
                                    "{story.quote}"
                                </p>

                                <div className="mt-auto">
                                    <div className="flex items-center mb-4">
                                        <FaUserCircle className="text-3xl text-gray-400 mr-3" />
                                        <div>
                                            <h4 className="font-medium text-gray-800 dark:text-white">{story.author}</h4>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">{story.location}</p>
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
                                        <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs px-3 py-1 rounded-full">
                                            {story.item}
                                        </span>
                                        <div className="text-2xl">
                                            {story.reaction}
                                        </div>
                                    </div>
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
                    <button
                        onClick={() => setIsFormOpen(true)}
                        className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-full font-medium transition-all shadow-lg hover:shadow-xl"
                    >
                        Share Your Success Story
                    </button>
                </motion.div>

                {/* Story Submission Form Modal */}
                {isFormOpen && (
                    <div className="fixed inset-0   flex items-center justify-center p-4 z-50">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full relative"
                        >
                            <button
                                onClick={() => setIsFormOpen(false)}
                                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                            >
                                <FaTimes className="text-xl" />
                            </button>

                            <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Share Your Story</h3>

                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label className="block text-gray-700 dark:text-gray-300 mb-2">Your Story*</label>
                                    <textarea
                                        name="quote"
                                        value={newStory.quote}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                        rows="4"
                                        required
                                        placeholder="Tell us about how you recovered your item..."
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-700 dark:text-gray-300 mb-2">Recovered Item*</label>
                                    <input
                                        type="text"
                                        name="item"
                                        value={newStory.item}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                        required
                                        placeholder="What item did you recover?"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-700 dark:text-gray-300 mb-2">Location*</label>
                                    <input
                                        type="text"
                                        name="location"
                                        value={newStory.location}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                        required
                                        placeholder="Where was it recovered?"
                                    />
                                </div>

                                <div className="mb-6">
                                    <label className="block text-gray-700 dark:text-gray-300 mb-2">How are you feeling?</label>
                                    <div className="flex space-x-4">
                                        {Object.values(REACTION_MAP).map((option) => (
                                            <button
                                                key={option.value}
                                                type="button"
                                                onClick={() => handleReactionSelect(option.value)}
                                                className={`p-2 rounded-full ${newStory.reactionType === option.value ? 'bg-blue-100 dark:bg-blue-900 border-2' : 'bg-gray-100 dark:bg-gray-700'}`}
                                            >
                                                {option.icon}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition-colors"
                                >
                                    Submit Your Story
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SuccessStories;