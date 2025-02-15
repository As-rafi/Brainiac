import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Singup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState("");
  const [error, setError] = useState();
  const [loading, setLoading] = useState();
  const [showPassword, setShowPassword] = useState(false); // State for show/hide password

  const { signup } = useAuth();
  const navigator = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (password !== confirmPassword) {
      return setError("Passwords don't match!");
    }

    try {
      setError("");
      setLoading(true);
      await signup(email, password, username);
      navigator("/");
    } catch (err) {
      console.log(err);
      setLoading(false);
      setError("Failed to create an account!");
    }
  }

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm p-3 mb-4">
            <div className="card-header bg-primary text-white text-center">
              <h3>Create an account</h3>
            </div>
            <div className="card-body">
              <form className="needs-validation" onSubmit={handleSubmit}>
                {/* Username */}
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control mt-4"
                    id="username"
                    placeholder="Enter your username"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <div className="invalid-feedback">Please fill out this field.</div>
                </div>

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
                </div>

                {/* Confirm Password */}
                <div className="mb-3 position-relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control mt-4"
                    id="confirmPassword"
                    placeholder="Confirm password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>

                {/* Show Password Checkbox */}
                <div className="form-check mt-2">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="showPassword"
                    onChange={() => setShowPassword(!showPassword)}
                  />
                  <label htmlFor="showPassword" className="ms-2">
                    Show Password
                  </label>
                </div>

                {/* Agree Checkbox */}
                <div className="mb-3 form-check mt-3">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="agree"
                    required
                    value={agree}
                    onChange={(e) => setAgree(e.target.value)}
                  />
                  <label htmlFor="agree" className="ms-2">
                    I agree to the <a href="#">terms and conditions</a>
                  </label>
                </div>

                {/* Buttons */}
                <div className="d-flex justify-content-between mt-4">
                  <button type="submit" className="btn btn-primary p-0" style={{ width: "30%" }} disabled={loading}>
                    Singup
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
                  Alredy have an account, <Link to="/login">Log-in</Link> instead
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
