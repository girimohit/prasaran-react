import React, { useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { AiOutlineSearch } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const members = [
  { name: "Smith Mathew", status: "Message" },
  { name: "Smith Mathew", status: "Message" },
  { name: "Merry An.", status: "Connect" },
  { name: "John Walton", status: "Connect" },
  { name: "Monica Randawa", status: "Message" },
  { name: "InnoXent Jay", status: "Connect" },
  { name: "Harry Samit", status: "Message" },
  { name: "Jonnas Autron", status: "Message" },
];

const SocFollowers = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  // Filter followers based on the search query
  const filteredMembers = members.filter((follower) =>
    follower.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-gray-100 h-screen p-4">
      <div className="flex items-center justify-center mb-4 relative">
        <IoMdArrowRoundBack
          className="text-2xl absolute left-0 cursor-pointer"
          onClick={() => navigate(-1)}
        />
        <h1 className="text-xl font-semibold">Followers</h1>
      </div>
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search Followers..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none"
        />
        <AiOutlineSearch className="absolute right-4 top-2.5 h-5 w-5 text-gray-400" />
      </div>
      <div>
        {filteredMembers.map((follower, index) => (
          <div
            key={index}
            className="flex items-center justify-between py-2 px-3 mb-2 bg-white rounded-lg shadow-sm"
          >
            <div className="flex items-center">
              <img
                src={`https://i.pravatar.cc/150?img=${index + 1}`}
                alt={follower.name}
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <p className="text-sm font-medium">{follower.name}</p>
              </div>
            </div>
            <button
              className={`text-xs font-semibold py-1 px-3 rounded-full ${
                follower.status === "Message"
                  ? "bg-purple-100 text-purple-600"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {follower.status}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SocFollowers;
