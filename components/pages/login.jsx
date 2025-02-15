import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState();
  const [loading, setLoading] = useState();

  const { login } = useAuth();
  const navigator = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("Logging in with:", email, password);

    try {
      setError("");
      setLoading(true);
      await login(email, password);
      console.log("Login successful!");
      navigator("/");
    } catch (err) {
      setLoading(false);
      setError("Failed to login!");
    }
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm p-3 border-none mb-4">
            <div className="card-header bg-primary text-white text-center">
              <h3>Login </h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                {/* Email */}
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control mt-4"
                    id="email"
                    placeholder="Enter your email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                {/* Password */}
                <div className="mb-3 position-relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control mt-4"
                    id="password"
                    placeholder="Enter your password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="btn btn-sm  border-0  text-secondary position-absolute end-0 top-50 translate-middle-y me-2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <i className="fa-solid fa-eye"></i> : <i className="fa-solid fa-eye-slash"></i>}
                  </button>
                </div>

                {/* Buttons */}
                <div className="d-flex justify-content-between mt-5">
                  <button type="submit" className="btn btn-primary" style={{ width: "30%" }} disabled={loading}>
                    Login
                  </button>
                  <button type="reset" className="btn btn-secondary" style={{ width: "30%" }} disabled={loading}>
                    Reset
                  </button>
                </div>

                {error && (
                  <p className="alert alert-danger mt-4 text-dark" style={{ fontSize: "15px", textAlign: "center", position: "relative" }}>
                    {error}
                  </p>
                )}

                <p className="text-muted mt-4" style={{ fontSize: "14px", textAlign: "center", position: "relative", top: "5px" }}>
                  Don&apos;t have an account? <Link to="/singup">Sign-up</Link> instead
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
