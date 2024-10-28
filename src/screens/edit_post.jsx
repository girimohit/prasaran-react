import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react"; // Import Swiper and SwiperSlide
import { Navigation, Pagination } from "swiper/modules"; // Correct imports for Swiper modules
import "swiper/css"; // Core Swiper CSS
import "swiper/css/navigation"; // For Navigation arrows
import "swiper/css/pagination"; // For Pagination dots

const EditPost = () => {
  const location = useLocation();
  const { galleryImages } = location.state || {}; // Get galleryImages from CreatePost

  const [caption, setCaption] = useState("");

  // Handle the Post button action
  const handlePost = () => {
    console.log("Post with caption:", caption, "and images:", galleryImages);
    // Add logic for uploading post to the database (Firebase, etc.)
  };

  return (
    <div className="min-h-screen bg-[#DEE2E6] text-gray-700 flex flex-col items-center relative px-4 pt-8">
      <h1 className="text-xl font-bold mb-4">Edit Post</h1>

      {/* Carousel of All Images */}
      <div className="w-full max-w-3xl aspect-video bg-gray-800 rounded-lg overflow-hidden mb-4">
        {galleryImages && galleryImages.length > 0 ? (
          <Swiper
            spaceBetween={10}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            modules={[Navigation, Pagination]} // Enable navigation and pagination
            className="w-full h-full"
          >
            {galleryImages.map((image, index) => (
              <SwiperSlide key={index}>
                <img
                  src={image.url} // Use the URL for Firebase-uploaded images
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

      {/* Caption Input */}
      <textarea
        className="w-full max-w-3xl p-4 rounded-lg border border-gray-300 mb-4"
        placeholder="Add a caption..."
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />

      {/* Buttons for Tagging People and Adding Links */}
      <div className="flex space-x-4 mb-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
          Tag People
        </button>
        <button className="bg-green-500 text-white px-4 py-2 rounded-lg">
          Add Link
        </button>
      </div>

      {/* "Post" Button at the Bottom */}
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
