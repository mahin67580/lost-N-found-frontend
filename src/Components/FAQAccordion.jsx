import React from 'react';

const FAQAccordion = () => {
    const faqs = [
        {
            question: "How do I report a lost item?",
            answer: "Click on 'Report Lost Item' in the navigation menu and fill out the form with details about your lost item, including description, location, and contact information. Uploading a photo can significantly increase your chances of recovery."
        },
        {
            question: "What should I do if I find a lost item?",
            answer: "Click on 'Report Found Item' and provide as much detail as possible about the item and where you found it. If possible, include clear photos. The owner or our team will contact you to arrange for its return."
        },
        {
            question: "How can I increase my chances of finding my lost item?",
            answer: "Provide detailed descriptions, specific locations, and clear photos. Regularly check the 'Found Items' section and consider offering a reward. Share your listing on social media for wider visibility."
        },
        {
            question: "Is there any fee for using this service?",
            answer: "Basic listing and searching are completely free. We offer premium features like featured listings and enhanced visibility for a small fee, but the core functionality remains free for all users."
        },
        {
            question: "How do I claim an item that matches my lost item?",
            answer: "When you find a matching item in the 'Found Items' section, click 'This Might Be Mine' to contact the finder. You'll need to provide proof of ownership (like identifying details or receipts) to claim the item."
        },
        {
            question: "What happens if no one claims a found item?",
            answer: "After 60 days, finders may choose to keep unclaimed items, donate them to charity, or turn them over to local authorities, depending on local laws and the item's value."
        },
        {
            question: "How do I ensure my personal safety when meeting to exchange items?",
            answer: "Always meet in public places during daylight hours. Consider bringing a friend or using police station safe exchange zones. Never share unnecessary personal information and trust your instincts."
        },
        {
            question: "Can I search for items in specific locations?",
            answer: "Yes! Use our advanced search filters to look for items by location, date lost/found, category, and other criteria. You can also set up alerts for new listings matching your search."
        }
    ];

    return (
        <div className="py-12 bg-base-100">
            <div className="container mx-auto px-4">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-primary">Lost & Found FAQs</h2>
                    <p className="text-lg text-base-content opacity-80 mt-2">
                        Common questions about reporting and recovering lost items
                    </p>
                </div>

                <div className="max-w-3xl mx-auto space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className="collapse collapse-plus bg-base-200 border border-base-300">
                            <input type="radio" name="faq-accordion" />
                            <div className="collapse-title text-xl font-medium text-base-content">
                                {faq.question}
                            </div>
                            <div className="collapse-content">
                                <p className="text-base-content opacity-90">{faq.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-10">
                    <p className="text-base-content opacity-80">
                        Still have questions? {' '}
                        <a href="/contact" className="link link-primary hover:underline">
                            Contact our support team
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default FAQAccordion;