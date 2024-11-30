import React, { useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate, useLocation } from "react-router-dom";
import { db } from "../firebaseConfig"; // Import your Firestore configuration
import { collection, addDoc } from "firebase/firestore";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactQuill from 'react-quill'; // Import Quill for rich text editor
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import DOMPurify from 'dompurify'; // Import DOMPurify for sanitization

const HelpSupport = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const societyData = location.state?.societyData || {}; // Retrieve the entire societyData object
  const [showPopup, setShowPopup] = useState(false);
  const [feedback, setFeedback] = useState("");

  const handleFaqPage = () => {
    navigate('/Faq_page');
  };

  // Helper function to format the feedback as a plain text list
  const formatFeedbackToText = (htmlContent) => {
    // Create a temporary element to parse the HTML
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlContent;
  
    // Find ordered and unordered lists
    const orderedList = tempDiv.querySelectorAll("ol");
    const unorderedList = tempDiv.querySelectorAll("ul");
  
    // Convert ordered list into numbered list (e.g., 1. item, 2. item)
    orderedList.forEach((ol) => {
      let counter = 1;
      ol.querySelectorAll("li").forEach((li) => {
        li.textContent = `${counter}. ${li.textContent}`;
        counter++;
      });
    });
  
    // Convert unordered list into bullet points (e.g., - item)
    unorderedList.forEach((ul) => {
      ul.querySelectorAll("li").forEach((li) => {
        li.textContent = `- ${li.textContent}`;
      });
    });
  
    // Convert <br> tags (line breaks) into new lines in text
    const breaks = tempDiv.querySelectorAll("br");
    breaks.forEach((br) => {
      const lineBreak = document.createElement("span");
      lineBreak.textContent = "\n";
      br.replaceWith(lineBreak);
    });
  
    // Extract the text content from the HTML
    return tempDiv.innerText.trim();
  };
  

  const handleFeedbackSubmit = async () => {
    if (!feedback.trim()) {
      alert("Feedback cannot be empty.");
      return;
    }

    try {
      if (!societyData.username) {
        alert("Username not found. Please try again.");
        return;
      }

      /// Sanitize the feedback to ensure no unsafe content is stored
      const sanitizedFeedback = DOMPurify.sanitize(feedback);

      // Convert HTML to plain text (format list items correctly)
      const formattedFeedback = formatFeedbackToText(sanitizedFeedback);

      // Create a reference to the feedback collection under the user's Firestore document
      const feedbackRef = collection(db, `societies/${societyData.username}/feedback_suggestion`);
      await addDoc(feedbackRef, {
        feedback: formattedFeedback,
        timestamp: new Date(),
      });

      toast.success("Feedback submitted successfully!");
      setShowPopup(false);
      setFeedback("");
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast.error("Failed to submit feedback. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-0">
      {/* Toast Container */}
      <ToastContainer position="top-right" hideProgressBar={true} closeButton={false} autoClose={3000} />
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
          <button 
            onClick={() => setShowPopup(true)}
            className="text-gray-700 font-medium"
            >
              &ensp; Feedback Form
          </button>
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

      {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Feedback Form
            </h2>

            {/* Quill Editor for Feedback */}
            <ReactQuill
              value={feedback}
              onChange={setFeedback}
              modules={{
                toolbar: [
                  [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
                  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                  ['bold', 'italic', 'underline'],
                  ['link'],
                  [{ 'align': [] }],
                  ['clean']
                ],
              }}
              placeholder="Enter your feedback or suggestions here..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
            />

            <div className="flex justify-end mt-4">
              <button
                onClick={() => setShowPopup(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleFeedbackSubmit}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
              >
                Submit Feedback
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HelpSupport;
