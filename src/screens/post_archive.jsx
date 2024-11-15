import React, { useState, useEffect, useRef } from 'react';
import { IoMdArrowRoundBack } from "react-icons/io";
import { IoTrash, IoReturnUpBack } from "react-icons/io5";
import { db, storage } from '../firebaseConfig';
import { FiMoreVertical } from 'react-icons/fi';
import { useNavigate, useLocation } from 'react-router-dom';
import { doc, setDoc, deleteDoc, collection, getDocs } from 'firebase/firestore';
import { deleteObject, listAll, ref } from 'firebase/storage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ArchivePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { societyData } = location.state || {};
  const [archivedPosts, setArchivedPosts] = useState([]);

  const [menuOpen, setMenuOpen] = useState(null); // State to track which post's menu is open
  const menuRef = useRef(null); // Ref to track the meatball menu

  useEffect(() => {
    if (!societyData || !societyData.username) {
      console.error("No society data found.");
      return;
    }

    const fetchArchivedPosts = async () => {
      try {
        const archiveCollectionRef = collection(db, `societies/${societyData.username}/archive`);
        const querySnapshot = await getDocs(archiveCollectionRef);

        const archivedPostsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setArchivedPosts(archivedPostsData);
      } catch (error) {
        console.error("Error fetching archived posts: ", error);
      }
    };

    fetchArchivedPosts();
  }, [societyData]);

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

  const handleToggleMenu = (postId) => {
    // Toggle the menu for the specific post
    setMenuOpen(menuOpen === postId ? null : postId);
  };

  // Add restore and delete functions
  const handleRestorePost = async (postId, post) => {
    try {
      // Move post back to main collection
      const postRef = doc(db, `societies/${societyData.username}/post`, postId);
      await setDoc(postRef, post);

      // Delete from archive
      await deleteDoc(doc(db, `societies/${societyData.username}/archive`, postId));

      // Update state to reflect changes
      setArchivedPosts((prevPosts) => prevPosts.filter((p) => p.id !== postId));
      toast.success("Restored archived post")
    } catch (error) {
      console.error("Error restoring post: ", error);
      toast.error("Error restoring archived post")
    }
  };

  const handleDeleteArchivedPost = async (postId) => {
    try {
      // Delete post from Firestore archive collection
      await deleteDoc(doc(db, `societies/${societyData.username}/archive`, postId));

      // Step 2: Delete the folder from Firebase Storage
      const storageFolderRef = ref(storage, `societies/${societyData.username}/${postId}/images`);
      
      // List all files in the folder
      const folderContents = await listAll(storageFolderRef);

      // Delete each file in the folder
      const deletePromises = folderContents.items.map((fileRef) => deleteObject(fileRef));
      await Promise.all(deletePromises);

      // Update state to reflect deletion
      setArchivedPosts((prevPosts) => prevPosts.filter((p) => p.id !== postId));
      toast.warning("Archived Post Deleted")
    } catch (error) {
      console.error("Error deleting archived post: ", error);
      toast.error("Error deleting archived post")
    }
  };

  return (
    <div className="min-h-screen bg-[#DEE2E6] flex flex-col items-center">
      {/* Toast Container */}
      <ToastContainer position="top-right" hideProgressBar={true} closeButton={false} autoClose={3000} />
      {/* Back Button */}
      <IoMdArrowRoundBack
        onClick={() => navigate('/soc_setting', { state: { societyData } })}
        className="text-2xl cursor-pointer absolute top-2 left-2 text-gray-700 hover:text-black"
      />

      <h1 className="text-2xl font-semibold my-1">Archived Posts</h1>

      <div className="p-6">
        {archivedPosts.map((post) => (
          <div key={post.id} className="my-4 bg-[#F8F8FF] rounded-2xl p-2">
            <div className="flex items-center space-x-4 bg-[#F8F8FF] pl-2 py-2">
              <img
                className="w-10 h-10 rounded-full"
                src={post.profileImageUrl || societyData.profileImageUrl || "https://via.placeholder.com/100"}
                alt="profile"
              />
              <div>
                <h2 className="text-sm font-semibold">
                  {post.username || societyData.username || "Archived Post"}
                </h2>
              </div>
              {/* Meatball Menu Button */}
              <button
                onClick={() => handleToggleMenu(post.id)} // Toggle menu on click
                className="text-xl text-gray-700 focus:outline-none absolute right-12"
              >
                <FiMoreVertical />
              </button>
            </div>

            {/* Meatball Menu Options */}
            {menuOpen === post.id && (
              <div ref={menuRef} className="absolute right-6 bg-white shadow-lg rounded-lg z-50">
                <button
                  onClick={() => handleRestorePost(post.id, post)}
                  className="flex items-center p-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  <IoReturnUpBack className="mr-2" /> {/* Archive Icon */}
                  Restore
                </button>
                <button
                  onClick={() => handleDeleteArchivedPost(post.id, post.images)}
                  className="flex items-center p-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  <IoTrash className="mr-2" /> {/* Trash Icon */}
                  Delete
                </button>
              </div>
            )}

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

            <div className="text-sm text-gray-700 mb-0 pl-2">
              {post.caption}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArchivePage;
