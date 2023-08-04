import React, { useEffect, useState } from "react";
import { fetchPosts, fetchUserData } from "../api";
import { useNavigate } from "react-router-dom";
// import CommonButtons from "./Common/CommonButtons";

const Routines = ({ setLoading }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const buttonStyles = {
    fontSize: 12,
    fontWeight: 700,
    border: "1px solid white",
    backgroundColor: "red",
    color: "black",
    "&:hover": {
      backgroundColor: "blue",
    },
  };

  //   //   const [posts, setPosts] = useState([]);

  //   useEffect(() => {
  //     const fetchRoutinesData = async () => {
  //       setLoading(true);

  //       try {
  //         const postsData = await fetchRoutines(token);
  //         setRoutines(postsData);
  //       } catch (error) {
  //         console.error(error);
  //       } finally {
  //         setLoading(false);
  //       }
  //     };

  //     fetchPostsData();
  //   }, []);

  //   const handleViewPost = (postId) => {
  //     navigate(`/ViewPost/${postId}`);
  //   };

  //   return (
  //     <>
  //       <div id="postheader">Posts</div>
  //       {posts.map((post) => (
  //         <div id="posts" key={post._id}>
  //           <h2 id="posttitle">{post.title}</h2>
  //           <p id="postusername">
  //             Username: {post.author?.username || "Unknown User"}
  //           </p>
  //           <p>Description: {post.description}</p>
  //           <p>Price: {post.price}</p>
  //           <p>Location: {post.location}</p>
  //           <p>
  //             Will Deliver?:{" "}
  //             {post.willDeliver ? "Will Deliver" : "Will NOT deliver"}
  //           </p>
  //           {/* {token && (
  //             <CommonButtons
  //               variant="contained"
  //               sx={buttonStyles}
  //               onClick={() => handleViewPost(post._id)}
  //             >
  //               View Post
  //             </CommonButtons>
  //           )} */}
  //         </div>
  //       ))}
  //     </>
  //   );
};

export default Routines;
