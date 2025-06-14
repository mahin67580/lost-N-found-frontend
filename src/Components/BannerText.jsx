import React from 'react';
import { Slide } from 'react-awesome-reveal';

const BannerText = () => {
    return (
        <div>

            <div className="container mx-auto   ">
                <div className="flex flex-col lg:flex-row items-center justify-between  ">

                    <Slide direction="down">
                        <h2 className="text-center text-xl   lg:text-7xl tracking-tight font-bold drop-shadow-lg backdrop-blur-2xl lg:p-6 p-2 rounded-2xl">
                           Finders, Keepers? Not Here. <br /> We Return What’s Found.
                        </h2>
                    </Slide>



                </div>
            </div>
        </div>

    );
};

export default BannerText;