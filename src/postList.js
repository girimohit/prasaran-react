import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "./firebaseConfig";

const PostList = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const querySnapshot = await getDocs(collection(db, "individual_posts"));
    const postData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setPosts(postData);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      <h1 className="bg-gray-400   text-white"> INDIVIDUAL POSTS </h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h2>{post.name}</h2>
            <p>{post.age}</p>
          </li>
        ))}
      </ul>
    </>
  );
};
export default PostList;