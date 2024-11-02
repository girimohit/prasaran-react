import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { IoMdArrowRoundBack } from "react-icons/io";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { db } from "../firebaseConfig";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";

const EditPost = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { galleryImages, username, postId } = location.state || {};

  const [caption, setCaption] = useState("");

  // Handle the Post button action
  const handlePost = async () => {
    try {
      // Prepare image URLs for Firestore
      // const imageUrls = galleryImages.map((image) => image.url);

      // Get current date and time
      const currentDate = new Date();
      const date = currentDate.toLocaleDateString(); // e.g., "MM/DD/YYYY"
      const time = currentDate.toLocaleTimeString(); // e.g., "HH:MM:SS AM/PM"

      // Save data to Firestore under societies/{username}/post/{post_id}/main
      await setDoc(doc(db, `societies/${username}/post/${postId}`), {
        caption,
        timestamp: serverTimestamp(), // Automatically set server time
        date, // Store date as a readable string
        time, // Store time as a readable string
      });

      console.log("Post saved successfully!");

      // Redirect to the social page
      navigate("/soc_page");
    } catch (error) {
      console.error("Error saving post:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#DEE2E6] text-gray-700 flex flex-col items-center relative px-4 pt-8">
      <IoMdArrowRoundBack  
        onClick={() => navigate('/create-post')}
        className="text-2xl cursor-pointer absolute top-2 left-2 text-gray-700 hover:text-black"
      />

      <h1 className="text-xl font-bold mb-4 absolute top-2 left-1/2 transform -translate-x-1/2">
        Edit Post
      </h1>

      <div className="w-full max-w-3xl aspect-video bg-gray-800 rounded-lg overflow-hidden mb-4 mt-4">
        {galleryImages && galleryImages.length > 0 ? (
          <Swiper
            spaceBetween={10}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            modules={[Navigation, Pagination]}
            className="w-full h-full"
          >
            {galleryImages.map((image, index) => (
              <SwiperSlide key={index}>
                <img
                  src={image.url}
                  alt={`Slide ${index}`}
                  className="w-full h-full object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <p className="text-center text-gray-400 py-8">No images available</p>
        )}
      </div>

      <textarea
        className="w-full max-w-3xl p-4 rounded-lg border border-gray-300 mb-4"
        placeholder="Add a caption..."
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />

      <div className="flex space-x-4 mb-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
          Tag People
        </button>
        <button className="bg-green-500 text-white px-4 py-2 rounded-lg">
          Add Link
        </button>
      </div>

      <div className="fixed bottom-10 right-10">
        <button
          className="bg-gray-700 text-white px-6 py-2 rounded-lg mt-4 cursor-pointer"
          onClick={handlePost}
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default EditPost;
