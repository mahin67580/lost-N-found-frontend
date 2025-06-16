import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { Link } from 'react-router';
import SpinnerLoader from '../Components/SpinnerLoader';

const AllItems = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/items')
            .then(res => setItems(res.data))
            .catch(err => console.error('Error fetching items:', err));
        document.title = 'All Items';
        window.scrollTo(0, 0);
    }, []);

    return (

        <div className="max-w-7xl mx-auto px-4 py-10">
            <SpinnerLoader>
                <h2 className="text-3xl font-bold text-center text-primary mb-8">All Lost & Found Items</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 ">
                    {items.map(item => (
                        <div key={item._id} className="card hover:shadow-2xl transition-shadow duration-300 bg-base-100 shadow-md rounded-xl border-2 border-white  overflow-hidden">
                            <figure>
                                <img src={item.thumbnail} alt={item.title} className="h-48 w-full object-cover hover:scale-105 transition-transform duration-300" />
                            </figure>
                            <div className="card-body">
                                <h3 className="text-xl font-semibold">{item.title}</h3>
                                <p className="text-sm text-gray-500">{item.description.slice(0, 80)}...</p>
                                <p><span className="font-medium">Type:</span> {item.postType}</p>
                                <p><span className="font-medium">Location:</span> {item.location}</p>
                                <div className="card-actions mt-4">
                                    <Link to={`/items/${item._id}`}>
                                        <button className="btn btn-primary btn-sm">View Details</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </SpinnerLoader>
        </div>
    );
};

export default AllItems;
