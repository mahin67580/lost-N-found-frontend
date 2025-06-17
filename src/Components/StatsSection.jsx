import React from 'react';
import CountUp from 'react-countup';
import { FaSearch, FaHandsHelping, FaUsers, FaCheckCircle } from 'react-icons/fa';
import { IoMdTime } from 'react-icons/io';
import { MdOutlinePublishedWithChanges } from 'react-icons/md';
import { Link } from 'react-router';

const StatsSection = () => {
    return (
        <div className="py-16 bg-base-100">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-primary">Our Platform Makes Reunions Possible</h2>
                    <p className="text-xl text-base-content opacity-80 mt-4">
                        Connecting lost items with their owners through community power
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Successful Recoveries */}
                    <div className="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow">
                        <div className="card-body items-center text-center">
                            <FaHandsHelping className="text-4xl text-success" />
                            <div className="flex items-center text-3xl font-bold my-2">
                                <CountUp end={1243} duration={3} separator="," />
                                <span>+</span>
                            </div>
                            <p className="text-base-content">Successful Recoveries</p>
                        </div>
                    </div>

                    {/* Active Community Members */}
                    <div className="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow">
                        <div className="card-body items-center text-center">
                            <FaUsers className="text-4xl text-info" />
                            <div className="flex items-center text-3xl font-bold my-2">
                                <CountUp end={8560} duration={3} separator="," />
                                <span>+</span>
                            </div>
                            <p className="text-base-content">Active Community Members</p>
                        </div>
                    </div>

                    {/* Items Found Daily */}
                    <div className="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow">
                        <div className="card-body items-center text-center">
                            <FaSearch className="text-4xl text-warning" />
                            <div className="flex items-center text-3xl font-bold my-2">
                                <CountUp end={42} duration={3} separator="," />
                                <span>+</span>
                            </div>
                            <p className="text-base-content">Items Found Daily</p>
                        </div>
                    </div>

                    {/* Average Recovery Time */}
                    <div className="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow">
                        <div className="card-body items-center text-center">
                            <IoMdTime className="text-4xl text-secondary" />
                            <div className="flex items-center text-3xl font-bold my-2">
                                <CountUp end={3} duration={3} />
                                <span> days</span>
                            </div>
                            <p className="text-base-content">Average Recovery Time</p>
                        </div>
                    </div>
                </div>

                <div className="mt-12 text-center">
                    <Link to={'/AddItem'}> <button className="btn btn-primary btn-lg">
                        <MdOutlinePublishedWithChanges className="mr-2" />
                        Report an Item Now
                    </button></Link>
                </div>
            </div>
        </div>
    );
};

export default StatsSection;