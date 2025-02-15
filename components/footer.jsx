import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#222", borderTop: "1px solid #444" }}>
      <div className="container py-3">
        <div className="row align-items-center">
          {/* Left Section */}
          <div className="col-md-4 text-center text-md-start mb-2 mb-md-0">
            <p className="mb-0" style={{ color: "#ddd", fontSize: "0.9rem" }}>
              &copy; 2025 Brainiac. All Rights Reserved.
            </p>
          </div>

          {/* Middle Section */}
          <div className="col-md-4 text-center mb-2 mb-md-0 ">
            <p className="mb-2 mt-2 fw-bold" style={{ color: "#ddd", fontSize: "0.9rem" }}>
              Made by- Rafi
            </p>
          </div>

          {/* Right Section */}
          <div className="col-md-4 text-center text-md-end">
            <Link
              to="/privacy"
              className="mx-2"
              style={{
                color: "#ddd",
                textDecoration: "none",
                fontSize: "0.9rem",
                transition: "color 0.3s",
              }}
              onMouseOver={(e) => (e.target.style.color = "#fff")}
              onMouseOut={(e) => (e.target.style.color = "#ddd")}
            >
              Privacy Policy
            </Link>
            <Link
              to="/term"
              className="mx-2"
              style={{
                color: "#ddd",
                textDecoration: "none",
                fontSize: "0.9rem",
                transition: "color 0.3s",
              }}
              onMouseOver={(e) => (e.target.style.color = "#fff")}
              onMouseOut={(e) => (e.target.style.color = "#ddd")}
            >
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
