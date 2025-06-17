import React from 'react';
import { Link } from 'react-router';
import Lottie from "lottie-react";
import erroranimation from "../assets/error.json";
const Errorpage = () => {
    // const error = useRouteError()
    return (
        <div>
            <div>

                <div className='py-24 text-center   w-8/12 mx-auto mt-8'>
                    {/* <h1 className='mb-8 text-7xl font-bold text-gray-900 italic'>
                        {error?.status || 404}
                    </h1>
                    <p className='mb-3 text-xl font-bold text-gray-900 md:text-2xl'>
                        {error?.error?.message || 'Something Went Wrong!'}
                    </p> */}
                    <div className='bg-white'>
                        <Lottie style={{height:"200px"}} animationData={erroranimation} />
                    </div>
                    <Link to='/'>
                        <a className="btn rounded-full mt-7 text-white bg-[#0EA106]">Go Back Home</a>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Errorpage;