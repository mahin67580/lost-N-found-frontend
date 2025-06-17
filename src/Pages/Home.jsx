import React, { useEffect } from 'react';
import Banner from '../Components/Banner';
import BannerText from '../Components/BannerText';
import Latest from './Latest';
import FAQAccordion from '../Components/FAQAccordion';
import StatsSection from '../Components/StatsSection';

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
            <div>
                <Latest></Latest>
            </div>
            <div>
                <StatsSection></StatsSection>
            </div>
            <div>
                <FAQAccordion></FAQAccordion>
            </div>

        </div>
    );
};

export default Home;