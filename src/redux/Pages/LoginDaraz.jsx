import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../Slices/Daraz_slices/authSlice";
import { useNavigate, Link, useLocation } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";

const LoginDaraz = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Kindly fill all input fields");
      return;
    }

    const users =
      JSON.parse(localStorage.getItem("daraz_users")) || [];

    const validUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!validUser) {
      setError("Invalid email or password");
      return;
    }

    dispatch(login(validUser));
    
    navigate(location.state?.from || "/homepage");
  
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh", background: "#f5f5f5" }}
    >
      <div
        className="bg-white p-4 rounded shadow-sm"
        style={{ width: "100%", maxWidth: "400px" }}
      >
   
        <div className="text-center mb-3">
          <img
            src="https://lzd-img-global.slatic.net/us/domino/3b870cb043c7f8a9741cbf66329e294e.png"
            alt="Daraz"
            style={{ height: "40px" }}
          />
        </div>

        <h5 className="text-center mb-3 fw-bold">
          Login to your Account
        </h5>

        <form onSubmit={handleLogin}>
        
          <div className="mb-3">
            <input
              type="email"
              className="form-control py-2"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
            />
          </div>

          {/* Password */}
          <div className="mb-2">
            <input
              type="password"
              className="form-control py-2"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
            />
          </div>

          {/* Error */}
          {error && (
            <div className="mb-2">
              <ErrorMessage message={error} />
            </div>
          )}

          <button
            type="submit"
            className="btn w-100 text-white fw-bold mt-2"
            style={{ backgroundColor: "#f85606" }}
          >
            LOGIN
          </button>
        </form>

        {/* Footer */}
        <p className="text-center mt-3 mb-0">
          Don't have an account {("")}
          <Link
            to="/signup-daraz"
            style={{ color: "blue", textDecoration:'none' }}
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginDaraz;
