// Popular.jsx
import { useEffect, useState } from "react";
import { database } from "./firebases/firebase";
import { ref, onValue } from "firebase/database";
import { Link } from "react-router-dom";

export default function Popular() {
  const [popularPosts, setPopularPosts] = useState([]);

  useEffect(() => {
    const blogsRef = ref(database, "blogs");
    onValue(blogsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const posts = Object.entries(data)
          .map(([id, value]) => ({ id, ...value }))
          // Filter out posts with 0 likes or no likes defined
          .filter((post) => (post.likes || 0) > 0)
          .sort((a, b) => (b.likes || 0) - (a.likes || 0))
          .slice(0, 5);
        setPopularPosts(posts);
      }
    });
  }, []);

  return (
    <div className="container my-4">
      <h2 className="text-dark mb-3" style={{ fontSize: "24px" }}>
        Popular Posts
      </h2>

      {popularPosts.length === 0 ? (
        <p className="text-muted">No popular posts available.</p>
      ) : (
        <div className="list-group">
          {popularPosts.map((post) => (
            <Link
              key={post.id}
              to={`/blog/${post.id}`}
              className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
            >
              <div>
                <h5
                  className="mb-1"
                  style={{
                    fontSize: "14px",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                >
                  {post.title}
                </h5>
                <p
                  className="mb-1"
                  style={{ fontSize: "0.8rem", color: "#ff6600" }}
                >
                  {post.author ? `By ${post.author}` : "Unknown Author"}
                </p>
                <small
                  className="text-muted"
                  style={{ fontSize: "12px", position: "relative", top: "-3px" }}
                >
                  {new Date(post.date).toLocaleDateString()}
                </small>
              </div>
              <span
                className="badge bg-primary rounded-pill"
                style={{ fontSize: "0.8rem" }}
              >
                <i className="fa-solid fa-thumbs-up me-1"></i>
                {post.likes || 0}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
