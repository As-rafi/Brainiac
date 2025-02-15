import Blog from "./blog";
import { useEffect, useState } from "react";
import { database } from "./firebases/firebase"; 
import { ref, onValue } from "firebase/database";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); 

  const blogsPerPage = 10;

  useEffect(() => {
    const blogsRef = ref(database, "blogs");
    onValue(blogsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const blogList = Object.keys(data).map((key) => ({ id: key, ...data[key] }));
        setBlogs(blogList.reverse()); // Reverse to show newest first
      }
    });
  }, []);

  useEffect(() => {
    const blogsRef = ref(database, "blogs");
    onValue(blogsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const totalBlogs = Object.keys(data).length;
        setTotalPages(Math.ceil(totalBlogs / blogsPerPage));
      }
    });
  }, []);

  const generatePageNumbers = () => {
    let pages = [];
    if (totalPages <= 8) {
      pages = [...Array(totalPages).keys()].map((n) => n + 1);
    } else {
      pages = [1, 2, 3, 4, 5, 6, 7, "...", totalPages];
    }
    return pages;
  };


  // Pagination Logic
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

  return (
    <>
    {/* Pagination Controls */}
    <nav className="mt-2 ms-2" style={{position:'relative',top:'-25px'}}>
          <ul className="pagination justify-content-start">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button
                className="page-link me-1 "
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              >
                <i className="fa-solid fa-angles-left"></i>
              </button>
            </li>
            {generatePageNumbers().map((page, index) => (
              <li
                key={index}
                className={`page-item ${currentPage === page ? 'active' : ''} ${page === '...' ? 'disabled' : ''}`}
              >
                {page === "..." ? (
                  <span className="page-link ms-1" >...</span>
                ) : (
                  <button className="page-link ms-1"   onClick={() => setCurrentPage(page)}>
                    {page}
                  </button>
                )}
              </li>
            ))}
            <li className={`  page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button
                className="page-link ms-2"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              >
                <i className="fa-sharp fa-solid fa-angles-right"></i>
              </button>
            </li>
          </ul>
        </nav>
        
      <div>
        <h2 className="text-dark ms-2 mt-3 mb-4" style={{fontSize:'25px'}}>
          Blogs
        </h2>
        {currentBlogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>

      <style>
        {`
          .active-page {
           font-weight: bold;
            color: black
          }
          `}
      </style>

      
    </>
  );
}
