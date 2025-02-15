// MyBlogs.jsx
import { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "../firebases/firebase";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import image from "../images/bloggs.webp"

export default function MyBlogs() {
  const { currentUser } = useAuth();
  const [myBlogs, setMyBlogs] = useState([]);

  useEffect(() => {
    if (!currentUser) return;

    const blogsRef = ref(database, "blogs");
    const unsubscribe = onValue(blogsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const posts = Object.entries(data).map(([id, value]) => ({ id, ...value }));
        // Filter blogs by the current user
        const userPosts = posts.filter(
          (post) => post.author === (currentUser.displayName || "Anonymous")
        );
        // Sort by date (newest first)
        userPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
        setMyBlogs(userPosts);
      } else {
        setMyBlogs([]);
      }
    });

    return () => unsubscribe && unsubscribe();
  }, [currentUser]);

  // Determine the top 4 popular blogs (sorted by likes descending)
  const popularBlogs = [...myBlogs]
    .sort((a, b) => (b.likes || 0) - (a.likes || 0))
    .slice(0, 5);

  return (
    <div className="container my-4">
      <h1 className="mb-5"> {myBlogs.author} </h1>

      {/* My Popular Blogs Section */}
      <div className="mb-5">
        <h2 className="mb-4" style={{ fontSize: "24px" }}>My Popular Blogs</h2>
        {popularBlogs.length === 0 ? (
          <p className="text-muted">No popular blogs yet.</p>
        ) : (
          <div className="list-group">
            {popularBlogs.map((blog) => (
              <Link
                key={blog.id}
                to={`/blog/${blog.id}`}
                className="list-group-item list-group-item-action d-flex align-items-center w-75"
              >
                <img
                  src={image}
                  alt={blog.title}
                  style={{
                    width: "60px",
                    height: "60px",
                    objectFit: "cover",
                    borderRadius: "4px",
                    marginRight: "10px",
                  }}
                />
                <div>
                  <h5 style={{ fontSize: "14px", fontWeight: "bold" }}>
                    {blog.title}
                  </h5>
                     
                  
                  <small className="text-muted" style={{fontSize:'12px'}}>
                    {new Date(blog.date).toLocaleDateString()}
                  </small>
                  <span className="badge bg-primary rounded-pill ms-5" style={{fontSize:'11px'}}><i className="fa-solid fa-thumbs-up me-1"></i> 
                {blog.likes} 
              </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* All My Blogs Section */}
      <div className="mb-5">
        <h2 className="mb-4 mt-5" style={{ fontSize: "24px" }}>All My Blogs</h2>
        {myBlogs.length === 0 ? (
          <p className="text-muted">You haven't written any blogs yet.</p>
        ) : (
          <div className="list-group">
            {myBlogs.map((blog) => (
              <Link
                key={blog.id}
                to={`/blog/${blog.id}`}
                className="list-group-item list-group-item-action d-flex align-items-center"
              >
                <img
                  src={image}
                  alt={blog.title}
                  style={{
                    width: "80px",
                    height: "80px",
                    objectFit: "cover",
                    borderRadius: "4px",
                    marginRight: "10px",
                  }}
                />
                <div>
                  <h5 style={{ fontSize: "15px", fontWeight: "bold" }}>
                    {blog.title}
                  </h5>
                  <p className="mb-1 fw-bold opacity-75" style={{ fontSize: "0.8rem", color: "#ff6600",position:'relative',top:'-2px'
                   }}>
                    {blog.category}
                  </p>
                  <small className="text-muted" style={{fontSize:'11px',fontWeight:'bold',opacity:0.5,position:'relative',top:'-2px'}}>
                    {new Date(blog.date).toLocaleDateString()}
                  </small>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
