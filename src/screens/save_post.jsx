// save_post.jsx
import React, { useState, useEffect } from 'react';
import { IoMdArrowRoundBack } from "react-icons/io";
import { IoBookmark } from "react-icons/io5";
import { FaThumbsUp, FaComment } from "react-icons/fa";
import { db } from '../firebaseConfig';
import { useNavigate, useLocation } from 'react-router-dom';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SavePostPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [savedPosts, setSavedPosts] = useState([]);
  const { societyData } = location.state || {};
  
  useEffect(() => {
    const fetchSavedPosts = async () => {
      if (!societyData || !societyData.username) {
        console.error("No society data found.");
        return;
      }

      try {
        const savedCollectionRef = collection(db, `societies/${societyData.username}/saved_posts`);
        const querySnapshot = await getDocs(savedCollectionRef);
        const savedPostsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setSavedPosts(savedPostsData);
      } catch (error) {
        console.error("Error fetching saved posts: ", error);
      }
    };
    
    fetchSavedPosts();
  }, [societyData]);

  const handleUnsavePost = async (postId) => {
    try {
      await deleteDoc(doc(db, `societies/${societyData.username}/saved_posts`, postId));
      setSavedPosts(savedPosts.filter((post) => post.id !== postId));
      toast.info("Post unsaved");
    } catch (error) {
      console.error("Error unsaving post: ", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#DEE2E6] flex flex-col items-center">
      {/* Toast Container */}
      <ToastContainer position="top-right" hideProgressBar={true} closeButton={false} autoClose={3000} />
      <IoMdArrowRoundBack 
      onClick={() => navigate(-1)} 
      className="text-2xl cursor-pointer absolute top-2 left-2 text-gray-700 hover:text-black" 
      />
      <h1 className="text-2xl font-semibold my-1">Saved Posts</h1>

      <div className="p-6">
        {savedPosts.length === 0 ? (
          <p>No saved posts available.</p>
        ) : (
          savedPosts.map((post) => (
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
                </div>
              </div>

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
                {/* Unsave Button */}
                <button onClick={() => handleUnsavePost(post.id)} className="text-xl text-gray-700 focus:outline-none absolute right-12">
                  <IoBookmark className="text-gray-600" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SavePostPage;
