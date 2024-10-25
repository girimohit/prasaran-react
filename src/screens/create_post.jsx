import React, { useState } from "react";
import { storage } from "../firebaseConfig";
import { ref, uploadBytes, deleteObject, getDownloadURL } from "firebase/storage"; 

const CreatePost = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);
  const [loading, setLoading] = useState(false);

  // Maximum image selection limit
  const MAX_IMAGES = 9;

  // Handle file selection and automatic upload
  const handleImageSelection = async (event) => {
    const files = Array.from(event.target.files);

    // Check if adding new files exceeds the max image limit
    if (selectedImages.length + files.length > MAX_IMAGES) {
      alert(`You can only select up to ${MAX_IMAGES} images.`);
      return;
    }

    setLoading(true);

    // Map over files and upload each image to Firebase
    const uploadedImages = await Promise.all(
      files.map(async (file) => {
        const storageRef = ref(storage, `post_images/${file.name}`);
        await uploadBytes(storageRef, file); // Upload the file
        const url = await getDownloadURL(storageRef); // Get the download URL
        return { file, preview: URL.createObjectURL(file), url, filePath: `post_images/${file.name}` };
      })
    );

    // Update the state with the uploaded images
    setSelectedImages((prev) => [...prev, ...uploadedImages]);
    setGalleryImages((prev) => [...prev, ...uploadedImages]); // Display them in the gallery as well
    setLoading(false);
  };

  // Handle image click from the gallery (show in selected display area)
  const handleImageClick = (image) => {
    setSelectedImages([image]); // Show only the clicked image in selected images
  };

  // Handle removing an image from selected images
  const handleRemoveImage = async (image) => {
    try {
      const storageRef = ref(storage, image.filePath);
      await deleteObject(storageRef); // Delete image from Firebase

      // Remove the image from the selected images and gallery states
      setSelectedImages((prev) => prev.filter((img) => img.url !== image.url));
      setGalleryImages((prev) => prev.filter((img) => img.url !== image.url));
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#DEE2E6] text-gray-700 flex flex-col items-center relative px-4 pt-8">
      <h1 className="text-xl font-bold mb-4 self-start w-full">Create Post</h1>

      {/* Selected Images Display */}
      <div className="w-full max-w-3xl aspect-video bg-gray-800 rounded-lg overflow-hidden mb-4">
        {selectedImages.length > 0 ? (
          <img
            src={selectedImages[0].preview}  // Display the first selected image
            alt="Selected"
            className="w-full h-full object-cover"
          />
        ) : (
          <p className="text-center text-gray-400 py-8">No image selected</p>
        )}
      </div>

      {/* Gallery Section */}
      <div className="grid grid-cols-3 gap-2 w-full max-w-3xl">
        {galleryImages.length > 0 ? (
          galleryImages.map((image, index) => (
            <div
              key={index}
              className="relative w-full cursor-pointer"
              onClick={() => handleImageClick(image)} // Click to display the image
            >
              <img
                src={image.preview}
                alt={`gallery-${index}`}
                className="w-full h-24 object-cover rounded-md"
              />
              <button
                className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center"
                onClick={(e) => {
                  e.stopPropagation(); // Prevents the click from propagating to the image click event
                  handleRemoveImage(image);
                }}
              >
                ×
              </button>
            </div>
          ))
        ) : (
          <p className="col-span-3 text-center text-gray-400">No images to display</p>
        )}
      </div>

      {/* "Next" Button */}
      <div className="fixed bottom-10 right-10">
        <button
          className="bg-gray-700 text-white px-6 py-2 rounded-lg mt-4 cursor-pointer"
          disabled={selectedImages.length === 0 || loading}
          onClick={() => console.log("Next button clicked with selected images")}
        >
          {loading ? "Uploading..." : "Next"}
        </button>
      </div>

      {/* Hidden Input for Gallery Access */}
      <input
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        id="imageInput"
        onChange={handleImageSelection}
      />

      {/* Open Camera/Gallery Button */}
      <label
        htmlFor="imageInput"
        className="bg-gray-700 text-white px-6 py-2 rounded-lg mt-4 cursor-pointer"
      >
        Open Gallery
      </label>
    </div>
  );
};

export default CreatePost;
