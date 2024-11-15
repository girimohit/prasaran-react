import React, { useState, useEffect, useRef } from 'react';
import { IoBookmarkOutline, IoBookmark, IoWarning } from "react-icons/io5";
import { FiMoreVertical } from 'react-icons/fi';
import { FaThumbsUp, FaComment } from 'react-icons/fa';
import { db } from '../firebaseConfig';
import { doc, setDoc, getDoc, deleteDoc, collection, getDocs } from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// User Images array for Friends/Society Cards
const userImages = [
  {
    id: 1,
    imageUrl: 'https://firebasestorage.googleapis.com/v0/b/prasaran-init.appspot.com/o/dp1.avif?alt=media&token=0bc89db7-75d1-401c-bfda-9220b5e75ce9',
  },
  {
    id: 2,
    imageUrl: 'https://firebasestorage.googleapis.com/v0/b/prasaran-init.appspot.com/o/dp2.jpeg?alt=media&token=e13c5802-2ea0-4eaf-985f-b7fb08f6af66',
  },
  {
    id: 3,
    imageUrl: 'https://firebasestorage.googleapis.com/v0/b/prasaran-init.appspot.com/o/dp5.jpg?alt=media&token=4a0d5d27-0ee3-4a68-8d1e-e5a8c5eb18be',
  },
  {
    id: 4,
    imageUrl: 'https://firebasestorage.googleapis.com/v0/b/prasaran-init.appspot.com/o/dp3.jpg?alt=media&token=ab3fcb11-4c95-49d3-b12a-46e95f3060f0',
  },
  {
    id: 5,
    imageUrl: 'https://firebasestorage.googleapis.com/v0/b/prasaran-init.appspot.com/o/dp2.jpeg?alt=media&token=e13c5802-2ea0-4eaf-985f-b7fb08f6af66',
  },
  {
    id: 6,
    imageUrl: 'https://firebasestorage.googleapis.com/v0/b/prasaran-init.appspot.com/o/dp5.jpg?alt=media&token=4a0d5d27-0ee3-4a68-8d1e-e5a8c5eb18be',
  },
  {
    id: 7,
    imageUrl: 'https://firebasestorage.googleapis.com/v0/b/prasaran-init.appspot.com/o/dp4.jpg?alt=media&token=00a45ec3-0b74-4832-bab6-8743b089771e',
  },
  {
    id: 8,
    imageUrl: 'https://firebasestorage.googleapis.com/v0/b/prasaran-init.appspot.com/o/dp1.avif?alt=media&token=0bc89db7-75d1-401c-bfda-9220b5e75ce9',
  },
];

const HomeScreen = () => {
  // Set `societyId` to a placeholder or fetch it dynamically as needed
  const societyId = 'gdg_dsc';

  // State for society data
  const [societyData, setSocietyData] = useState({
    profileImageUrl: '',
    username: '',
    societyDescription: '',
  });
  const [posts, setPosts] = useState([]); // State to hold fetched posts
  const [menuOpen, setMenuOpen] = useState(null); // State to track which post's menu is open
  const [savedPosts, setSavedPosts] = useState([]); // Track saved posts
  const menuRef = useRef(null); // Ref to track the meatball menu

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

    const fetchPosts = async () => {
      try {
        const postsCollectionRef = collection(db, `societies/${societyId}/post`);
        const querySnapshot = await getDocs(postsCollectionRef);
    
        // Filter and map through each post document and get its data
        const postsData = querySnapshot.docs
          .map((postDoc) => {
            const postData = postDoc.data();
            // Ensure both date and time are present
            if (postData.date && postData.time) {
              return {
                id: postDoc.id,
                ...postData, // Includes fields like 'caption', 'images', 'date', and 'time'
              };
            }
            return null; // Return null for posts that don't meet criteria
          })
          .filter((post) => post !== null); // Filter out null values
    
        setPosts(postsData);
      } catch (error) {
        console.error("Error fetching posts and images: ", error);
      }
    }; 
    
    const fetchSavedPosts = async () => {
      const savedCollectionRef = collection(db, `societies/${societyId}/saved_posts`);
      const querySnapshot = await getDocs(savedCollectionRef);
      const savedPostsData = querySnapshot.docs.map((doc) => doc.id);
      setSavedPosts(savedPostsData);
    };

    fetchSocietyData();
    fetchPosts();
    fetchSavedPosts();
  }, [societyId]);

  const toggleSavePost = async (postId, post) => {
    const savedRef = doc(db, `societies/${societyId}/saved_posts`, postId);
    if (savedPosts.includes(postId)) {
        await deleteDoc(savedRef);
        setSavedPosts(savedPosts.filter((id) => id !== postId));
    } else {
        await setDoc(savedRef, { ...post, username: societyData.username });
        setSavedPosts([...savedPosts, postId]);
    }
  };

  const handleReportPost = async (postId, post) => {
    const reportRef = doc(db, `report/soc_post/${societyId}`, postId);

    try {
      const reportDoc = await getDoc(reportRef);

      if (reportDoc.exists()) {
        const currentData = reportDoc.data();
        await setDoc(reportRef, {
          ...currentData,
          reportCount: (currentData.reportCount || 0) + 1,
        });
      } else {
        await setDoc(reportRef, {
          ...post,
          reportCount: 1,
          reportedAt: new Date().toISOString(),
        });
      }

      toast("Post reported successfully."); // Display success notification
    } catch (error) {
      console.error('Error reporting post:', error);
      toast.error("Failed to report the post. Please try again."); // Display error notification
    }
  };
  
  // Handle click outside the menu to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

    return (
      <div className="min-h-screen bg-[#DEE2E6] flex flex-col items-center">
        {/* Toast Container */}
        <ToastContainer position="top-right" hideProgressBar={true} closeButton={false} autoClose={3000} />
        {/* Friends/Society Cards */}
        <div className="overflow-x-hidden bg-black mt-0 py-10">
          <div className="flex space-x-6 overflow-x-auto w-screen px-4 scrollbar-hide">
            {userImages.map((user) => (
              <div
                key={user.id}
                className="w-24 h-28 sm:w-28 sm:h-28 rounded-xl bg-gray-400 shadow-md flex-shrink-0"
              >
                <img
                  src={user.imageUrl}
                  alt={`User ${user.id}`}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Post Sections - Dynamically Generated */}
        <div className="p-6">
          {posts.map((post) => (
            <div key={post.id} className="my-8 bg-[#F8F8FF] rounded-2xl p-2">
              {/* Post details */}
              <div className="flex items-center space-x-4 bg-[#F8F8FF] pl-2 py-2">
                <img
                  className="w-10 h-10 rounded-full"
                  src={societyData.profileImageUrl || "https://via.placeholder.com/100"}
                  alt="profile"
                />
                <div>
                  <h2 className="text-sm font-semibold">
                    {societyData.username || "Society Name"}
                  </h2>
                  {/* <p className="text-xs text-gray-500">{post.content}</p> */}
                </div>
                {/* Meatball Menu Button */}
                <button
                  onClick={() => setMenuOpen(menuOpen === post.id ? null : post.id)}
                  className="text-xl text-gray-700 focus:outline-none absolute right-12"
                >
                  <FiMoreVertical />
                </button>
              </div>

              {/* Meatball Menu Options */}
              {menuOpen === post.id && (
                  <div ref={menuRef} className="absolute right-6 bg-white shadow-lg rounded-lg z-50">
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent click event propagation
                        handleReportPost(post.id, post);
                      }}
                      className="flex items-center p-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    >
                      <IoWarning className="mr-2" /> {/* Report Icon */}
                      Report
                    </button>
                    {/* <button
                      onClick={() => handleReportPost(post.id, post.images)}
                      className="flex items-center p-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    >
                      <IoTrash className="mr-2" />
                      Delete
                    </button> */}
                  </div>
                )}

              {/* Display each image in the images array */}
              <div className="px-2">
                {post.images && post.images.map((image, index) => (
                  <img
                    key={index}
                    className="w-full rounded-2xl object-cover aspect-video mb-2"
                    src={image}
                    alt={`Post Images ${index + 1}`}
                  />
                ))}
              </div>

              {/* Caption */}
              <div className="text-sm text-gray-700 mb-0 pl-2">
                {post.caption}
              </div>
              
              {/* Likes and Comments Section */}
              <div className="flex items-center justify-between p-2 m-2">
                {/* Likes and Comments Section */}
                <div className="flex items-center bg-[#DEE2E6] p-2 rounded-lg w-3/4 space-x-8">
                  <div className="flex items-center space-x-1">
                    <FaThumbsUp className="text-blue-500" />
                    <span className="text-sm">{post.likes} Likes</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <FaComment className="text-gray-600" />
                    <span className="text-sm">{post.comments} Comments</span>
                  </div>
                </div>

                {/* Bookmark Icon - Aligned 1/4th to the right */}
                <div className="w-1/4 flex justify-end">
                  {/* Bookmark Icon */}
                  <button onClick={() => toggleSavePost(post.id, post)}>
                    {savedPosts.includes(post.id) ? (
                      <IoBookmark className="text-gray-600" />
                    ) : (
                      <IoBookmarkOutline className="text-gray-500" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
    )
  }
  export default HomeScreen