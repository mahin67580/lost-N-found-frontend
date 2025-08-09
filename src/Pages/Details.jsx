import React, { useEffect, useState, useContext } from 'react';

import axios from 'axios';
import Swal from 'sweetalert2';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { AuthContext } from '../Provider/AuthContext';
import { useParams } from 'react-router';
import Loading from '../Components/Loading';
import { div } from 'framer-motion/client';

const Details = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const [item, setItem] = useState(null);
    const [isRecovered, setIsRecovered] = useState(false);
    const [recoveredDate, setRecoveredDate] = useState(new Date());
    const [recoveredLocation, setRecoveredLocation] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    // console.log(user.accessToken);

    useEffect(() => {
        axios.get(`https://lost-and-found-server-nine.vercel.app/items/${id}`)
            .then(res => {
                setItem(res.data);
                setIsRecovered(res.data.status === 'recovered');
            })
            .catch(err => console.error('Error fetching item:', err));
        document.title = 'Details';
        window.scrollTo(0, 0);
    }, [id]);

    const handleRecoverSubmit = async () => {
        setIsSubmitting(true);
        try {
            if (!recoveredLocation) {
                Swal.fire('Error', 'Please enter recovery location.', 'error');
                return;
            }

            const recoveryInfo = {
                title: item.title,
                category: item.category,
                itemId: item._id,
                recoveredLocation,
                recoveredDate,
                recoveredBy: {
                    name: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL,
                }
            };

            await axios.post('https://lost-and-found-server-nine.vercel.app/recovered', recoveryInfo);

            await axios.patch(`https://lost-and-found-server-nine.vercel.app/items/${id}`, { status: 'recovered' });

            Swal.fire('Success', 'Item marked as recovered.', 'success');
            setIsRecovered(true);
            setModalOpen(false);
        } catch (error) {
            console.error('Recovery failed:', error);
            Swal.fire('Error', 'Failed to mark as recovered.', 'error');
        }
        finally {
            setIsSubmitting(false);
        }
    };

    if (!item) return <div><Loading></Loading></div>;

    return (
        <div className="min-h-screen m-10 p-6 bg-base-100 shadow-lg rounded-box"
            style={{
                backgroundImage: `url(${item.thumbnail})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',    // optional: cover entire div
                backgroundPosition: 'center'
            }} >
          <h2 
  className="lg:text-3xl text-xl font-bold text-primary mb-4 text-center mx-auto lg:w-xl 
             backdrop-blur-xl bg-white bg-opacity-40 px-4 py-2 rounded-lg shadow-md"
>
  {item.title}
</h2>
            <div className='flex flex-col lg:flex-row justify-center gap-7 items-center'>
                <div className=' '>
                    <img src={item.thumbnail} alt={item.title} className="w-full border-2   h-96 object- rounded-md  " />
                </div>
                <div className='backdrop-blur-3xl p-5 text-black lg:text-2xl'>
                    <p><strong>Posted By:</strong> {item.contactName} ({item.contactEmail})</p>
                    <p><strong>Description:</strong> {item.description}</p>
                    <p><strong>Category:</strong> {item.category}</p>
                    <p><strong>Date:</strong> {new Date(item.date).toLocaleDateString()}</p>
                    <p><strong>Location:</strong> {item.location}</p>
                    <p><strong>Type:</strong> {item.postType}</p>
                </div>
            </div>



            {!isRecovered && user && (
                <div className='flex justify-center'>
                    <button onClick={() => setModalOpen(true)} className="btn btn-primary mt-6   ">
                        {item.postType === 'Lost' ? 'Found This!' : 'This is Mine!'}
                    </button>
                </div>

            )}

            {isRecovered && (
                <p className="text-success font-semibold mt-4 text-center backdrop-blur-xl   mx-auto lg:w-xl p-5">This item has already been recovered.</p>
            )}

            {/* Modal */}
            {modalOpen && (
                <div className="fixed inset-0   backdrop-blur-xl bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg">
                        <h3 className="text-xl font-bold mb-4 text-primary">Recovery Details</h3>

                        <label className="block mb-2 font-semibold">Recovered Location</label>
                        <input
                            type="text"
                            value={recoveredLocation}
                            onChange={(e) => setRecoveredLocation(e.target.value)}
                            className="input input-bordered w-full mb-4"
                        />

                        <label className="block mb-2 font-semibold">Date Recovered</label>
                        <DatePicker
                            selected={recoveredDate}
                            onChange={(date) => setRecoveredDate(date)}
                            className="input input-bordered w-full mb-4"
                        />

                        <div className="flex justify-between items-center">
                            <div>
                                <button
                                    onClick={handleRecoverSubmit}
                                    className={`btn btn-primary px-8 ${isSubmitting ? 'opacity-75' : ''}`}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <span className="loading loading-spinner loading-sm mr-2"></span>
                                            Posting...
                                        </>
                                    ) : (
                                        'Submit'
                                    )}
                                </button>
                            </div>
                            {/* <button onClick={handleRecoverSubmit} className="btn btn-primary">Submit</button> */}
                            <button onClick={() => setModalOpen(false)} className="btn btn-ghost">Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Details;
