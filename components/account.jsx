import { Link } from "react-router-dom";
import { useState, useRef } from "react";
import { useAuth } from "./contexts/AuthContext";

export default function Account() {
  const { currentUser, logout } = useAuth();
  const [showOverlay, setShowOverlay] = useState(false);
  const [editUsername, setEditUsername] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const overlayRef = useRef(null);

  const getColorFromString = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return `hsl(${hash % 360}, 70%, 60%)`;
  };

  const bgColor = currentUser ? getColorFromString(currentUser.uid) : "#ccc";

  const handleEditUsername = () => {
    setEditUsername(true);
    setNewUsername(currentUser.displayName || "");
  };

  const handleSaveUsername = () => {
    if (newUsername.trim()) {
      console.log("Saving new username:", newUsername);
    }
    setEditUsername(false);
  };

  const confirmLogout = () => {
    setShowLogoutConfirm(true);
  };

  const handleLogout = () => {
    logout();
    setShowLogoutConfirm(false);
    setShowOverlay(false);
  };

  return (
    <div className="float-end" style={{ width: "150px", position: "relative" }}>
      {currentUser ? (
        <>
          <div
            className="rounded-circle d-flex align-items-center justify-content-center float-end"
            style={{
              width: "40px",
              height: "40px",
              marginRight: "15px",
              backgroundColor: bgColor,
              color: "white",
              fontWeight: "bold",
              fontSize: "14px",
              cursor: "pointer",
              boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
            }}
            onClick={() => setShowOverlay(!showOverlay)}
          >
            {currentUser.displayName
              ? currentUser.displayName.slice(0, 2).toUpperCase()
              : "??"}
          </div>

          {showOverlay && (
            <div
              ref={overlayRef}
              className="position-absolute p-3 bg-white shadow rounded"
              style={{
                top: "55px",
                right: "0",
                width: "240px",
                border: "none",
                borderRadius: "8px",
                zIndex: 10,
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              }}
            >
              <p className="fw-bold mb-1">
                {currentUser.displayName || "Unknown User"}
              </p>
              <p className="text-muted" style={{ fontSize: "0.85rem", marginBottom: "1rem" }}>
                {currentUser.email}
              </p>

              {editUsername ? (
                <>
                  <input
                    type="text"
                    className="form-control mb-2"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                  />
                  <button className="btn btn-sm btn-success" onClick={handleSaveUsername}>
                    Save
                  </button>
                </>
              ) : (
                <button className="btn btn-sm btn-primary" onClick={handleEditUsername}>
                  Edit Username
                </button>
              )}

              <abbr title="Logout">
                <button
                  className="btn btn-sm btn-danger mt-2 ms-4"
                  onClick={confirmLogout}
                >
                  <i className="fa-sharp fa-solid fa-right-from-bracket"></i>
                </button>
              </abbr>
            </div>
          )}

          {showLogoutConfirm && (
            <div
              className="modal fade show d-block"
              tabIndex="-1"
              style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
            >
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Confirm Logout</h5>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setShowLogoutConfirm(false)}
                    ></button>
                  </div>
                  <div className="modal-body">
                    <p className="fs-4 text-dark fw-semibold">
                      Are you sure you want to logout?
                    </p>
                  </div>
                  <div className="modal-footer">
                    <button className="btn btn-danger" onClick={handleLogout}>
                      Yes
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={() => setShowLogoutConfirm(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          <i
            className="fa-solid fa-user ms-1 mn-2 mt-2 rounded-circle"
            style={{
              padding: "10px",
              backgroundColor: "white",
              fontSize: "14px",
            }}
          ></i>
          <Link
            to="/singup"
            className="ms-3 mn-3"
            style={{
              color: "#ff6600",
              fontSize: "13px",
              textDecoration: "none",
              position:'relative',
              top: '-1px'
            }}
          >
            Sign-up
          </Link>
          <Link
            to="/login"
            className="ms-2"
            style={{
              color: "#ff6600",
              fontSize: "13px",
              textDecoration: "none",
               position:'relative',
              top: '-1px'
            }}
          >
            Log-in
          </Link>
        </>
      )}
    </div>
  );
}
