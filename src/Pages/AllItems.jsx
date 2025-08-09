import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import SpinnerLoader from '../Components/SpinnerLoader';
import Lottie from "lottie-react";
import asarchani from "../assets/searchanimation.json";
import { AuthContext } from '../Provider/AuthContext';


const AllItems = () => {

    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [sortOrder, setSortOrder] = useState('asc'); // asc for A-Z, desc for Z-A
    const { user } = React.useContext(AuthContext) // fixed use of context hook


    useEffect(() => {
        const fetchItems = async () => {
            try {
                setLoading(true);
                setError('');


                // Only add headers if user is authenticated and has accessToken
                const config = {};
                if (user?.accessToken) {
                    config.headers = {
                        authorization: `Bearer ${user.accessToken}`
                    };
                }


                const response = await axios.get('https://lost-and-found-server-nine.vercel.app/items', config);


                setItems(response.data);
                setFilteredItems(response.data);
            } catch (err) {
                console.error('Error fetching items:', err);
                setError('Failed to load items. Please try again later.');
            } finally {
                setLoading(false);
            }
        };


        fetchItems();
    }, [user]);



    // Filter and sort items based on search term and sortOrder
    useEffect(() => {
        let updatedItems = [];

        if (searchTerm.trim() === '') {
            updatedItems = [...items];
        } else {
            updatedItems = items.filter(item =>
                (item.title?.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (item.location?.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (item.category?.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (item.description?.toLowerCase().includes(searchTerm.toLowerCase()))
            );
        }


        // Sort alphabetically by title
        updatedItems.sort((a, b) => {
            if (!a.title) return 1;
            if (!b.title) return -1;
            if (sortOrder === 'asc') {
                return a.title.localeCompare(b.title);
            } else {
                return b.title.localeCompare(a.title);
            }
        });


        setFilteredItems(updatedItems);
    }, [searchTerm, items, sortOrder]);


    if (loading) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-10 text-center">
                <SpinnerLoader />
                <p className="mt-4 text-gray-600">Loading items...</p>
            </div>
        );
    }


    if (error) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-10">
                <div className="alert alert-error max-w-md mx-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{error}</span>
                    <button
                        className="btn btn-sm btn-ghost ml-2"
                        onClick={() => window.location.reload()}
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }


    return (
        <div className="px-4 py-10">
            <h2 className="text-3xl font-bold text-center text-primary mb-8">All Lost & Found Items</h2>


            {/* Search Input & Sorting */}
            <div className="mb-8 max-w-md mx-auto">
                <div className="flex justify-center items-center space-x-3">
                    <input
                        type="text"
                        placeholder="Search by title, location, or category..."
                        className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <select
                        className="border text-primary border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                    >
                        <option value="asc">Sort A-Z</option>
                        <option value="desc">Sort Z-A</option>
                    </select>
                    <div className="w-12">
                        <Lottie animationData={asarchani} loop={true} />
                    </div>
                </div>
            </div>


            {/* Items Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {filteredItems.map(item => (
                    <div key={item._id} className="card border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-base-100 shadow-md hover:shadow-xl transition-shadow">
                        <figure className="px-4 pt-4">
                            <img
                                src={item.thumbnail || 'https://placehold.co/400x300?text=No+Image'}
                                alt={item.title}
                                className="rounded-xl h-48 w-full object-cover"
                            />
                        </figure>
                        <div className="card-body">
                            <h3 className="card-title">{item.title}</h3>
                            <p className="text-sm text-gray-500 line-clamp-2">{item.description}</p>
                            <div className="mt-2 space-y-1">
                                <p className="text-sm"><span className="font-medium">Category:</span> {item.category}</p>
                                <p className="text-sm"><span className="font-medium">Location:</span> {item.location}</p>
                                <p><span className="font-medium">Type:</span> {item.postType}</p>
                            </div>
                            <div className="card-actions justify-end mt-4">
                                <Link to={`/items/${item._id}`} className="btn btn-primary btn-sm">
                                    View Details
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>


            {filteredItems.length === 0 && !loading && (
                <div className="text-center py-10">
                    <p className="text-gray-500">No items found</p>
                </div>
            )}
        </div>
    );
};


export default AllItems;