import React, { useState, useEffect } from "react";
import { getDatabase, ref, get } from "firebase/database";
import { useParams, useNavigate } from "react-router-dom";

const getColorFromString = (str) => {
  if (!str) return "#ccc";
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return `hsl(${hash % 360}, 70%, 60%)`;
};

const BloggerDetail = () => {
  const { username } = useParams(); // Get the username from the route
  const [bloggerData, setBloggerData] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const db = getDatabase();
      const blogsRef = ref(db, "blogs");
      const snapshot = await get(blogsRef);
      const data = snapshot.val();

      if (data) {
        // Convert the object into an array including the blog id
        const allBlogs = Object.entries(data).map(([id, blog]) => ({ id, ...blog }));
        // Filter blogs by username
        const bloggerBlogs = allBlogs.filter(
          (blog) => blog.author === username
        );

        setBlogs(bloggerBlogs);

        // Extract unique categories
        const uniqueCategories = [...new Set(bloggerBlogs.map((blog) => blog.category))];
        setCategories(uniqueCategories);

        // Set blogger data
        if (bloggerBlogs.length) {
          setBloggerData({
            author: username,
            avatarColor: getColorFromString(username), // Generate avatar color
          });
        }
      }
    };

    fetchData();
  }, [username]);

  if (!bloggerData) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <span
          className="spinner-border text-light p-5"
          style={{ backgroundColor: "white" }}
        ></span>
      </div>
    );
  }

  const mostPopularBlogs = [...blogs]
    .sort((a, b) => b.likes - a.likes)
    .slice(0, 4);

  return (
    <div className="blogger-detail-page">
      <div className="blogger-header" style={{ height: "198px" }}>
        {/* Top horizontal line */}
        <div
          className="header-line"
          style={{ backgroundColor: bloggerData.avatarColor }}
        ></div>

        <div className="header-content">
          <div
            className="avatar shadow-sm"
            style={{
              backgroundColor: bloggerData.avatarColor,
              width: "70px",
              height: "70px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "23px",
              fontWeight: "bold",
              color: "white",
              marginBottom: "10px",
              marginLeft: "15px",
              marginTop: "15px",
            }}
          >
            {username.slice(0, 2).toUpperCase()}
          </div>
          <h1 className="blogger-name fw-bold opacity-75">
            {bloggerData.author}
          </h1>
          <div className="blogger-categories">
            <strong style={{ fontSize: "13px" }}>Upload Blogs in : </strong>{" "}
            <span
              className="badge text-white"
              style={{ backgroundColor: "#ff6600" }}
            >
              {categories.length ? categories.join(" | ") : "No categories yet"}
            </span>
          </div>
        </div>

        {/* Bottom horizontal line */}
        <div
          className="header-line shadow-sm"
          style={{ backgroundColor: bloggerData.avatarColor }}
        ></div>
      </div>

      {/* Most Popular Blogs Section */}
      <div className="blogs-section">
        <h2 className="section-title">Most Popular Blogs</h2>
        {mostPopularBlogs.length === 0 ? (
          <p className="text-muted">No popular blogs available.</p>
        ) : (
          <div className="blogs-grid">
            {mostPopularBlogs.map((blog, index) => (
              <div
                key={blog.id || index}
                className="blog-card"
                onClick={() => navigate(`/blog/${blog.id}`)}
                style={{ cursor: "pointer" }}
              >
                <h3>{blog.title}</h3>
                <p style={{ color: "#ff6600", fontWeight: 500 }}>
                  {blog.category}
                </p>
                <div className="blog-details">
                  <small>
                    {new Date(blog.date).toLocaleDateString()}
                  </small>
                  <div>
                    <i className="fa-solid fa-thumbs-up text-primary"></i>
                    <span className="blog-likes text-primary ms-1">
                      {blog.likes || 0}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* All Blogs Section */}
      <div className="blogs-section">
        <h2 className="section-title">All Blogs</h2>
        {blogs.length === 0 ? (
          <p className="text-muted">No blogs available.</p>
        ) : (
          <div className="blogs-grid">
            {blogs.map((blog, index) => (
              <div
                key={blog.id || index}
                className="blog-card"
                onClick={() => navigate(`/blog/${blog.id}`)}
                style={{ cursor: "pointer" }}
              >
                <h3>{blog.title}</h3>
                <p style={{ color: "#ff6600", fontWeight: 500 }}>
                  {blog.category}
                </p>
                <div className="blog-details">
                  <small>
                    {new Date(blog.date).toLocaleDateString()}
                  </small>
                  <div>
                    <i className="fa-solid fa-thumbs-up text-primary"></i>
                    <span className="blog-likes text-primary ms-1">
                      {blog.likes || 0}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Page Styles */}
      <style>{`
        .blogger-detail-page {
          max-width: 1200px;
          margin: auto;
          padding: 20px;
          font-family: Arial, sans-serif;
        }
        .blogger-header {
          text-align: center;
          background: linear-gradient(135deg, #fdfbfb, #ebedee);
          padding: 0px;
          color:  #2c3e50;
          margin-bottom: 60px;
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
        }
        .header-line {
          height: 16px;
          width: 100%;
          margin: 0 auto;
          position: relative;
          top: 1px;
        }
        .header-line + .header-content {
          margin-top: 20px;
        }
        .header-content + .header-line {
          margin-top: 10px;
        }
        .blogger-name {
          font-size: 27px;
          margin: 8px 0;
          position: relative;
          top: -8px;
          left: -1px;
        }
        .blogger-categories {
          font-size: 16px;
          color: #2c3e50;
          position: relative;
          top: -5px;
        }
        .blogs-section {
          margin-bottom: 40px;
        }
        .section-title {
          font-size: 24px;
          margin-bottom: 20px;
          border-bottom: 2px solid #ddd;
          padding-bottom: 5px;
        }
        .blogs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
        }
        .blog-card {
          background: #fff;
          border-radius: 8px;
          padding: 20px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease;
        }
        .blog-card:hover {
          transform: translateY(-5px);
        }
        .blog-card h3 {
          font-size: 18px;
          margin: 0 0 10px;
          color: #333;
        }
        .blog-card p {
          font-size: 14px;
          color: #666;
          margin: 0 0 15px;
        }
        .blog-details {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          color: #999;
        }
        .blog-likes {
          font-size: 14px;
          color: #ff4d4f;
        }
      `}</style>
    </div>
  );
};

export default BloggerDetail;
