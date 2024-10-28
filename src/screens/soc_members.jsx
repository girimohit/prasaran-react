import React, { useEffect, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { AiOutlineSearch } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { db } from '../firebaseConfig'; // import your firebase configuration
import { doc, getDoc } from "firebase/firestore";

const SocMembers = () => {
    const navigate = useNavigate();
    const [members, setMembers] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const docRef = doc(db, 'societies', '180 Degrees Consulting '); // Update to your document ID
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    const fetchedMembers = (data.positions || []).map((role) => ({
                        name: "Member Name", // Replace with actual name if available in the database
                        role: role,
                        status: "Connect" // Or any other status you want to assign dynamically
                    }));
                    setMembers(fetchedMembers);
                } else {
                    console.log("No such document!");
                }
            } catch (error) {
                console.error("Error fetching society positions:", error);
            }
        };

        fetchMembers();
    }, []);

    // Filter members based on search query
    const filteredMembers = members.filter((member) =>
        member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.role.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="bg-gray-100 h-screen p-4">
            <div className="flex items-center justify-center mb-4 relative">
                <IoMdArrowRoundBack
                    className="text-2xl absolute left-0 cursor-pointer"
                    onClick={() => navigate(-1)}
                />
                <h1 className="text-xl font-semibold">Members</h1>
            </div>

            <div className="relative mb-6">
                <input
                    type="text"
                    placeholder="Search Members..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none"
                />
                <AiOutlineSearch className="absolute right-4 top-2.5 h-5 w-5 text-gray-400" />
            </div>

            <div>
                {filteredMembers.map((member, index) => (
                    <div
                        key={index}
                        className="flex items-center justify-between py-2 px-3 mb-2 bg-white rounded-lg shadow-sm"
                    >
                        <div className="flex items-center">
                            <img
                                src={`https://i.pravatar.cc/150?img=${index + 1}`}
                                alt={member.name}
                                className="w-12 h-12 rounded-full mr-4"
                            />
                            <div>
                                <p className="text-sm font-medium">{member.name}</p>
                                <p className="text-xs text-gray-500">{member.role}</p>
                            </div>
                        </div>
                        <button
                            className={`text-xs font-semibold py-1 px-3 rounded-full ${
                                member.status === "Message"
                                    ? "bg-purple-100 text-purple-600"
                                    : "bg-gray-200 text-gray-600"
                            }`}
                        >
                            {member.status}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SocMembers;
