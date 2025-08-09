import { FaMedal, FaHeart, FaShare, FaRegComment } from 'react-icons/fa';
import { motion } from 'framer-motion';

const HeroSpotlight = () => {
  const heroes = [
    {
      id: 1,
      name: "Alex Chen",
      avatar: "👨‍💼",
      role: "Subway Hero",
      stats: {
        reunions: 42,
        streak: "15 days active",
        karma: 1285
      },
      quote: "I just treat every lost item like it's my own",
      latestRecovery: "Wedding ring at 34th St Station",
      color: "bg-blue-100 border-blue-300"
    },
    {
      id: 2,
      name: "Maria Garcia",
      avatar: "👩‍⚕️",
      role: "Park Ranger",
      stats: {
        reunions: 28,
        streak: "8 days active",
        karma: 892
      },
      quote: "The owner's smile makes it all worth it",
      latestRecovery: "Vintage camera in Central Park",
      color: "bg-green-100 border-green-300"
    },
    {
      id: 3,
      name: "Jamal Wright",
      avatar: "👨‍🍳",
      role: "Coffee Shop Regular",
      stats: {
        reunions: 19,
        streak: "21 days active",
        karma: 756
      },
      quote: "Check those seat cushions!",
      latestRecovery: "Student's thesis laptop",
      color: "bg-amber-100 border-amber-300"
    }
  ];

  return (
    <div className="  py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-sm px-4 py-1 rounded-full mb-3">
            <FaMedal className="mr-2" /> Community Heroes
          </div>
          <h2 className="text-4xl font-bold mb-2">Lost & Found Champions</h2>
          <p className="text-lg  max-w-2xl mx-auto">
            Celebrating members who go above and beyond to reunite lost items
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {heroes.map((hero) => (
            <motion.div
              key={hero.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -5 }}
              className={`relative rounded-2xl border-2 ${hero.color}   p-6 shadow-sm hover:shadow-md transition-all`}
            >
              {/* Hero Badge */}
              <div className="absolute -top-3 -right-3   border  rounded-full w-10 h-10 flex items-center justify-center shadow">
                <span className="text-xl">{hero.avatar}</span>
              </div>

              {/* Stats Ribbon */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-black  bg-white  px-3 py-1 rounded-full border dark:border-gray-700 text-xs font-medium shadow-sm">
                {hero.role}
              </div>

              <div className="text-center pt-4">
                <h3 className="text-2xl font-bold   dark:text-black ">{hero.name}</h3>
                <p className=" dark:text-black  italic mb-4">"{hero.quote}"</p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 text-black gap-2 text-center mb-4">
                <div>
                  <div className="text-lg font-bold text-black">{hero.stats.reunions}+</div>
                  <div className="text-xs  text-black">Reunions</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-black">{hero.stats.streak}</div>
                  <div className="text-xs text-black">Current Streak</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-black">{hero.stats.karma}</div>
                  <div className="text-xs text-black">Karma</div>
                </div>
              </div>

              {/* Latest Recovery */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-3 mb-4 border dark:border-gray-700">
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Latest Recovery</div>
                <div className="font-medium text-gray-800 dark:text-white">{hero.latestRecovery}</div>
              </div>

              {/* Action Buttons */}
              {/* <div className="flex justify-between">
                <button className="flex items-center text-black  hover:text-red-500 transition-colors">
                  <FaHeart className="mr-1" />
                  <span className="text-xs">Appreciate</span>
                </button>
                <button className="flex items-center text-black hover:text-blue-500 transition-colors">
                  <FaShare className="mr-1" />
                  <span className="text-xs">Share</span>
                </button>
                <button className="flex items-center text-black hover:text-green-500 transition-colors">
                  <FaRegComment className="mr-1" />
                  <span className="text-xs">Comment</span>
                </button>
              </div> */}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-12"
        >
          {/* <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all group">
            <span className="flex items-center justify-center">
              Nominate a Hero
              <span className="ml-2 group-hover:translate-x-1 transition-transform">
                →
              </span>
            </span>
          </button> */}
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSpotlight;