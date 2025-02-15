// Recent.jsx
import { useEffect, useState } from "react";
import { database } from "./firebases/firebase";
import { ref, onValue } from "firebase/database";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

export default function Recent() {
  const { currentUser } = useAuth();
  const [recentPosts, setRecentPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // If there is no logged in user, clear the posts.
    if (!currentUser) {
      setRecentPosts([]);
      return;
    }

    const blogsRef = ref(database, "blogs");
    const unsubscribe = onValue(blogsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Convert the blogs data to an array of posts
        const posts = Object.entries(data).map(([id, value]) => ({ id, ...value }));
        // Filter to only include blogs written by the current user
        const userPosts = posts.filter(
          (post) => post.author === (currentUser.displayName || "Anonymous")
        );
        // Sort posts by date (newest first)
        userPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
        // Keep only the 3 most recent blogs
        setRecentPosts(userPosts.slice(0, 3));
      } else {
        setRecentPosts([]);
      }
    });

    // Cleanup (optional, in case your onValue returns an unsubscribe function)
    return () => unsubscribe && unsubscribe();
  }, [currentUser]);

  return (
    <div className="container my-4">
      <h2 className="text-dark mb-3" style={{ fontSize: "24px" }}>
        My Blogs
      </h2>

      {recentPosts.length === 0 ? (
        <p className="text-muted">You have not written any blogs yet.</p>
      ) : (
        <div className="list-group">
          {recentPosts.map((post) => (
            <Link
              key={post.id}
              to={`/blog/${post.id}`}
              className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
            >
              <div>
                <h5 className="mb-1" style={{ fontSize: "14px" }}>
                  {post.title}
                </h5>
                <small className="text-muted" style={{fontSize:'12px',position:'relative',top:'-2px'}}>
                  {new Date(post.date).toLocaleDateString()}
                </small>
              </div>
              <span className="badge bg-info rounded-pill" style={{fontSize:'12px'}}>
                {post.category} 
              </span>
            </Link>
          ))}
        </div>
      )}

      <div className="mt-3 text-center">
        <button
          className="btn btn-outline-danger"
          onClick={() => navigate("/myblogs")}
        >
          View All
        </button>
      </div>
    </div>
  );
}
