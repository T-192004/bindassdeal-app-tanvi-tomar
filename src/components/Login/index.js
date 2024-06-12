import React, { useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import Cookies from 'js-cookie';
import './index.css';

const Login = props => {
  const [name, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [userInputErrPrsnt, setUserErrPresent] = useState(false);
  const [passInputErrPrsnt, setPassErrPresent] = useState(false);
  const navigate = useNavigate();

  const onSuccessSubmit = jwtToken => {
    Cookies.set(jwtToken, 'jwt_token', {expires: 30, path: '/'});
    navigate("/");
  };

  const handleSubmit =  async (event) => {
    event.preventDefault();
    const userDetails = {name, password}
    if (name === '' && password=== ''){
      setUserErrPresent(true);
      setPassErrPresent(true);
      setErrMsg("Please enter valid input");
    } else if (name === '') {
      setErrMsg("Enter valid username");
      setPassErrPresent(false);
      setUserErrPresent(true);
    } else if (password === '') {
      setErrMsg("Please enter valid input");
      setPassErrPresent(true);
      setUserErrPresent(false);
    } else {
    const options = {
        method: 'POST',
        body: JSON.stringify(userDetails),
      }
      const response = await fetch("https://json-placeholder.mock.beeceptor.com/login", options);
      const data = await response.json();
      onSuccessSubmit(data.token);
      }
  };

  return (
    <div className="login-pg-container d-flex flex-row">
    <img
      className='login-page-img'
      src="https://img.freepik.com/premium-photo/task-management-check-list-efficient-work-project-plan-f_776674-950256.jpg?w=740"
      alt="login page"
    />
    <div className='login-container'>
     <h1 className='login-main-heading'>Hello, User <br />Login</h1>
      <form onSubmit={handleSubmit} className='login-card'>
        <div className="input-container">
          <label htmlFor="username">Username:</label>
          <input
            type="name"
            id="username"
            value={name}
            className='input-box'
            placeholder='Enter Username'
            onChange={(e) => setUsername(e.target.value)}
          />
          {userInputErrPrsnt && <p className='error-msg'>*{errMsg}</p>}
        </div>
        <div className="input-container">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            placeholder='Enter User Password'
            className='input-box'
            onChange={(e) => setPassword(e.target.value)}
          />
          {passInputErrPrsnt && <p className='error-msg'>*{errMsg}</p>}
        </div>
        <button type="submit" className='login-btn'>Login</button>
      </form>
      </div>
    </div>
  );
}

export default Login;
