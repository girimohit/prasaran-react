import React from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const HelpSupport = () => {
  const navigate = useNavigate();

  const handleFaqPage = () => {
    navigate('/Faq_page');
  };
  return (
    <div className="min-h-screen bg-gray-100 pt-0">
      {/* Header Section */}
      <div className="flex items-center mb-6 w-full max-w-5xl mx-auto pt-0">
        <IoMdArrowRoundBack
          onClick={() => navigate(-1)}
          className="text-2xl cursor-pointer text-gray-700 hover:text-black ml-0"
        />
        <h1 className="text-2xl font-bold text-center text-gray-800 flex-grow">
          Help & Support
        </h1>
      </div>

      {/* Content Section */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-6">
        {/* Tutorials and Guides */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Tutorials and Guides
          </h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Step-by-step event creation and management.</li>
            <li>How to set up and manage societies and groups.</li>
            <li>Understanding RSVP processes and notifications.</li>
          </ul>
        </div>

        {/* FAQs */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600">
            Explore answers to common queries about Prasaran’s features and functionality.
          </p>
          <button 
            onClick={handleFaqPage}
            className="text-gray-700 font-medium"
            >
              &ensp; FAQ's
          </button>
        </div>

        {/* Chat and Contact Support */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Chat and Contact Support
          </h2>
          <p className="text-gray-600">
            Use our real-time chatbot or submit a ticket for assistance. You can also reach us via:
          </p>
          <ul className="list-disc list-inside text-gray-600 mt-4 space-y-2">
            <li>
              Email:{" "}
              <a href="mailto:support@prasaran.com" className="text-blue-500 underline">
                support@prasaran.com
              </a>
            </li>
            <li>
              Phone:{" "}
              <a href="tel:+1234567890" className="text-blue-500 underline">
                +123 456 7890
              </a>
            </li>
          </ul>
        </div>

        {/* Feedback and Suggestions */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Feedback and Suggestions
          </h2>
          <p className="text-gray-600">
            Share your ideas and report issues to help us improve. Submit feedback through the form in the app.
          </p>
        </div>

        {/* Emergency Assistance */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Emergency Assistance
          </h2>
          <p className="text-gray-600">
            Facing urgent issues like login problems or event cancellations? Contact us directly for immediate help.
          </p>
        </div>

        {/* Video Tutorials */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Video Tutorials
          </h2>
          <p className="text-gray-600">
            Watch our step-by-step guides to make the most of Prasaran’s features.
          </p>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="text-center mt-12 p-6">
        <p className="text-gray-500">
          Need more help? Visit our{" "}
          <a href="/contact" className="text-blue-500 underline">
            Contact Page
          </a>
          .
        </p>
      </footer>
    </div>
  );
};

export default HelpSupport;
