import React, { useEffect } from 'react';
import { Link } from 'react-router';
import Lottie from "lottie-react";
import erroranimation from "../assets/error.json";
const Errorpage = () => {
    // const error = useRouteError()
    useEffect(() => {
        document.title = 'Error-Page';
        window.scrollTo(0, 0);


    }, []);
    return (
        <div>
            <div>

                <div className='py-16 text-center bg-white   mx-auto  '>
                    {/* <h1 className='mb-8 text-7xl font-bold text-gray-900 italic'>
                        {error?.status || 404}
                    </h1>
                    <p className='mb-3 text-xl font-bold text-gray-900 md:text-2xl'>
                        {error?.error?.message || 'Something Went Wrong!'}
                    </p> */}
                    <div className='w-5/12 mx-auto'>
                        <Link to='/'>
                            <a className="btn rounded-full   text-white bg-[#0EA106]">Go Back Home</a>
                        </Link>
                        <Lottie animationData={erroranimation} />

                    </div>

                </div>
            </div>
        </div>
    );
};

export default Errorpage;