// CategoryPage.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { database } from "../firebases/firebase";
import { ref, get } from "firebase/database";
import blogP2 from "../images/bloggs.webp";

export default function CategoryPage() {
  const { categoryName } = useParams();
  const [categoryPosts, setCategoryPosts] = useState([]);
  const [recentPosts, setRecentPosts] = useState([]);
  const [popularPosts, setPopularPosts] = useState([]);

  useEffect(() => {
    const blogsRef = ref(database, "blogs");

    get(blogsRef).then((snapshot) => {
      if (snapshot.exists()) {
        const blogsData = snapshot.val();
        const filteredPosts = Object.entries(blogsData)
          .map(([id, post]) => ({ ...post, id }))
          .filter(
            (post) =>
              post.category &&
              post.category.toLowerCase() === categoryName.toLowerCase()
          );

        setCategoryPosts(filteredPosts);

        // Get most recent 2 posts (using post.date)
        const sortedByDate = [...filteredPosts].sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setRecentPosts(sortedByDate.slice(0, 2));

        // Get top 5 most popular posts (based on likes)
        const sortedByLikes = [...filteredPosts].sort((a, b) => b.likes - a.likes);
        setPopularPosts(sortedByLikes.slice(0, 5));
      }
    });
  }, [categoryName]);

  return (
    <div className="container my-5">
      <h2 className="text-center mb-5 category-title">
        {categoryName.charAt(0).toUpperCase() + categoryName.slice(1)} Blogs
      </h2>
      <div className="row">
        {/* Main Content – Category Blog List */}
        <div className="col-lg-7 mb-5">
          {categoryPosts.length > 0 ? (
            categoryPosts.map((post) => (
           
              <Link to={`/blog/${post.id}`} key={post.id} className="blog-item d-flex align-items-center text-decoration-none">
                <img
                  src={blogP2}
                  alt="Thumbnail"
                  className="blog-thumb me-3"
                  onClick={() => {}}
                />
                <div className="blog-details" style={{ cursor: "pointer" }}>
                  <Link to={`/blog/${post.id}`} className="blog-title">
                    {post.title}
                    </Link>
                  <div className="blog-meta mt-1">

                    <span className="blog-author fw-bold" style={{color:'#ff6600',opacity:0.6,fontSize:'11px'}}>

                      {post.author ? `By ${post.author}` : "Unknown Author"}
                    </span>

                    <span className="blog-date">
                      {new Date(post.date).toLocaleDateString()}
                    </span>
                  </div>
                  
                </div> 
                           
              </Link>
              
            ))
          ) : (
            <p>No blogs found in this category.</p>
          )}
        </div>

        {/* Sidebar – Recent and Popular Posts */}
        <div className="col-lg-5">
          <div className="sidebar p-4 bg-light rounded shadow-sm">
            {/* Recent Posts */}
            <div className="side-section mb-4">
              <h5 className="side-title text-muted">
                Recent in {categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}
              </h5>
              {recentPosts.length > 0 ? (
                recentPosts.map((post) => (
                  <div key={post.id} className="side-item mb-3 ms-2">
                    <Link to={`/blog/${post.id}`} className="side-item-title">
                      {post.title}
                    </Link>
                    <div className="side-item-meta">
                      <span>
                        {post.author ? `By ${post.author}` : "Unknown Author"}
                      </span>

                      <span className="ms-4">
                        {new Date(post.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-muted">No recent posts.</p>
              )}
            </div>
            <hr className="my-4" />
            {/* Popular Posts */}
            <div className="side-section ">
              <h5 className="side-title text-muted">
                Popular in {categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}
              </h5>
              {popularPosts.length > 0 ? (
                popularPosts.map((post) => (
                  <div key={post.id} className="side-item mb-4 ms-2">
                    <Link to={`/blog/${post.id}`} className="side-item-title">
                      {post.title}
                      </Link>
                    
                    <div className="side-item-meta">
                    <span className="mt-1">
                        {post.author ? `By ${post.author}` : "Unknown Author"}
                      </span>
                      </div>
                    <span className="badge bg-primary rounded-pill float-end me-3 mt-2" style={{ fontSize: "0.7rem",position:'relative',top:'-26px' }}> <i className="fa-solid fa-thumbs-up me-1"></i>
                {post.likes || 0} 
                 </span>
                 
                  </div>
                  
                ))
              ) : (
                <p className="text-muted">No popular posts.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .category-title {
          font-size: 30px;
          font-weight: bold;
          color: #333;
        }
        .blog-item {
          padding: 15px 0;
          border-bottom: 1px solid #e0e0e0;
          transition: background-color 0.3s;
          cursor: pointer;
        }
        .blog-item:hover {
          background-color: #f9f9f9;
        }
        .blog-thumb {
          width: 80px;
          height: 80px;
          object-fit: cover;
          border-radius: 8px;
          transition: transform 0.3s ease;
        }
        .blog-thumb:hover {
          transform: scale(1.05);
        }
        .blog-title {
          font-size: 15px;
          font-weight: 600;
          color: #000;
          text-decoration: none;
          transition: color 0.3s;
        }
        .blog-title:hover {
          color: #ff6600;
        }
        .blog-meta {
          font-size: 0.8rem;
          margin-top: 5px;
          color: #777;
        }
        .blog-meta span {
          margin-right: 15px;
        }
        .sidebar {
          position: sticky;
          top: 20px;
        }
        .side-section {
          margin-bottom: 20px;
        }
        .side-title {
          font-size: 18px;
          font-weight: bold;
          color: #333;
          margin-bottom: 15px;
        }
        .side-item-title {
          font-size: 15px;
          font-weight: 600;
          color: #000;
          text-decoration: none;
          transition: color 0.3s;
        }
        .side-item-title:hover {
          color: #ff6600;
        }
        .side-item-meta {
          font-size: 0.8rem;
          color: #777;
          margin-top: 5px;
        }
      `}</style>
    </div>
  );
}
