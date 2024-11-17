import React, { useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const FaqPage = () => {
  const navigate = useNavigate();
  const [activeQuestion, setActiveQuestion] = useState(null);

  // List of FAQs
  const faqs = [
    {
      question: "What is Prasaran?",
      answer:
        "Prasaran is a platform designed to enhance campus engagement by integrating event management, student networking, and real-time updates into one unified system.",
    },
    {
      question: "Who can use Prasaran?",
      answer:
        "Prasaran is intended for students, society leaders, teachers, and college administrators associated with verified educational institutions.",
    },
    {
      question: "How do I create an account on Prasaran?",
      answer:
        "Users can register on the platform by providing a verified college ID and other necessary details during the signup process.",
    },
    {
      question: "How can I create an event?",
      answer:
        "Society leaders and authorized users can create events by navigating to the 'Create Event' section, filling in details like title, description, date, time, and venue, and then publishing it.",
    },
    {
      question: "Is my data secure on Prasaran?",
      answer:
        "Yes, Prasaran uses end-to-end encryption, OAuth 2.0 for authentication, and complies with data privacy regulations like GDPR.",
    },
    {
      question: "How can I RSVP to an event?",
      answer:
        "Search for the event in the 'Event Discovery' section and click the RSVP button to confirm your participation.",
    },
    {
      question: "What happens if I miss the RSVP deadline?",
      answer:
        "Once the RSVP deadline has passed, registrations are closed, and you cannot RSVP to the event.",
    },
    {
      question: "Can I edit or cancel an event after creating it?",
      answer:
        "Yes, authorized users can modify or cancel events. However, users must provide a valid reason for cancellation, and notifications will be sent to participants.",
    },
    {
      question: "What should I do if I forget my password?",
      answer:
        "Use the 'Forgot Password' option on the login screen to reset your password via an email verification process.",
    },
    {
      question: "How do I create a society?",
      answer:
        "A society can be created by an admin by navigating to the 'Create Society' page, adding a description, and including at least five members.",
    },
    {
      question: "Can I join multiple societies?",
      answer:
        "Yes, students can join multiple societies based on their interests and society membership criteria.",
    },
    {
      question: "How can I connect with other users?",
      answer:
        "Use the 'Search Friends' feature to find users based on their interests, skills, or usernames. You can then send them a connection request.",
    },
    {
      question: "Can I chat with other users?",
      answer:
        "Yes, you can communicate with connected users or society members through one-on-one or group chats.",
    },
    {
      question: "How do I contact support if I face issues?",
      answer:
        "Visit the 'Help & Support' section in the app for troubleshooting guides, FAQs, or contact support via email or phone.",
    },
    {
      question: "Are messages secure?",
      answer:
        "Yes, all messages are encrypted using SSL/TLS protocols to ensure data security.",
    },
    {
      question: "Is my data secure on Prasaran?",
      answer:
        "Yes, Prasaran uses end-to-end encryption, OAuth 2.0 for authentication, and complies with data privacy regulations like GDPR.",
    },
    {
      question: "What happens to my data if I delete my account?",
      answer:
        "Upon account deletion, your personal data will be securely erased after a defined retention period, as per privacy policies.",
    },
    {
      question: "Does Prasaran work without the internet?",
      answer:
        "No, Prasaran requires an active internet connection for real-time features like notifications, messaging, and event updates.",
    },
    {
      question: "What should I do if I face issues with the app?",
      answer:
        "Visit the 'Help & Support' section in the app for troubleshooting guides, FAQs, or contact support via email or phone.",
    },
    {
      question: "How can I report a bug or give feedback?",
      answer:
        "Use the feedback form available in the app to report issues or suggest improvements.",
    },
    {
      question: "Is there a way to learn more about using Prasaran?",
      answer:
        "Yes, you can access tutorials, user manuals, and video guides in the 'Help & Support' section of the app.",
    },
  ];

  // Handle question click
  const handleQuestionClick = (index) => {
    setActiveQuestion(activeQuestion === index ? null : index);
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
          Frequently Asked Questions
        </h1>
      </div>

      {/* FAQ Section */}
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">FAQs</h2>
        {faqs.map((faq, index) => (
          <div key={index} className="mb-4 border-b border-gray-200 pb-4">
            {/* Question */}
            <button
              onClick={() => handleQuestionClick(index)}
              className="text-left w-full text-gray-800 font-medium text-lg focus:outline-none flex justify-between items-center"
            >
              <span>{faq.question}</span>
              <span className="text-gray-800">
                {activeQuestion === index ? "-" : "+"}
              </span>
            </button>
            {/* Answer */}
            {activeQuestion === index && (
              <p className="mt-2 text-gray-600">{faq.answer}</p>
            )}
          </div>
        ))}
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

export default FaqPage;
