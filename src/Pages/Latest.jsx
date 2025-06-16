import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { Link } from 'react-router';

const Latest = () => {
    const [latestItems, setLatestItems] = useState([]);

    useEffect(() => {
        const fetchLatestItems = async () => {
            try {
                const res = await axios.get('http://localhost:3000/items');
                const sortedItems = res.data
                    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
                    .slice(0, 6);
                setLatestItems(sortedItems);
            } catch (error) {
                console.error('Failed to fetch latest items:', error);
            }
        };

        fetchLatestItems();
    }, []);

    console.log(latestItems);
    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            <h2 className="text-3xl font-bold mb-8 text-center text-primary">Latest Lost & Found Posts</h2>

            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {latestItems.map((item) => (
                    <div
                        key={item._id}
                        className="card bg-base-100   shadow-md hover:shadow-2xl transition-shadow duration-300   "
                    >
                        <figure className="h-48 w-full overflow-hidden">
                            <img
                                src={item.thumbnail}
                                alt={item.title}
                                className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                            />
                        </figure>

                        <div className="card-body">
                            <h3 className="card-title text-lg font-semibold">{item.title}</h3>
                            <p className="text-sm text-gray-500">📍 Location: {item.location}</p>
                            <p className="text-sm text-gray-500">📂 Category: {item.category}</p>

                            {/* 🕒 Date Lost/Found */}

                            {/* <p className="text-sm text-gray-500">
                                🕒 {new Date(item.date).toLocaleDateString()}
                            </p> */}

                            <div className="card-actions justify-end mt-4">
                                <Link to={`/items/${item._id}`}>
                                    <button className="btn btn-sm btn-primary">View Details</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className='text-center mt-11'>
                <Link to={'/LostFoundItemsPage'}>

                    <button className="btn btn-lg  btn-primary ">See All</button>
                </Link>
            </div>

        </div>
    );
};

export default Latest;
