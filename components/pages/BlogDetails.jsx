import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { database } from "../firebases/firebase";
import { ref, onValue, update } from "firebase/database";
import { getAuth } from "firebase/auth";
import blogP2 from "../images/bloggs.webp";

export default function BlogDetails() {
  const { id } = useParams();
  const auth = getAuth();
  const user = auth.currentUser;
  const userId = user ? user.uid : null;
  const username = user ? user.displayName || "User" : "User";

  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [liked, setLiked] = useState(false);
  const [editCommentIndex, setEditCommentIndex] = useState(null);
  const [editCommentText, setEditCommentText] = useState("");

  useEffect(() => {
    if (!userId) return;
    const blogRef = ref(database, `blogs/${id}`);
    onValue(blogRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setBlog(data);
        setComments(Array.isArray(data.comments) ? data.comments : []);
        setLiked(data.likedBy?.includes(userId) || false);
        fetchRelatedPosts(data.category);
      }
    });
  }, [id, userId]);

  const fetchRelatedPosts = (category) => {
    if (!category) return;
    const blogsRef = ref(database, "blogs");
    onValue(blogsRef, (snapshot) => {
      const allBlogs = snapshot.val();
      if (allBlogs) {
        const related = Object.entries(allBlogs)
          .filter(([key, value]) => key !== id && value.category === category)
          .map(([key, value]) => ({ id: key, ...value }))
          .slice(0, 3);

        setRelatedPosts(related);
      }
    });
  };

  const handleLike = () => {
    if (!userId) return alert("Please log in to like.");
    let updatedLikes = blog.likes || 0;
    let updatedLikedBy = blog.likedBy || [];

    if (liked) {
      updatedLikes -= 1;
      updatedLikedBy = updatedLikedBy.filter((uid) => uid !== userId);
    } else {
      updatedLikes += 1;
      updatedLikedBy.push(userId);
    }

    update(ref(database, `blogs/${id}`), { likes: updatedLikes, likedBy: updatedLikedBy });
    setLiked(!liked);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!userId) return alert("Please log in to comment.");

    const newCommentObj = {
      userId,
      username,
      text: newComment,
      likes: 0,
      likedBy: []
    };

    const updatedComments = [...comments, newCommentObj];
    update(ref(database, `blogs/${id}`), { comments: updatedComments });
    setComments(updatedComments);
    setNewComment("");
  };

  const handleLikeComment = (index) => {
    if (!userId) return alert("Please log in to like a comment.");
    const updatedComments = [...comments];
    let comment = updatedComments[index];

    if (!comment.likedBy) comment.likedBy = [];

    if (comment.likedBy.includes(userId)) {
      comment.likedBy = comment.likedBy.filter((uid) => uid !== userId);
      comment.likes = (comment.likes || 0) - 1;
    } else {
      comment.likedBy.push(userId);
      comment.likes = (comment.likes || 0) + 1;
    }

    setComments(updatedComments);
    update(ref(database, `blogs/${id}`), { comments: updatedComments });
  };

  const handleDeleteComment = (index) => {
    if (!userId) return alert("Please log in to delete a comment.");
    const comment = comments[index];

    if (comment.userId !== userId) {
      return alert("You can only delete your own comments.");
    }

    const updatedComments = comments.filter((_, i) => i !== index);
    update(ref(database, `blogs/${id}`), { comments: updatedComments });
    setComments(updatedComments);
  };

  const handleEditComment = (index) => {
    setEditCommentIndex(index);
    setEditCommentText(comments[index].text);
  };

  const handleUpdateComment = (index) => {
    const updatedComments = [...comments];
    updatedComments[index].text = editCommentText;
    update(ref(database, `blogs/${id}`), { comments: updatedComments });
    setEditCommentIndex(null);
  };

  if (!blog)
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <span className="spinner-border text-light p-5" style={{ backgroundColor: "white" }}></span>
      </div>
    );

  return (
    <div className="container p-4">
      <h2 className="mb-5">{blog.title}</h2>
      <img src={blogP2} alt="Blog Thumbnail" className="img-fluid mb-3 w-50" />

   {   /* Display Author's Name */}
        <p className=" mb-1 text-secondary" style={{ fontSize: "14px", fontWeight: "bold" , opacity:0.8,position:'relative',top:'-4px'}}>
          {blog.author ? `${blog.author}` : "Unknown Author"}
        </p>
      <p className="text-muted">{new Date(blog.date).toLocaleDateString()}</p>

      <p style={{ color: "#ff6600", fontWeight: 500,marginBottom:'30px' }}>{blog.category}</p>

      <div className="text-muted mb-5" dangerouslySetInnerHTML={{ __html: blog.content }} />

      <hr className="bg-secondary" style={{  height: "4px", opacity: 0.6 }} />

      <button className="btn btn-primary mt-3 mb-2" onClick={handleLike} 
      style={{position:'relative',left:'-2px'}}
      >
        <i className={liked ? "fa-solid fa-thumbs-up" : "fa-regular fa-thumbs-up"}></i> {blog.likes || 0}
      </button>

      <form onSubmit={handleCommentSubmit} className="comment-section mt-4">
  <div className="comment-input ">
    <input
      type="text"
      className="form-control comment-box outline-none"
      value={newComment}
      onChange={(e) => setNewComment(e.target.value)}
      placeholder="Add a comment"
    />
  </div>
  <button type="submit" className="btn submit-btn mt-2 ms-2">Submit Comment</button>
</form>


      <h4 className="mt-5 text-secondary">Comments</h4>


      <ul className="list-unstyled">
  {comments.map((comment, index) => {
    // Function to generate unique background color
    const getColorFromString = (str) => {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
      }
      return `hsl(${hash % 360}, 70%, 60%)`; // HSL color generation
    };

    const bgColor = getColorFromString(comment.userId || "defaultUser");

    return (
      <li className="mt-3 p-3 border rounded" key={index}>
        {/* User Avatar & Comment on the Same Line */}
        <div className="d-flex align-items-center">
          <div
            className="rounded-circle text-white d-flex align-items-center justify-content-center me-2"
            style={{
              width: "32px",
              height: "32px",
              backgroundColor: bgColor,
              fontSize:'13px',
              fontWeight: "bold",
            }}
          >
            {(comment.username || "User").slice(0, 2).toUpperCase()}
          </div>

          {editCommentIndex === index ? (
            <div className="w-100">
              <input
                type="text"
                className="form-control border-1"
                value={editCommentText}
                onChange={(e) => setEditCommentText(e.target.value)}
              />
              <button
                className="btn btn-success btn-sm mt-2 ms-1" style={{fontSize:'12px'}}
                onClick={() => handleUpdateComment(index)}
              >
                Save
              </button>
            </div>
          ) : (
            <div className="w-100">
              <p className="text-secondary mb-0">{comment.text}</p>
            </div>
          )}
        </div>

        {/* Buttons below the comment */}
        <div className="d-flex align-items-center mt-0 ms-2">
          <button
            className="btn btn-sm btn-white border-0 ms-4" style={{fontSize:'12px'}}
            onClick={() => handleLikeComment(index)}
          >
            <i
              className={
                comment.likedBy?.includes(userId)
                  ? "fa-solid fa-heart text-danger"
                  : "fa-regular fa-heart"
              }
            ></i>{" "}
            {comment.likes || 0}
          </button>

          {comment.userId === userId && (
            <>
              <button
                className="btn btn-sm btn-white border-0 ms-2" style={{fontSize:'12px'}}
                onClick={() => handleEditComment(index)}
              >
                <i className="fa-sharp fa-solid fa-pen-to-square"></i>
              </button>
              <button
                className="btn btn-sm btn-white border-0 ms-5" style={{fontSize:'12px'}}
                onClick={() => handleDeleteComment(index)}
              >
                <i className="fa-sharp fa-regular fa-trash-can"></i>
              </button>
            </>
          )}
        </div>
      </li>
    );
  })}
</ul>

<h4 className="mt-5">Related Posts</h4>
      <div className="row">
        {relatedPosts.length > 0 ? (
          relatedPosts.map((post) => (
            <div key={post.id} className="col-md-4 mb-3">
              <div className="card shadow-sm border-0">
                <div className="card-body">
                  <h6 className="card-title">
                    <Link to={`/blog/${post.id}`} className="text-dark fw-bold" style={{ textDecoration: "none" }}>
                      {post.title}
                    </Link>
                  </h6>
                  <p className="text-muted small">{post.category}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted">No related posts available.</p>
        )}
      </div>
          
          <style>
            { `

.comment-input:focus {
    outline: none;
    border-color: dark; 
    box-shadow: 0 0 5px grey ;
    }

            .comment-section {
  width: 70%;
  max-width: 600px;
  position: relative;
  left:-10px;
  
}

.comment-input {
  display: flex;
  flex-direction: column;
  padding: 10px;
}

.comment-box {
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border: none;
  border-bottom: 2px solid #ccc;
  outline: none;
  background-color: #f9f9f9;
  transition: border-color 0.3s ease-in-out;
}

.comment-box:focus {
  border-color: #4e8eff;
}

.comment-box::placeholder {
  color: #aaa;
}

.submit-btn {
  padding: 8px 16px;
  background-color: #4e8eff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
  
}

.submit-btn:hover {
  background-color: #357ad9;
  color : white
}
           
            `
            }

          </style>

    </div>
  );
}  