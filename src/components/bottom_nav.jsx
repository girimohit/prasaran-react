import React, {useState, useEffect} from 'react';
import { GoHome } from "react-icons/go";
import { RiChat3Line } from "react-icons/ri";
import { MdOutlinePostAdd, MdAccountCircle, MdOutlineSearch } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import { db } from '../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

const BottomNavBar = () => {
  const navigate = useNavigate();  // Initialize the useNavigate hook

  // Set `societyId` to a placeholder or fetch it dynamically as needed
  const societyId = 'gdg_dsc';

  // State for society data
  const [societyData, setSocietyData] = useState({
    profileImageUrl: '',
    username: '',
    societyDescription: '',
  });

  // Fetch society data on component mount
  useEffect(() => {
    const fetchSocietyData = async () => {
      try {
        // Adjusted path to use the nested Firestore structure
        const docRef = doc(db, `societies/${societyId}/description`, 'main');
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setSocietyData(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching society data: ", error);
      }
    };
    fetchSocietyData();
  }, [societyId]);

  const handleCreate_PostButtonClick = () => {
    const postId = `post_${Date.now()}`; // Generate a unique post ID based on timestamp
    navigate('/create-post', { state: { username: societyData.username, postId } }); // Pass username and postId
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white shadow-lg">
      <ul className="flex justify-around items-center py-4 bg-white rounded-t-2xl">
        <li>
          <NavLink
            exact
            to="/"
            activeClassName="text-blue-500"
            className="flex flex-col items-center text-gray-500 hover:text-blue-500"
          >
            <GoHome size={24} />
            {/* <span className="text-xs">Explore</span> */}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/search_screen"
            activeClassName="text-blue-500"
            className="flex flex-col items-center text-gray-500 hover:text-blue-500"
          >
            <MdOutlineSearch size={24} />
            {/* <span className="text-xs">Chat</span> */}
          </NavLink>
        </li>
        <li>
        <button
            onClick={handleCreate_PostButtonClick} // Use onClick to trigger navigation
            className="flex flex-col items-center text-gray-500 hover:text-blue-500"
          >
            <MdOutlinePostAdd size={24} />
            {/* <span className="text-xs">Post</span> */}
          </button>
        </li>
        <li>
          <NavLink
            to="/chat_screen"
            activeClassName="text-blue-500"
            className="flex flex-col items-center text-gray-500 hover:text-blue-500"
          >
            <RiChat3Line size={24} />
            {/* <span className="text-xs">Post</span> */}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/soc_page"
            activeClassName="text-blue-500"
            className="flex flex-col items-center text-gray-500 hover:text-blue-500"
          >
            <MdAccountCircle size={24}/>
            {/* <span className="text-xs">Updates</span> */}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default BottomNavBar;
