import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { AuthContext } from '../Provider/AuthContext';
import UpdateItems from './UpdateItems';
import SpinnerLoader from '../Components/SpinnerLoader';

const MyItems = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const { user } = useContext(AuthContext);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch items
    const fetchItems = async () => {
        setLoading(true);
        setError(null);

        try {
            const config = {
                headers: {
                    authorization: `Bearer ${user?.accessToken}`
                }
            };

            // Only add email parameter if you want filtered results
            const url = `https://lost-and-found-server-nine.vercel.app/items${user?.email ? `?email=${user.email}` : ''}`;

            const res = await axios.get(url, config);
            setItems(res.data);
        } catch (error) {
            console.error('Failed to fetch items:', error);
            setError('Failed to load items. Please try again.');
            Swal.fire('Error', 'Failed to load items', 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        document.title = 'My-items';
        window.scrollTo(0, 0);
        fetchItems();
    }, [user]); // Add user to dependency array

    // Delete item
    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: 'Are you sure?',
            text: 'This item will be permanently deleted.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
        });

        if (confirm.isConfirmed) {
            try {
                await axios.delete(`https://lost-and-found-server-nine.vercel.app/items/${id}`);
                setItems(items.filter(item => item._id !== id));
                Swal.fire('Deleted!', 'Your item has been removed.', 'success');
            } catch (error) {
                console.error('Delete failed:', error);
                Swal.fire('Error', 'Failed to delete the item.', 'error');
            }
        }
    };
    //update item
    const handleUpdateClick = (id) => {
        setSelectedId(id);
        setIsModalOpen(true);
        // console.log('ID:', id);
        // console.log('should be true:', isModalOpen);

    };
    return (
        <div className="container mx-auto px-4 py-8 min-h-screen">
            <SpinnerLoader>
                <h2 className="text-2xl font-bold mb-6 text-center text-primary">My Items</h2>

                {error ? (
                    <div className="text-center text-error">{error}</div>
                ) : loading ? (
                    <p className="text-center text-gray-500">Loading...</p>
                ) : items.length === 0 ? (
                    <div className="text-center text-gray-500">
                        <p>No items found.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="table w-full bg-base-100 shadow-md border border-base-300">
                            <thead className="bg-base-200">
                                <tr>
                                    <th>Title</th>
                                    <th>Category</th>
                                    <th>Status</th>
                                    <th>Date</th>
                                    <th className="text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map(item => (
                                    <tr key={item._id}>
                                        <td>{item.title}</td>
                                        <td>{item.category}</td>
                                        <td>
                                            <span
                                                className={`badge ${item.status === 'recovered' ? 'badge-success' : 'badge-warning'
                                                    }`}
                                            >
                                                {item.status || 'pending'}
                                            </span>
                                        </td>
                                        <td>{new Date(item.date).toLocaleDateString()}</td>

                                        <td className="flex gap-2 justify-center">
                                            <button onClick={() => handleUpdateClick(item._id)} className="btn btn-sm btn-warning">
                                                Update
                                            </button>

                                            <button
                                                onClick={() => handleDelete(item._id)}
                                                className="btn btn-sm btn-outline btn-error"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {isModalOpen && selectedId && (
                    <UpdateItems
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        refreshData={fetchItems}
                        itemId={selectedId}
                    />
                )}
            </SpinnerLoader>
        </div>
    );
};

export default MyItems;