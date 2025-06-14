import React, { useEffect, useState } from 'react';
import img1 from '../assets/img1.jpg'
import img2 from '../assets/img2.jpg'
import img3 from '../assets/img3.jpg'
import img4 from '../assets/img4.jpg'


const images = [
    img4,
    img2,
    img1,
    img3,
];

const Banner = () => {


    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 2000);

        return () => clearInterval(interval);
    }, []);



    return (
        <div>
            <div className='  place-items-center px-5 '>
                <div className="relative overflow-hidden mt-5 shadow-2xl w-11/12  rounded-2xl  ">
                    <div
                        className=" flex transition-transform duration-700 ease-in-out  "
                        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                    >
                        {images.map((src, index) => (
                            <img key={index} src={src} className="w-full h-[250px] lg:h-[800px] flex-shrink-0 object-cover " alt={`slide-${index}`} />
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Banner;