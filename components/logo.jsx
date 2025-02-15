import { Link } from "react-router-dom";
import img from "./images/logo2.webp";

export default function Logo() {
  return (
    <div className="w-25 p-2 d-flex ms-4 align-items-center">
      <Link to="/">
        <img
          src={img}
          alt="Logo"
          className="rounded-circle"
          style={{
            width: "60px",
            height: "60px",
            border: "2px solid #ff6600",
            padding: "2px",
          }}
        />
      </Link>

      <p
        className="ms-2 fw-bold text-dark mt-0"
        style={{
          fontFamily: "serif",
          fontSize: "40px",
          letterSpacing: "2px",
          margin: 0,
        }}
      >
        Brainiac
      </p>
    </div>
  );
}
