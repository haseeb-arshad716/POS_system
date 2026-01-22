import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginuser, clearError } from '../Slices/userSlice';


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { users, error: reduxError } = useSelector((state) => state.users);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(clearError());


    const userFound = users.find(u => u.email === email && u.password === password);

    if (userFound) {
      dispatch(loginuser({ email, password }));
      navigate('/dashboard'); //
    } else {

      dispatch(loginuser({ email, password })); 
      setTimeout(()=>{
        dispatch(clearError());
      },2500)
    }
  };

  return (

    <div className="login-container">

      <form className="login-form" onSubmit={handleSubmit}>
        <h2 style={{ color: 'blue' }}>Login</h2>
        <label>Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />

        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />

        {reduxError && <p style={{ color: 'red', textAlign: 'center', fontWeight: 'bold' }}>{reduxError}</p>}

        <button type="submit">Login</button>
        <p>Don't have an account? <Link to="/signup" style={{ color: 'blue', fontSize: '15px' }}>Sign up</Link></p>
      </form>
    </div>
  )
}

export default Login;