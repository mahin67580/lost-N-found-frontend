import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Swal from 'sweetalert2';
import { AuthContext } from '../Provider/AuthContext';

const UpdateItems = ({ isOpen, onClose, refreshData, itemId }) => {
    const { user } = useContext(AuthContext);
    const [formData, setFormData] = useState(null);

    useEffect(() => {
        if (isOpen && itemId) {
            axios.get(`https://lost-and-found-server-nine.vercel.app/items/${itemId}`)
                .then(res => setFormData({ ...res.data, date: new Date(res.data.date) }))
                .catch(err => console.error('Error loading item:', err));
        }
    }, [isOpen, itemId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleDateChange = (date) => {
        setFormData(prev => ({
            ...prev,
            date,
        }));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        //console.log(formData);
        const { _id, ...updateData } = formData;
       // console.log(updateData);
        try {

            await axios.patch(`https://lost-and-found-server-nine.vercel.app/items/${itemId}`, updateData);
            Swal.fire({
                icon: 'success',
                title: 'Item Updated',
                timer: 1500,
                showConfirmButton: false,
            });
            refreshData();
            onClose();
        } catch (err) {
            console.error(err);
            Swal.fire({
                icon: 'error',
                title: 'Update Failed',
            });
        }
    };

    if (!isOpen || !formData) return null;

    return (
        <dialog id="update_modal" className={`modal ${isOpen ? 'modal-open' : ''}`}>
            <div className="modal-box w-11/12 max-w-2xl">
                <form onSubmit={handleUpdate} className="space-y-4">
                    {/* Post Type */}
                    <div>
                        <label className="block font-semibold mb-1">Post Type</label>
                        <select name="postType" value={formData.postType} onChange={handleChange} className="select w-full">
                            <option>Lost</option>
                            <option>Found</option>
                        </select>
                    </div>

                    {/* Thumbnail */}
                    <div>
                        <label className="block font-semibold mb-1">Thumbnail (Image URL)</label>
                        <input type="text" name="thumbnail" value={formData.thumbnail} onChange={handleChange} className="input input-bordered w-full" />
                    </div>

                    {/* Title */}
                    <div>
                        <label className="block font-semibold mb-1">Title</label>
                        <input type="text" name="title" value={formData.title} onChange={handleChange} className="input input-bordered w-full" required />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block font-semibold mb-1">Description</label>
                        <textarea name="description" value={formData.description} onChange={handleChange} className="textarea textarea-bordered w-full" required />
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block font-semibold mb-1">Category</label>
                        <input type="text" name="category" value={formData.category} onChange={handleChange} className="input input-bordered w-full" />
                    </div>

                    {/* Location */}
                    <div>
                        <label className="block font-semibold mb-1">Location</label>
                        <input type="text" name="location" value={formData.location} onChange={handleChange} className="input input-bordered w-full" />
                    </div>

                    {/* Date */}
                    <div>
                        <label className="block font-semibold mb-1">Date Lost or Found</label>
                        <DatePicker
                            selected={formData.date}
                            onChange={handleDateChange}
                            className="input input-bordered w-full"
                        />
                    </div>

                    {/* Contact Info (Read-only) */}
                    <div>
                        <label className="block font-semibold mb-1">Contact Name</label>
                        <input type="text" value={formData.contactName || user?.displayName} readOnly className="input input-bordered w-full bg-gray-100" />
                    </div>
                    <div>
                        <label className="block font-semibold mb-1">Contact Email</label>
                        <input type="email" value={formData.contactEmail || user?.email} readOnly className="input input-bordered w-full bg-gray-100" />
                    </div>
                    <div className="text-right">
                        <button type="submit" className="btn btn-primary">Update</button>
                        <button type="button" onClick={onClose} className="btn ml-2">Cancel</button>
                    </div>
                </form>
            </div>
        </dialog>
    );
};

export default UpdateItems;