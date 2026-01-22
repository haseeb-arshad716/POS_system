import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registeredUser, clearError } from '../Slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';

const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [localError, setLocalError] = useState("");
    const [success, setSuccess] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { error: reduxError } = useSelector((state) => state.users);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(clearError());
        setSuccess(false); 

        if (!name || !email || !password) {
            setLocalError("All fields are required");
            return;
        }
        dispatch(registeredUser({ name, email, password }));
  
        setSuccess(true);
    }

    useEffect(() => {
        if (success && !reduxError && name !== "") {
            setTimeout(() => {
                navigate('/');
            }, 2000);
        } else if (reduxError) {

            setSuccess(""); 
            setTimeout(()=>{
                dispatch(clearError())
            },2000)
        }
    }, [success, reduxError, navigate]);


    return (
        <div className="sign-up-container">
            <form className='sign-up-form' onSubmit={handleSubmit}>
                <h2 style={{ textAlign: 'center', color: 'blue' }}>Sign up</h2>
                <label>Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter your Name' />

                <label>Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter your Email' />

                <label>Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter your Password' />

                {(localError || reduxError) && (
                    <p style={{ color: 'red', fontWeight: 'bold', textAlign: 'center' }}>
                        {localError || reduxError}
                    </p>
                )}

                <button type="submit">SignUp</button>
                <p>Already have an account? <Link to='/' style={{ color: 'blue', fontSize: '15px' }}>Login</Link></p>
            </form>
            {success && !reduxError && <h2 style={{ color: 'green' }}>✅ Sign up Successfully!</h2>}
        </div>
    )
}

export default SignUp;