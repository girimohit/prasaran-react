import React, { useState, useEffect, useRef } from "react";
import { storage, db } from "../firebaseConfig";
import { ref, uploadBytes, deleteObject, getDownloadURL, listAll } from "firebase/storage"; 
import { doc, getDocs, deleteDoc, setDoc, collection, arrayUnion  } from "firebase/firestore"; // Firestore methods
// import { doc, getDocs, deleteDoc, setDoc, collection } from "firebase/firestore"; // Import arrayUnion
import { useNavigate, useLocation } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { BsThreeDotsVertical } from "react-icons/bs"; // Import for the meatballs menu

const CreatePost = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [drafts, setDrafts] = useState([]); // State to store drafts
  const [draftOptionsOpen, setDraftOptionsOpen] = useState(null);
  const menuRef = useRef(null); // Ref to handle outside clicks for the menu
  
  const navigate = useNavigate();
  const location = useLocation();

  // Retrieve username and postId from navigation state
  const { username, postId } = location.state || {};

  // Maximum image selection limit
  const MAX_IMAGES = 9;

  // Fetch images and drafts for the current postId and user
  useEffect(() => {
    const fetchImages = async () => {
      if (location.state?.images && location.state.images.length > 0) {
        const draftImages = await Promise.all(
          location.state.images.map(async (image) => {
            const url = await getDownloadURL(ref(storage, image.filePath));
            return { url, preview: url, filePath: image.filePath };
          })
        );
        setSelectedImages(draftImages);
        setGalleryImages(draftImages);
      } else if (username && postId) {
        const listRef = ref(storage, `societies/${username}/${postId}/images`);
        const result = await listAll(listRef);
        
        const fetchedImages = await Promise.all(
          result.items.map(async (item) => {
            const url = await getDownloadURL(item);
            return { url, preview: url, filePath: item.fullPath };
          })
        );
        setSelectedImages(fetchedImages);
        setGalleryImages(fetchedImages);
      }
    };
  
    fetchImages();
  }, [username, postId, location.state]);
    

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
        const storageRef = ref(storage, `societies/${username}/${postId}/images/${file.name}`);
        await uploadBytes(storageRef, file); // Upload the file
        const url = await getDownloadURL(storageRef); // Get the download URL
  
        // Save the image URL in Firestore
        const postRef = doc(db, `societies/${username}/post/${postId}`);
        await setDoc(postRef, {
          images: arrayUnion(url) // Use Firestore's arrayUnion method directly
        }, { merge: true });
  
        return {
          file,
          preview: URL.createObjectURL(file),
          url,
          filePath: `societies/${username}/${postId}/images/${file.name}`
        };
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

  // Fetch drafts and images from Firestore
  useEffect(() => {
    const fetchDrafts = async () => {
      const draftsRef = collection(db, `societies/${username}/drafts`);
      const draftsSnapshot = await getDocs(draftsRef);

      // Fetch images for each draft based on postId
      const fetchedDrafts = await Promise.all(
        draftsSnapshot.docs.map(async (doc) => {
          const draftData = doc.data();
          let imageUrl = null;

          // Fetch the first image URL from Firebase storage using postId
          if (draftData.images && draftData.images.length > 0) {
            const imageRef = ref(storage, draftData.images[0]);
            imageUrl = await getDownloadURL(imageRef);
          }

          return {
            id: doc.id,
            timestamp: draftData.timestamp,
            imageUrl, 
            images: draftData.images
          };
        })
      );

      setDrafts(fetchedDrafts);
    };

    fetchDrafts();
  }, [username]);

  // Save draft to Firestore when navigating back
  const handleSaveDraft = async () => {
    if (selectedImages.length > 0) {
      await setDoc(doc(db, `societies/${username}/drafts`, postId), {
        postId,
        images: selectedImages.map((img) => img.filePath),
        timestamp: new Date().toISOString(),
      });
    }
    navigate("/soc_page");
  };

  // Handle draft actions
  const handleEditDraft = (draft) => {
    console.log("Editing draft with ID:", draft.id, "and images:", draft.images);
    navigate("/create-post", { 
      state: { 
        postId: draft.id, 
        username, 
        images: draft.images || []  // Pass images from draft
      } 
    });
  };    

  const handleDeleteDraft = async (draftId) => {
    await deleteDoc(doc(db, `societies/${username}/drafts`, draftId));
    setDrafts(drafts.filter((draft) => draft.id !== draftId)); // Remove deleted draft from state
  };

  // Close menu if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setDraftOptionsOpen(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle menu toggle for each draft
  const toggleMenu = (draftId) => {
    setDraftOptionsOpen(draftOptionsOpen === draftId ? null : draftId);
  };

  // Handle navigation to EditPost page
  const handleNext = () => {
    navigate("/edit-post", {
      state: {
        postId,
        username,
        galleryImages: selectedImages
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#DEE2E6] text-gray-700 flex flex-col items-center relative px-4 pt-8">
      {/* Back Button */}
      <IoMdArrowRoundBack
        onClick={handleSaveDraft}
        className="text-2xl cursor-pointer absolute top-2 left-2 text-gray-700 hover:text-black"
      />

      {/* Centered Title */}
      <h1 className="text-xl font-bold mb-4 absolute top-2 left-1/2 transform -translate-x-1/2">
        Create Post
      </h1>

      {/* Drafts Display */}
      <div className="w-full max-w-3xl m-4">
        <h2 className="text-lg font-semibold mb-2">Drafts</h2>
        <ul className="space-y-2">
          {drafts.map((draft) => (
            <li key={draft.id} className="flex justify-between items-center bg-gray-100 p-3 rounded-xl">
              <div className="flex items-center space-x-3">
                {draft.imageUrl && (
                  <img src={draft.imageUrl} alt="Draft preview" className="w-16 h-16 object-cover rounded-lg" />
                )}
                <p>{new Date(draft.timestamp).toLocaleString()}</p>
              </div>
              <div className="relative" ref={menuRef}>
                <BsThreeDotsVertical className="cursor-pointer" onClick={() => toggleMenu(draft.id)} />
                {draftOptionsOpen === draft.id && (
                  <div className="absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-2xl z-50">
                    <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200">Schedule</button>
                    <button onClick={() => handleEditDraft(draft)} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200">Edit</button>
                    <button onClick={() => handleDeleteDraft(draft.id)} className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-200">Delete</button>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Selected Images Display */}
      <div className="w-full max-w-3xl aspect-video bg-gray-800 rounded-lg overflow-hidden mb-4 mt-4">
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
          onClick={handleNext}
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