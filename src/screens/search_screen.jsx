import React, { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { AiOutlineSearch, AiOutlineArrowLeft } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const SearchScreen = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [userResults, setUserResults] = useState([]);
    const [societyResults, setSocietyResults] = useState([]);
    
    const navigate = useNavigate();

    // Fetch data from Firestore based on search query
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!searchQuery) {
                    setUserResults([]);
                    setSocietyResults([]);
                    return;
                }

                const lowerCaseQuery = searchQuery.toLowerCase();

                // Fetch users matching search query
                const usersSnapshot = await getDocs(collection(db, 'users'));
                const usersData = usersSnapshot.docs
                    .map(doc => ({
                        id: doc.id,
                        ...doc.data(),
                    }))
                    .filter(user => user.username && user.username.toLowerCase().includes(lowerCaseQuery));

                // Fetch societies matching search query
                const societiesRef = collection(db, 'societies');
                const societiesSnapshot = await getDocs(societiesRef);
                const societiesData = await Promise.all(
                    societiesSnapshot.docs.map(async (societyDoc) => {
                        const mainDocRef = doc(db, `societies/${societyDoc.id}/description/main`);
                        const mainDoc = await getDoc(mainDocRef);
                        return mainDoc.exists() && mainDoc.data().username.toLowerCase().includes(lowerCaseQuery)
                            ? { id: societyDoc.id, ...mainDoc.data() }
                            : null;
                    })
                );

                setUserResults(usersData);
                setSocietyResults(societiesData.filter(society => society !== null));
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchData();
    }, [searchQuery]);

    const handleSearch = (event) => {
        setSearchQuery(event.target.value.toLowerCase());
    };

    return (
        <div className="search-screen bg-gray-100 min-h-screen p-4">
            <div className="search-bar relative flex items-center mb-4">
                <AiOutlineArrowLeft 
                    size={24} 
                    className="absolute left-3 text-gray-500" 
                    onClick={() => navigate("/")}
                />
                <input
                    type="text"
                    placeholder="Search Anything..."
                    value={searchQuery}
                    onChange={handleSearch}
                    className="w-full pl-10 pr-10 p-2 rounded-full border border-gray-300"
                />
                <AiOutlineSearch 
                    size={24} 
                    className="absolute right-3 text-gray-500" 
                />
            </div>


            <div className="results">
                {userResults.map(user => (
                    <div key={user.id} className="flex items-center mb-2">
                        <img
                            src={user.profilePicture || 'default-avatar.png'}
                            alt={`${user.username}'s profile`}
                            className="w-10 h-10 rounded-full mr-3"
                        />
                        <span>{user.username}</span>
                    </div>
                ))}

                {societyResults.map(society => (
                    <div key={society.id} className="flex items-center mb-2">
                        <img
                            src={society.profileImageUrl || 'default-avatar.png'}
                            alt={`${society.username} profile`}
                            className="w-10 h-10 rounded-full mr-3"
                        />
                        <span>{society.username}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchScreen;
