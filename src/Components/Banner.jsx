import React, { useEffect, useState } from 'react';

const images = [
    {
        url: "https://images.pexels.com/photos/7869720/pexels-photo-7869720.jpeg?_gl=1*1sd4qri*_ga*ODkxNjUxMTU2LjE3NDY5NTU4MzY.*_ga_8JE65Q40S6*czE3NTQ3MTQ2OTckbzUkZzEkdDE3NTQ3MTUxMTkkajM0JGwwJGgw",
        text: "Find What You’ve Lost",
        subtext: "Easily search and claim lost items"
    },
    {
        url: "https://media.istockphoto.com/id/1166427273/photo/letter-block-in-word-lost-found-on-wood-background.jpg?s=612x612&w=0&k=20&c=_McjNoxNkewJ6sLYcQN07ovI9CtbkxCe8NYZ5GB6rkA=",
        text: "Report Found Items",
        subtext: "Help return belongings to their owners"
    },
    {
        url: "https://images.pexels.com/photos/859895/pexels-photo-859895.jpeg?_gl=1*1i2pm6d*_ga*ODkxNjUxMTU2LjE3NDY5NTU4MzY.*_ga_8JE65Q40S6*czE3NTQ3MTQ2OTckbzUkZzEkdDE3NTQ3MTUxMzIkajIxJGwwJGgw",
        text: "Spread the Word",
        subtext: "Post alerts to reach more people"
    },
    {
        url: "https://cdn.pixabay.com/photo/2024/04/05/06/35/ai-generated-8676653_1280.jpg",
        text: "Safe & Verified Listings",
        subtext: "Trusted community-driven platform"
    }

];

const Banner = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000); // Increased interval for better readability

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="mt-10 relative w-11/12 h-[60vh] max-h-[700px] min-h-[300px] overflow-hidden mx-auto  rounded-xl">
            <div
                className="flex transition-transform duration-1000 ease-in-out h-full  "
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {images.map((image, index) => (
                    <div key={index} className="w-full flex-shrink-0 relative h-full">
                        <img
                            src={image.url}
                            className="w-full h-full object-cover brightness-75"
                            alt={`slide-${index}`}
                        />
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                            <div className="  backdrop-blur-2xl   p-6 rounded-xl max-w-4xl mx-auto">
                                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg ">
                                    {image.text}
                                </h2>
                                <p className="text-xl md:text-2xl text-white opacity-90 drop-shadow-md">
                                    {image.subtext}
                                </p>

                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Navigation dots */}
            <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${currentIndex === index ? 'bg-white w-6' : 'bg-white bg-opacity-50'}`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Banner;