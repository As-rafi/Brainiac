import { useEffect, useState } from "react";
import { getDatabase, ref, get } from "firebase/database";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showOverlay, setShowOverlay] = useState(false);
  const [blogs, setBlogs] = useState([]); // Store blogs from Firebase
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch data from Firebase
    const fetchBlogs = async () => {
      const db = getDatabase();
      const blogsRef = ref(db, "blogs");

      try {
        const snapshot = await get(blogsRef);
        if (snapshot.exists()) {
          const blogData = Object.entries(snapshot.val()).map(([id, data]) => ({
            id, // Firebase key as blog ID
            ...data,
          }));
          console.log("Fetched Blogs:", blogData);
          setBlogs(blogData);
        } else {
          console.log("No blogs found in Firebase.");
          setBlogs([]);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  const handleSearch = (e) => {
    // Get input value, trim leading/trailing whitespace, and convert to lowercase.
    const searchTerm = e.target.value.trim().toLowerCase();
    setQuery(searchTerm);

    if (searchTerm) {
      // Split query into individual words (ignoring extra spaces)
      const searchWords = searchTerm.split(" ").filter(word => word !== "");
      // Create a normalized search version (remove all spaces)
      const normalizedSearch = searchTerm.replace(/\s+/g, "");

      const filteredResults = blogs.filter(post => {
        const title = post.title ? post.title.toLowerCase() : "";
        const category = post.category ? post.category.toLowerCase() : "";
        let keywords = "";
        if (post.keywords && Array.isArray(post.keywords)) {
          keywords = post.keywords.join(" ").toLowerCase();
        } else if (typeof post.keywords === "string") {
          keywords = post.keywords.toLowerCase();
        }

        // Word-by-word matching: check that every word in the query is present
        const matchesWords = searchWords.every(word => 
          title.includes(word) || category.includes(word) || keywords.includes(word)
        );

        // Normalized matching: remove spaces from fields and compare with normalized search term
        const normalizedTitle = title.replace(/\s+/g, "");
        const normalizedCategory = category.replace(/\s+/g, "");
        const normalizedKeywords = keywords.replace(/\s+/g, "");
        const matchesNormalized = 
          normalizedTitle.includes(normalizedSearch) ||
          normalizedCategory.includes(normalizedSearch) ||
          normalizedKeywords.includes(normalizedSearch);

        return matchesWords || matchesNormalized;
      });

      console.log("Filtered Results:", filteredResults);
      setResults(filteredResults);
      setShowOverlay(true);
    } else {
      setResults([]);
      setShowOverlay(false);
    }
  };

  const handleNavigate = (id) => {
    navigate(`/blog/${id}`); // Navigate to blog detail page
    setShowOverlay(false); // Close search overlay
  };

  return (
    <div
      className="search-container d-flex"
      style={{
        width: "350px",
        height: "40px",
        position: "relative",
        marginRight: "13px",
      }}
    >
      <input
        type="search"
        placeholder="Search blog..."
        className="form-control"
        value={query}
        onChange={handleSearch}
        style={{
          flex: 1,
          height: "100%",
          borderRadius: "20px",
          border: "1px solid #ddd",
          paddingLeft: "15px",
        }}
      />
      <button
        className="btn ms-2 text-light"
        style={{
          height: "100%",
          backgroundColor: "#ff6600",
          borderRadius: "20px",
        }}
        onClick={() => setShowOverlay(true)}
      >
        <i className="fa fa-search"></i>
      </button>

      {/* Search Results Overlay */}
      {showOverlay && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-start"
          style={{ zIndex: 1050, overflowY: "auto", backgroundColor: "rgba(0, 0, 0, 0.75)" }}
        >
          <div
            className="bg-white p-4 rounded shadow"
            style={{
              width: "80%",
              maxHeight: "90vh",
              overflowY: "auto",
              marginTop: "5vh",
              borderRadius: "8px",
            }}
          >
            <button
              className="btn-close position-relative"
              onClick={() => setShowOverlay(false)}
              aria-label="Close"
              style={{ float: "right" }}
            ></button>
            <h4>Search Results for: "{query}"</h4>
            <hr />
            {results.length > 0 ? (
              results.map((post) => (
                <div key={post.id} className="d-flex mb-3 align-items-center">
                  <h6
                    className="text-muted"
                    style={{
                      cursor: "pointer",
                      textDecoration: "underline",
                    }}
                    onClick={() => handleNavigate(post.id)}
                  >
                    {post.title}
                  </h6>
                  <span className="ms-2 badge bg-secondary" style={{ fontSize: "0.8rem" }}>
                    {post.category ? post.category : "Uncategorized"}
                  </span>
                </div>
              ))
            ) : (
              <p>No results found.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
