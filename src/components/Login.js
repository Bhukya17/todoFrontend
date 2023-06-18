import React, {useState, useContext} from 'react';
import axios from 'axios';
import UserContext from '../context/UserContext';
import {useNavigate, Link} from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const history = useNavigate();
  const {setUserData} = useContext(UserContext);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const loginUser = {email, password};
      const loginRes = await axios.post('http://localhost:8000/api/user/login', loginUser);
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });

      localStorage.setItem('auth-token', loginRes.data.token);
      history('/');
    } catch (err) {
      setLoading(false);
      err.response.data.msg && setError(err.response.data.msg);
    }
  }
  return (
    <><form
      className="form-container"
      onSubmit={handleSubmit}
    >
      <label className="loginLabel">
        Login
      </label>
      {error && <label>{error}</label>}
      <label htmlFor="title" className="label">
        Email
      </label>
      <input
        type="text"
        name="email"
        className="input"
        // value={title}
        onChange={(e) => setEmail(e.target.value)} />
      <label htmlFor="description" className="label">
        Password
      </label>
      <input
        type="text"
        name="Password"
        // value={description}
        className="input"
        onChange={(e) => setPassword(e.target.value)} />
      <button disabled={loading} type="submit" className="button">
        Login
      </button>
    </form><div className="w-100 text-center mt-2">Creat account?<Link to="/signup">Sign up</Link></div></>
  );
}

export default Login;
