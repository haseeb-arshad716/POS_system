import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signup } from "../Slices/Daraz_slices/authSlice";
import { useNavigate, Link } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";

const SignupDaraz = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError("Kindly fill all input fields");
      return;
    }

    const users =
      JSON.parse(localStorage.getItem("daraz_users")) || [];

    const userExists = users.find(
      (u) => u.email === email
    );

    if (userExists) {
      setError("User already exists with this email");
      return;
    }

    const userData = {
      id: Date.now(),
      name,
      email,
      password,
    };

    dispatch(signup(userData));
    navigate("/login-daraz");
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh", background: "#f5f5f5" }}
    >
      <div
        className="bg-white p-4 rounded shadow-sm"
        style={{ width: "100%", maxWidth: "380px" }}
      >

        <div className="text-center mb-3">
          <img
            src="https://lzd-img-global.slatic.net/us/domino/3b870cb043c7f8a9741cbf66329e294e.png"
            alt="Daraz"
            style={{ height: "40px" }}
          />
        </div>

        <h5 className="text-center mb-3 fw-bold">
          Sign up 
        </h5>

        <form onSubmit={handleSignup}>
          
          <div className="mb-3">
            <input
              type="text"
              className="form-control py-2"
              placeholder="Full Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError("");
              }}
            />
          </div>

      
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

          <div className="mb-3">
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

          {error && (
            <div className="mb-2">
              <ErrorMessage message={error} />
            </div>
          )}

          <button
            type="submit"
            className="btn w-100 text-white fw-bold"
            style={{ backgroundColor: "#f85606" }}
          >
            SIGN UP
          </button>
        </form>

        <p className="text-center mt-3 mb-0">
          Already have an account?{" "}
          <Link
            to="/login-daraz"
            style={{ color: "blue", textDecoration:'none' }}
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupDaraz;
