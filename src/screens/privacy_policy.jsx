import React from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

const PrivacyPolicy = () => {
    const navigate = useNavigate();
    
  return (
    <div className="pt-0 p-6 min-h-screen font-sans bg-[#DEE2E6] text-gray-800 flex flex-col items-center">
      {/* Heading with Back Icon and Title */}
      <div className="flex items-center mb-6 w-full max-w-2xl">
          <IoMdArrowRoundBack 
            onClick={() => navigate(-1)} 
            className="text-2xl cursor-pointer text-gray-700 hover:text-black ml-0"
          />
          <h1 className="text-2xl font-semibold text-center text-gray-950 flex-grow">Privacy Policy</h1>
      </div>

      <div className="w-full max-w-2xl">
        <p className="text-sm text-gray-600 mb-4">
          <strong>Effective Date:</strong> Nov 1, 2024
          <br />
          <strong>Last Updated:</strong> Oct 25, 2024
        </p>
        <p className="mb-6">
          Prasaran, developed and managed by Team Prasaran, is committed to
          protecting your privacy. This Privacy Policy explains how we collect,
          use, disclose, and safeguard your information when you use our
          platform.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2 text-gray-800">
          1. Information We Collect
        </h2>
        <h3 className="text-lg font-semibold mt-4">a. Personal Information</h3>
        <ul className="list-disc pl-5 mb-4">
          <li>Name, email address, phone number, and other contact details.</li>
          <li>College ID or verification details to confirm eligibility.</li>
        </ul>
        <h3 className="text-lg font-semibold">b. Usage Data</h3>
        <ul className="list-disc pl-5 mb-4">
          <li>Event participation, messages, and activity logs.</li>
          <li>Search preferences, RSVP history, and engagement metrics.</li>
        </ul>
        <h3 className="text-lg font-semibold">c. Device Information</h3>
        <ul className="list-disc pl-5 mb-4">
          <li>
            Information about your device, such as operating system, browser
            type, and hardware specifications.
          </li>
          <li>Location data (if enabled) for event recommendations and check-ins.</li>
        </ul>
        <h3 className="text-lg font-semibold">d. Media</h3>
        <ul className="list-disc pl-5 mb-4">
          <li>Photos, documents, and other files uploaded during events or within societies/groups.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-2 text-gray-800">
          2. How We Use Your Information
        </h2>
        <ul className="list-disc pl-5 mb-4">
          <li>Provide and improve the functionality of Prasaran, including event management, messaging, and notifications.</li>
          <li>Facilitate networking and team formation among users.</li>
          <li>Maintain security, including secure logins and encrypted communication.</li>
          <li>Comply with legal and institutional policies.</li>
          <li>Personalize the user experience, such as tailoring event suggestions and notifications.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-2 text-gray-800">
          3. Data Sharing and Disclosure
        </h2>
        <p className="mb-4">
          We do not sell your personal information. However, we may share your
          information in the following scenarios:
        </p>
        <ul className="list-disc pl-5 mb-4">
          <li>
            <strong>With Event Organizers:</strong> For RSVP management and participant lists.
          </li>
          <li>
            <strong>With Your Consent:</strong> When explicitly authorized by you.
          </li>
          <li>
            <strong>With Colleges:</strong> To ensure compliance with institutional policies and verification.
          </li>
          <li>
            <strong>For Legal Reasons:</strong> To comply with applicable laws or enforceable governmental requests.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-2 text-gray-800">
          4. Data Security
        </h2>
        <ul className="list-disc pl-5 mb-4">
          <li>End-to-end encryption for communications using SSL/TLS.</li>
          <li>OAuth 2.0 for secure authentication.</li>
          <li>Role-based access controls to limit sensitive data visibility.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-2 text-gray-800">
          5. Data Retention
        </h2>
        <p className="mb-4">
          We retain your data only for as long as necessary for the purposes
          outlined in this policy. Upon account deletion or inactivity, your
          personal data will be securely deleted after [Insert Retention Period].
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2 text-gray-800">
          6. Your Rights
        </h2>
        <ul className="list-disc pl-5 mb-4">
          <li>
            <strong>Access and Rectification:</strong> View and correct your personal information.
          </li>
          <li>
            <strong>Data Portability:</strong> Request a copy of your data.
          </li>
          <li>
            <strong>Data Deletion:</strong> Delete your account and associated data.
          </li>
          <li>
            <strong>Opt-Out:</strong> Customize or disable notifications and data sharing options.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-2 text-gray-800">
          7. Third-Party Services
        </h2>
        <p className="mb-4">
          Prasaran may integrate with third-party tools, such as:
        </p>
        <ul className="list-disc pl-5 mb-4">
          <li>Firebase for real-time notifications.</li>
          <li>Google Calendar for scheduling.</li>
          <li>Maps APIs for event location services.</li>
        </ul>
        <p>These services operate under their respective privacy policies.</p>

        <h2 className="text-2xl font-semibold mt-6 mb-2 text-gray-800">
          8. Children's Privacy
        </h2>
        <p className="mb-4">
          Prasaran is intended for users affiliated with verified educational
          institutions. We do not knowingly collect data from minors without
          consent from their guardians.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2 text-gray-800">
          9. Updates to this Policy
        </h2>
        <p className="mb-4">
          We may update this Privacy Policy periodically. Users will be notified
          of significant changes through in-app alerts or emails.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2 text-gray-800">
          10. Contact Us
        </h2>
        <p className="mb-4">
          For questions or concerns regarding this Privacy Policy, contact us at:
        </p>
        <ul className="list-disc pl-5 mb-4">
          <li>
            <strong>Email:</strong> contact-prasaran@gmail.com
          </li>
          <li>
            <strong>Phone:</strong> +91 9856231478
          </li>
        </ul>
      </div>
      
    </div>
  );
};

export default PrivacyPolicy;
