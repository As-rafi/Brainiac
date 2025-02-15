// Blog.jsx
import { useNavigate } from "react-router-dom";
import blogP2 from "./images/bloggs.webp";

export default function Blog({ blog }) {
  const navigate = useNavigate();

  return (
    <div className="blog-item d-flex align-items-center mb-5">
      {/* Thumbnail */}
      <img
        src={blogP2}
        alt="Blog Thumbnail"
        className="blog-thumb"
        onClick={() => navigate(`/blog/${blog.id}`)}
      />

      {/* Blog Details */}
      <div className="blog-details ms-3 mb-2 " onClick={() => navigate(`/blog/${blog.id}`)} style={{ cursor: "pointer" }}>

        <h5 className="blog-title">{blog.title}</h5>
        <div className="blog-meta mt-2">

          <span className="blog-author fw-bold" style={{color:'#ff6600',opacity:0.6,fontSize:'11px'}}>{blog.author ? `By ${blog.author}` : "Unknown Author"}</span>

          <span className="blog-date">{new Date(blog.date).toLocaleDateString()}</span>
        </div>
      </div>

      {/* Category Badge */}
      <div className="ms-auto">
        <span className="badge bg-info blog-category" style={{position:'relative',top:"5px"}}>{blog.category}</span>
      </div>

      {/* Embedded Styles */}
      <style>{`
        .blog-item {
          padding: 10px 15px;
          border-bottom: 1px solid #e0e0e0;
          transition: background-color 0.3s;
        }
        .blog-item:hover {
          background-color: #f9f9f9;
        }
        .blog-thumb {
          width: 80px;
          height: 80px;
          object-fit: cover;
          border-radius: 8px;
          cursor: pointer;
          transition: transform 0.3s ease-in-out;
        }
        .blog-thumb:hover {
          transform: scale(1.05);
        }
        .blog-title {
          font-size: 16px;
          font-weight: 600;
          margin: 0;
          transition: color 0.3s;
        }
        .blog-title:hover {
          color: #ff6600;
        }
        .blog-meta {
          font-size: 12px;
          color: #777;
          margin-top: 5px;
        }
        .blog-meta span {
          margin-right: 17px;
        }
        .blog-category {
          font-size: 0.8rem;          
        }
      `}</style>
    </div>
  );
}
