import React from 'react';
import { FiEdit } from 'react-icons/fi';
import { FaThumbsUp, FaComment } from "react-icons/fa";
import { FiPlus } from 'react-icons/fi';

// Posts array
const posts = [
  {
    id: 1,
    profilePic: 'https://firebasestorage.googleapis.com/v0/b/prasaran-init.appspot.com/o/gdg.png?alt=media&token=8d0e7d3f-f59b-4baf-91d6-49b5a3cd4b69',
    accountName: 'GDG DSC',
    postImage: 'https://firebasestorage.googleapis.com/v0/b/prasaran-init.appspot.com/o/event_img.png?alt=media&token=e7eb6803-b7f9-4a9b-bb21-1b75c060f523',
    caption: 'Caption here for post ...',
    likes: 500,
    comments: 154,
  },
  {
    id: 2,
    profilePic: 'https://firebasestorage.googleapis.com/v0/b/prasaran-init.appspot.com/o/gdg.png?alt=media&token=8d0e7d3f-f59b-4baf-91d6-49b5a3cd4b69',
    accountName: 'GDG DSC',
    postImage: 'https://firebasestorage.googleapis.com/v0/b/prasaran-init.appspot.com/o/event_img.png?alt=media&token=e7eb6803-b7f9-4a9b-bb21-1b75c060f523',
    caption: 'Caption here for post ...',
    likes: 450,
    comments: 120,
  },
  {
    id: 3,
    profilePic: 'https://firebasestorage.googleapis.com/v0/b/prasaran-init.appspot.com/o/gdg.png?alt=media&token=8d0e7d3f-f59b-4baf-91d6-49b5a3cd4b69',
    accountName: 'GDG DSC',
    postImage: 'https://firebasestorage.googleapis.com/v0/b/prasaran-init.appspot.com/o/event_img.png?alt=media&token=e7eb6803-b7f9-4a9b-bb21-1b75c060f523',
    caption: 'Caption here for post ...',
    likes: 520,
    comments: 160,
  },
  {
    id: 4,
    profilePic: 'https://firebasestorage.googleapis.com/v0/b/prasaran-init.appspot.com/o/gdg.png?alt=media&token=8d0e7d3f-f59b-4baf-91d6-49b5a3cd4b69',
    accountName: 'GDG DSC',
    postImage: 'https://firebasestorage.googleapis.com/v0/b/prasaran-init.appspot.com/o/event_img.png?alt=media&token=e7eb6803-b7f9-4a9b-bb21-1b75c060f523',
    caption: 'Caption here for post ...',
    likes: 610,
    comments: 190,
  },
  {
    id: 5,
    profilePic: 'https://firebasestorage.googleapis.com/v0/b/prasaran-init.appspot.com/o/gdg.png?alt=media&token=8d0e7d3f-f59b-4baf-91d6-49b5a3cd4b69',
    accountName: 'GDG DSC',
    postImage: 'https://firebasestorage.googleapis.com/v0/b/prasaran-init.appspot.com/o/event_img.png?alt=media&token=e7eb6803-b7f9-4a9b-bb21-1b75c060f523',
    caption: 'Caption here for post ...',
    likes: 480,
    comments: 130,
  },
];

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

const SocPage = () => {
  return (
    <div className="min-h-screen bg-[#DEE2E6] flex flex-col items-center">
      {/* Edit Button */}
      <button
        className="absolute top-6 right-6 bg-gray-200 px-4 py-2 rounded-full shadow-lg flex items-center justify-center gap-2 hover:bg-gray-300"
        aria-label="Edit"
      >
        <FiEdit className="text-xl text-gray-700" />
        <span className="text-gray-700 font-medium">Edit</span>
      </button>

      {/* Profile Section */}
      <div className="mt-20 w-full max-w-md flex flex-col items-center space-y-4">
        <div className="relative">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/prasaran-init.appspot.com/o/gdg.png?alt=media&token=8d0e7d3f-f59b-4baf-91d6-49b5a3cd4b69"
            alt="Profile"
            className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover"
          />
          <button className="absolute top-0 right-0 bg-gray-200 p-1 rounded-full hover:bg-gray-300">
            ✏️
          </button>
        </div>
        <h1 className="text-xl sm:text-2xl font-semibold">@gdg_dsc</h1>
        <p className="text-gray-600 text-center px-4">
          A short description about the user goes here.
        </p>
      </div>

      {/* Navigation Buttons */}
      <div className="mt-6 flex flex-wrap justify-center gap-4">
        <button className="px-5 py-2 font-semibold bg-[#D9D9D9] rounded-full hover:bg-gray-300">
          Members
        </button>
        <button className="px-5 py-2 font-semibold bg-[#D9D9D9] rounded-full hover:bg-gray-300">
          Followers
        </button>
        <button className="px-5 py-2 font-semibold bg-[#D9D9D9] rounded-full hover:bg-gray-300">
          Message
        </button>
      </div>

      {/* Friends/Society Cards */}
      <div className="mt-6 overflow-x-hidden">
        <div className="flex space-x-6 overflow-x-auto w-screen px-4 scrollbar-hide">
          {userImages.map((user) => (
            <div
              key={user.id}
              className="w-24 h-32 sm:w-28 sm:h-36 rounded-xl bg-gray-400 shadow-md flex-shrink-0"
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
            {/* Image Section */}
            <div className="flex items-center space-x-4 bg-[#F8F8FF] pl-2 py-2">
              <img
                className="w-10 h-10 rounded-full"
                src={post.profilePic}
                alt="profile"
              />
              <div>
                <h2 className="text-sm font-semibold">{post.accountName}</h2>
                <p className="text-xs text-gray-500">{post.content}</p>
              </div>
            </div>

            {/* Post Image */}
            <div className="px-2">
              <img
                className="w-full rounded-2xl object-cover aspect-video"
                src={post.postImage}
                alt="Post"
              />
            </div>

            {/* Caption */}
            <div className="text-sm text-gray-700 mb-0 pl-2">
              {post.caption}
            </div>

            {/* Likes and Comments Section */}
            <div className="w-2/3 flex items-center justify-around bg-[#DEE2E6] p-2 m-2 rounded-lg">
              <div className="flex items-center space-x-1">
                <FaThumbsUp className="text-blue-500" />
                <span className="text-sm">{post.likes} Likes</span>
              </div>
              <div className="flex items-center space-x-1">
                <FaComment className="text-gray-600" />
                <span className="text-sm">{post.comments} Comments</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Post Button */}
      <div className="fixed bottom-10 right-10">
        <button className="bg-[#DEE2E6] hover:bg-gray-300 text-gray-700 p-6 rounded-full shadow-lg">
          <FiPlus className="text-2xl" />
        </button>
      </div>
    </div>
  );
};

export default SocPage;
