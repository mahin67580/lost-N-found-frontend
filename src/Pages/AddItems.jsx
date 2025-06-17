import React, { useState, useContext, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import Swal from 'sweetalert2';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';
import { AuthContext } from '../Provider/AuthContext';
import { useNavigate } from 'react-router';

const AddItems = () => {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { user } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        postType: 'Lost',
        thumbnail: '',
        title: '',
        description: '',
        category: '',
        location: '',
        date: new Date(),
        contactName: user?.displayName || '',
        contactEmail: user?.email || '',
    });

    useEffect(() => {
        document.title = 'Add Item';
        window.scrollTo(0, 0);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleDateChange = (date) => {
        setFormData((prev) => ({
            ...prev,
            date,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const itemData = {
            ...formData,
            timestamp: new Date(),
        };

        try {
            const response = await axios.post('https://lost-and-found-server-nine.vercel.app/items', itemData);

            if (response.status === 200 || response.status === 201) {
                Swal.fire({
                    icon: 'success',
                    title: 'Post submitted!',
                    text: 'Your item has been posted successfully.',
                    timer: 2000,
                    showConfirmButton: false,
                });

                // Reset form
                setFormData({
                    postType: 'Lost',
                    thumbnail: '',
                    title: '',
                    description: '',
                    category: '',
                    location: '',
                    date: new Date(),
                    contactName: user?.displayName || '',
                    contactEmail: user?.email || '',
                });

                navigate('/LostFoundItemsPage');
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response?.data?.message || 'Failed to submit the item.',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-base-100 shadow-lg rounded-box">
            <h2 className="text-2xl font-bold mb-6 text-center text-primary">Add Lost or Found Item</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Post Type */}
                <div>
                    <label className="block font-semibold mb-1">Post Type</label>
                    <select
                        name="postType"
                        value={formData.postType}
                        onChange={handleChange}
                        className="select w-full"
                        disabled={isSubmitting}
                    >
                        <option>Lost</option>
                        <option>Found</option>
                    </select>
                </div>

                {/* Thumbnail */}
                <div>
                    <label className="block font-semibold mb-1">Thumbnail (Image URL)</label>
                    <input
                        type="text"
                        name="thumbnail"
                        value={formData.thumbnail}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                        disabled={isSubmitting}
                    />
                    {formData.thumbnail && (
                        <div className="mt-2 flex justify-center">
                            <img
                                src={formData.thumbnail}
                                alt="Preview"
                                className="max-w-full h-auto max-h-48 rounded border border-gray-200"
                                onError={(e) => e.target.style.display = 'none'}
                            />
                        </div>
                    )}
                </div>

                {/* Title */}
                <div>
                    <label className="block font-semibold mb-1">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                        required
                        disabled={isSubmitting}
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block font-semibold mb-1">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="textarea textarea-bordered w-full"
                        required
                        disabled={isSubmitting}
                    />
                </div>

                {/* Category */}
                <div>
                    <label className="block font-semibold mb-1">Category</label>
                    <input
                        type="text"
                        placeholder='pets, documents, gadgets'
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                        disabled={isSubmitting}
                    />
                </div>

                {/* Location */}
                <div>
                    <label className="block font-semibold mb-1">Location (Where it was lost/found)</label>
                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                        required
                        disabled={isSubmitting}
                    />
                </div>

                {/* Date */}
                <div>
                    <label className="block font-semibold mb-1">Date Lost or Found</label>
                    <DatePicker
                        selected={formData.date}
                        onChange={handleDateChange}
                        className="input input-bordered w-full"
                        disabled={isSubmitting}
                    />
                </div>

                {/* Contact Info */}
                <div>
                    <label className="block font-semibold mb-1">Contact Name</label>
                    <input
                        type="text"
                        value={formData.contactName}
                        name="contactName"
                        readOnly
                        className="input input-bordered w-full"
                    />
                </div>
                <div>
                    <label className="block font-semibold mb-1">Contact Email</label>
                    <input
                        type="email"
                        value={formData.contactEmail}
                        name="contactEmail"
                        readOnly
                        className="input input-bordered w-full"
                    />
                </div>

                {/* Submit Button */}
                <div className="text-center mt-6">
                    <button
                        type="submit"
                        className={`btn btn-primary px-8 ${isSubmitting ? 'opacity-75' : ''}`}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <>
                                <span className="loading loading-spinner loading-sm mr-2"></span>
                                Posting...
                            </>
                        ) : (
                            'Add Post'
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddItems;