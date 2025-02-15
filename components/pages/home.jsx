// Home.jsx
import Blogs from "../blogs";
import Category from "../category";
import FollowUs from "../follow";
import Popular from "../popular";
import Recent from "../recent";

export default function Home() {
  return (
    <div className="container my-5">
      <div className="row">
        {/* Main Content: Blogs */}
        <div className="col-lg-7 mb-4 mb-lg-0">
          <Blogs />
        </div>

        {/* Sidebar: Popular, Recent, Category & FollowUs */}
        <div className="col-lg-5">
          <div className="sidebar p-4 bg-light rounded shadow-sm">
            <Popular />
            <hr className="my-4" />
            <Recent />
            <hr className="my-4" />
            <Category />
            <hr className="my-4" />
            <FollowUs />
          </div>
        </div>
      </div>

      {/* Embedded Styles */}
      <style>{`
        .sidebar {
          position: sticky;
          top: 20px;
        }
        @media (max-width: 991.98px) {
          .sidebar {
            position: static;
          }
        }
      `}</style>
    </div>
  );
}
