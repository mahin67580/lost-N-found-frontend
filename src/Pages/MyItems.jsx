import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { AuthContext } from '../Provider/AuthContext';
import UpdateItems from './UpdateItems';
// import { Link } from 'react-router';


const MyItems = () => {
    const [isModalOpen, setIsModalOpen] = useState();
    const [selectedId, setSelectedId] = useState(null);
    const { user } = useContext(AuthContext);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch and filter items
    const fetchItems = async () => {
        try {
            const res = await axios.get('http://localhost:3000/items');
            const myItems = res.data.filter(item => item.contactEmail === user?.email);
            setItems(myItems);
        } catch (error) {
            console.error('Failed to fetch items:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {

        fetchItems();
        document.title = 'My-items';
        window.scrollTo(0, 0);
    },  );

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
                await axios.delete(`http://localhost:3000/items/${id}`);
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
            <h2 className="text-2xl font-bold mb-6 text-center text-primary">My Items</h2>

            {loading ? (
                <p className="text-center text-gray-500">Loading...</p>
            ) : items.length === 0 ? (
                <div className="text-center text-gray-500">
                    <p>You haven't posted any items yet.</p>
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
        </div>
    );
};

export default MyItems;
