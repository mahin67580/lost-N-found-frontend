import React, { useEffect } from 'react';
import Banner from '../Components/Banner';
import BannerText from '../Components/BannerText';

const Home = () => {
    useEffect(() => {
        document.title = 'Home';
        window.scrollTo(0, 0);
    }, []);
    return (
        <div className='min-h-screen relative '>
            <div>
                <Banner></Banner>
            </div>
            <div className=' absolute top-[130px] left-[55px] lg:top-[500px] lg:left-[200px] w-9/12 '>
                <BannerText></BannerText>
            </div>
        </div>
    );
};

export default Home;