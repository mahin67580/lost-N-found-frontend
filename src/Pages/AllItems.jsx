import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import SpinnerLoader from '../Components/SpinnerLoader';
import Lottie from "lottie-react";
import asarchani from "../assets/searchanimation.json";
const AllItems = () => {
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        axios.get('http://localhost:3000/items')
            .then(res => {
                setItems(res.data);
                setFilteredItems(res.data); //duplicate send to Initialize filtered items with all items
            })
            .catch(err => console.error('Error fetching items:', err));
        document.title = 'All Items';
        window.scrollTo(0, 0);
    }, []);

    // Filter items based on search term
    useEffect(() => {
        if (searchTerm.trim() === '') {
            setFilteredItems(items);
        } else {
            const filtered = items.filter(item =>
                item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.location.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredItems(filtered);
        }
    }, [searchTerm, items]);

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            <SpinnerLoader>
                <h2 className="text-3xl font-bold text-center text-primary mb-8">All Lost & Found Items</h2>

                {/* Search Input */}
                <div className="mb-8 max-w-md mx-auto">
                    <div className="relative flex  justify-center items-center">
                        <div>

                            <input
                                type="text"
                                placeholder="Search by title or location..."
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <div className='  w-12'>
                            <Lottie animationData={asarchani} />
                        </div>

                    </div>

                </div>

                {/* Results Count */}
                <div className="text-center mb-4 text-gray-600">
                    {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'} found
                </div>

                {/* Items Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {filteredItems.length > 0 ? (
                        filteredItems.map(item => (
                            <div key={item._id} className="card hover:shadow-2xl transition-shadow duration-300 bg-base-100 shadow-md rounded-xl border-2 border-white overflow-hidden">
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
                        ))
                    ) : (
                        <div className="col-span-full text-center py-10">
                            <p className="text-gray-500 text-lg">No items found matching your search.</p>
                        </div>
                    )}
                </div>
            </SpinnerLoader>
        </div>
    );
};

export default AllItems;