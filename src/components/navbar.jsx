import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getDatabase, ref, get } from "firebase/database";
import { useAuth } from "./contexts/AuthContext";

// HSL-based color generator
function getColorFromString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return `hsl(${hash % 360}, 70%, 60%)`;
}

// Generate initials (first two letters, uppercase)
function getInitials(name) {
  return name ? name.slice(0, 2).toUpperCase() : "??";
}

export default function Nav() {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useAuth(); // For checking logged-in user's UID
  const [activeTab, setActiveTab] = useState(location.pathname);
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
  const [isAccountsOffcanvasOpen, setIsAccountsOffcanvasOpen] = useState(false);
  const [bloggerAccounts, setBloggerAccounts] = useState([]);

  useEffect(() => {
    setActiveTab(location.pathname);
  }, [location.pathname]);

  // Fetch blogs from Firebase and aggregate blogger accounts using authorUID if available.
  useEffect(() => {
    const db = getDatabase();
    const blogsRef = ref(db, "blogs");
    get(blogsRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const blogsData = snapshot.val();
          const accountsMap = {};
          Object.values(blogsData).forEach((blog) => {
            const uid = blog.authorUID;
            const name = blog.author || "Anonymous";
            let key;
            if (uid) {
              key = uid;
            } else {
              // If no UID, try to find an existing account by name
              const existingKey = Object.keys(accountsMap).find(
                (k) => accountsMap[k].name === name
              );
              key = existingKey || name;
            }
            if (accountsMap[key]) {
              accountsMap[key].count += 1;
            } else {
              accountsMap[key] = {
                name,
                uid: uid || null, // Save UID if available
                count: 1,
                avatar: blog.authorAvatar || null,
              };
            }
          });
          // Convert to an array and sort by most uploads first.
          const accountsArray = Object.values(accountsMap).sort(
            (a, b) => b.count - a.count
          );
          setBloggerAccounts(accountsArray);
        }
      })
      .catch((error) => {
        console.error("Error fetching blogs:", error);
      });
  }, []);

  return (
    <>
      {/* Main Navbar */}
      <nav
        className="navbar navbar-expand-lg navbar-light px-3 ms-4"
        style={{
          background: "#fff",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        {/* Mobile Navbar Toggler */}
        <button
          className="navbar-toggler"
          style={{
            fontSize: "12px",
            backgroundColor: "white",
          }}
          onClick={() => setIsOffcanvasOpen(true)}
        >
          <i className="fa-sharp fa-solid fa-bars"></i>
        </button>

        {/* Navbar for large screens */}
        <div className="collapse navbar-collapse d-none d-lg-flex justify-content-between">
          {/* Left Side: Nav Links */}
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link
                className={`nav-link bg-white fw-bold text-dark ${
                  activeTab === "/" ? "active-nav" : ""
                }`}
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item ms-3">
              <Link
                className={`nav-link bg-white fw-bold text-dark ${
                  activeTab === "/about" ? "active-nav" : ""
                }`}
                to="/about"
              >
                About
              </Link>
            </li>
            <li className="nav-item ms-3">
              <Link
                className={`nav-link bg-white fw-bold text-dark ${
                  activeTab === "/contact" ? "active-nav" : ""
                }`}
                to="/contact"
              >
                Contact
              </Link>
            </li>
          </ul>

          {/* Right Side: Buttons */}
          <div className="d-none d-lg-flex align-items-center">
            {/* Blogger Accounts Button for large screens */}
            <button
              className="btn me-3"
              style={{
                backgroundColor: "#ff6600",
                color: "white",
                marginLeft: "60px",
                borderRadius: "20px",
              }}
              onClick={() => setIsAccountsOffcanvasOpen(true)}
            >
              Bloggers
            </button>
            <Link
              to="/write"
              className="btn btn-primary ms-3"
              style={{ borderRadius: "20px" }}
            >
              Became a Blogger
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile Offcanvas Sidebar (Menu) */}
      {isOffcanvasOpen && (
        <div
          className="offcanvas offcanvas-start show"
          style={{
            width: "250px",
            background: "white",
            zIndex: 1050,
            position: "fixed",
            top: 0,
            bottom: 0,
            boxShadow: "2px 0 12px rgba(0,0,0,0.1)",
          }}
        >
          <div className="offcanvas-header">
            <h4 className="offcanvas-title">Menu</h4>
            <button
              type="button"
              className="btn-close"
              onClick={() => setIsOffcanvasOpen(false)}
            ></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link
                  className={`nav-link fw-bold ms-3 ${
                    activeTab === "/" ? "active" : ""
                  }`}
                  to="/"
                  onClick={() => setIsOffcanvasOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link fw-bold ms-3 ${
                    activeTab === "/about" ? "active-nav" : ""
                  }`}
                  to="/about"
                  onClick={() => setIsOffcanvasOpen(false)}
                >
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link fw-bold ms-3 ${
                    activeTab === "/contact" ? "active-nav" : ""
                  }`}
                  to="/contact"
                  onClick={() => setIsOffcanvasOpen(false)}
                >
                  Contact
                </Link>
              </li>
              <li className="nav-item mt-3">
                <button
                  className="btn btn-secondary w-100"
                  style={{
                    backgroundColor: "#ff6600",
                    color: "white",
                    borderRadius: "20px",
                  }}
                  onClick={() => {
                    setIsOffcanvasOpen(false);
                    setIsAccountsOffcanvasOpen(true);
                  }}
                >
                  Bloggers
                </button>
              </li>
              <li className="nav-item mt-3">
                <Link
                  to="/write"
                  className="btn btn-primary w-100"
                  style={{ borderRadius: "20px" }}
                  onClick={() => setIsOffcanvasOpen(false)}
                >
                  Became a Blogger
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* Blogger Accounts Offcanvas (Right Side) */}
      {isAccountsOffcanvasOpen && (
        <div
          className="offcanvas offcanvas-end show"
          style={{
            width: "300px",
            background: "white",
            zIndex: 1100,
            position: "fixed",
            top: 0,
            bottom: 0,
            boxShadow: "-2px 0 12px rgba(0,0,0,0.1)",
          }}
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title fw-bold">Bloggers</h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => setIsAccountsOffcanvasOpen(false)}
            ></button>
          </div>
          <div className="offcanvas-body">
            {bloggerAccounts.length > 0 ? (
              bloggerAccounts.map((account, index) => (
                <div
                  key={index}
                  className="d-flex align-items-center mb-4 ms-2"
                  style={{
                    cursor: "pointer",
                    transition: "transform 0.2s",
                  }}
                  onClick={() => {
                    setIsAccountsOffcanvasOpen(false);
                    // If the current user clicks their own account, navigate to /myblogs.
                    if (
                      currentUser &&
                      currentUser.uid &&
                      account.uid &&
                      currentUser.uid === account.uid
                    ) {
                      navigate("/myblogs");
                    } else {
                      navigate(`/blogger/${encodeURIComponent(account.name)}`);
                    }
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.transform = "scale(1.02)")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                >
                  {account.avatar ? (
                    <img
                      src={account.avatar}
                      alt={account.name}
                      style={{
                        width: "35px",
                        height: "35px",
                        borderRadius: "50%",
                        marginRight: "10px",
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: "35px",
                        height: "35px",
                        borderRadius: "50%",
                        marginRight: "10px",
                        backgroundColor: account.uid
                          ? getColorFromString(account.uid)
                          : getColorFromString(account.name),
                        color: "white",
                        fontWeight: "bold",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "12px",
                      }}
                    >
                      {getInitials(account.name)}
                    </div>
                  )}
                  <span
                    className="text-muted"
                    style={{ fontWeight: 500, position: "relative", top: "-2px" }}
                  >
                    {account.name}
                  </span>
                </div>
              ))
            ) : (
              <p>No blogger accounts found.</p>
            )}
          </div>
        </div>
      )}

      <style>
        {`
          .nav-link {
            color: #555;
            transition: color 0.3s ease, transform 0.3s ease;
          }
          .nav-link:hover {
            color: #ff6600;
            transform: scale(1.06);
          }
          .active-nav {
            color: #ff6600;
            font-weight: bold;
            border-bottom: 2px solid #ff6600;
          }
        `}
      </style>
    </>
  );
}
