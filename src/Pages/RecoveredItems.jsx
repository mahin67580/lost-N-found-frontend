import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../Provider/AuthContext';
import SpinnerLoader from '../Components/SpinnerLoader';

const RecoveredItems = () => {
    const { user } = useContext(AuthContext);
    const [recoveredItems, setRecoveredItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isTableView, setIsTableView] = useState(false);
    useEffect(() => {

        document.title = 'Recovered-Items';
        window.scrollTo(0, 0);
        const fetchRecoveredItems = async () => {
            try {
                const res = await axios.get('http://localhost:3000/recovered');
                const filtered = res.data.filter(item => item.recoveredBy.email === user?.email);
                setRecoveredItems(filtered);
            } catch (error) {
                console.error('Error fetching recovered items:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchRecoveredItems();
    }, [user]);

    if (loading) {
        return <div className="text-center mt-10 text-lg">Loading recovered items...</div>;
    }

    return (
        // <div className="max-w-6xl mx-auto px-4 py-8">
        //     <h2 className="text-2xl font-bold mb-6 text-center text-primary">My Recovered Items</h2>

        //     {recoveredItems.length === 0 ? (
        //         <p className="text-center text-gray-500">You haven’t recovered any items yet.</p>
        //     ) : (
        //         <div className="overflow-x-auto">
        //             <table className="table table-zebra w-full text-sm md:text-base">
        //                 <thead className="bg-base-200 text-base-content">
        //                     <tr>
        //                         <th>Title</th>
        //                         <th>Recovered Location</th>
        //                         <th>Recovered Date</th>
        //                         <th>Category</th>
        //                     </tr>
        //                 </thead>
        //                 <tbody>
        //                     {recoveredItems.map((item) => (
        //                         <tr key={item._id}>
        //                             <td>{item.title}</td>
        //                             <td>{item.recoveredLocation}</td>
        //                             <td>{new Date(item.recoveredDate).toLocaleDateString()}</td>
        //                             <td>{item.category}</td>
        //                         </tr>
        //                     ))}
        //                 </tbody>
        //             </table>
        //         </div>
        //     )}
        // </div>

        <div className="max-w-6xl  mx-auto px-4 py-8 mb-96">
            <SpinnerLoader>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-primary">My Recovered Items</h2>
                    <button
                        onClick={() => setIsTableView(!isTableView)}
                        className="btn btn-sm btn-outline"
                    >
                        {isTableView ? 'Card View' : 'Table View'}
                    </button>
                </div>

                {recoveredItems.length === 0 ? (
                    <p className="text-center text-gray-500">You haven’t recovered any items yet.</p>
                ) : isTableView ? (
                    // Table View
                    <div className="overflow-x-auto">
                        <table className="table table-zebra w-full text-sm md:text-base">
                            <thead className="bg-base-200 text-base-content">
                                <tr>
                                    <th>Title</th>
                                    <th>Recovered Location</th>
                                    <th>Recovered Date</th>
                                    <th>Category</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recoveredItems.map((item) => (
                                    <tr key={item._id}>
                                        <td>{item.title}</td>
                                        <td>{item.recoveredLocation}</td>
                                        <td>{new Date(item.recoveredDate).toLocaleDateString()}</td>
                                        <td>{item.category}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    // Card Grid View
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
                        {recoveredItems.map((item) => (
                            <div key={item._id} className="bg-base-100 shadow-lg rounded-lg p-4 border border-base-200">
                                <h3 className="text-lg font-semibold mb-2 text-primary">{item.title}</h3>
                                <p><span className="font-medium">Recovered Location:</span> {item.recoveredLocation}</p>
                                <p><span className="font-medium">Recovered Date:</span> {new Date(item.recoveredDate).toLocaleDateString()}</p>
                                <p><span className="font-medium">Category:</span> {item.category}</p>
                            </div>
                        ))}
                    </div>
                )}
            </SpinnerLoader>
        </div>
    );
};

export default RecoveredItems;
