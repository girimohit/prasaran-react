import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebaseConfig'; // Ensure this points to your Firebase config file

const getImageURL = async () => {
  try {
    // Reference to the file in storage
    const fileRef = ref(storage, 'loginHeading.png'); // Replace with your exact file path

    // Get the download URL
    const url = await getDownloadURL(fileRef);
    return url;
  } catch (error) {
    console.error('Error fetching image URL:', error);
    return null;
  }
};

console.log(getImageURL());