import React, { useEffect } from "react";
import { fetchRoutines, fetchRoutinesWithActivity } from "../api";
// import { useNavigate } from "react-router-dom";
import LoadingModal from './LoadingModal';
// import CommonButtons from "./Common/CommonButtons";

const Routines = ({ token, routines, setRoutines, loading, setLoading, routinesWithActivity, setRoutinesWithActivity }) => {
  // const navigate = useNavigate();
  // const token = localStorage.getItem("token");
  // const buttonStyles = {
  //   fontSize: 12,
  //   fontWeight: 700,
  //   border: "1px solid white",
  //   backgroundColor: "red",
  //   color: "black",
  //   "&:hover": {
  //     backgroundColor: "blue",
  //   },
  // };

  useEffect(() => {
    async function getRoutines() {
      const data = await fetchRoutines()
      setRoutines(data)
      setLoading(false)

    }
    getRoutines()
  }, [])



  if (loading) {
    return <LoadingModal />
  }

  else {
    return (
      <div>
        <h1>ROUTINES</h1>
        {routines.map(routine =>
          <div key={routine.id} value={routine}>
            <h2>ROUTINE</h2>
            <h3>Name: {routine.name}</h3>
            <h3>Goal: {routine.goal}</h3>
            <h3>Routine Activities</h3>
            <div>{routine.activities.map(activity =>
              <div key={activity.id} value={activity}>
                <h3>ACTIVITY</h3>
                <h4>Activity Name: {activity.name}</h4>
                <h4>Activity Description: {activity.description}</h4>
              </div>
            )}</div>
            {/* <h3>{ }</h3> */}
          </div>
        )}
      </div>
    )
  }

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
