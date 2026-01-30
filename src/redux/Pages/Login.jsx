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
        <div className="icon" >
        <img src="https://tse4.mm.bing.net/th/id/OIP.l54ICAiwopa2RCt7J2URWwHaHa?rs=1&pid=ImgDetMain&o=7&rm=3" alt="" className='login-icon'  />
       </div>
        <h2 style={{ color: '#606664' }}>User Login</h2>
        <label>Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className='login-input'/>

        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className='login-input' />

        {reduxError && <p style={{ color: 'red', textAlign: 'center', fontWeight: 'bold' }}>{reduxError}</p>}

        <button type="submit">Login</button>
        <p>Don't have an account? <Link to="/signup" style={{ color: '#747f7f', fontSize: '15px',textDecoration:'none',fontWeight:'500' }}>Sign up</Link></p>
      </form>
    </div>
  )
}

export default Login;