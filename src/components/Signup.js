import axios from 'axios';
import React, {useState, useContext} from 'react';
import {useNavigate} from 'react-router';
import {Link} from 'react-router-dom';
import UserContext from '../context/UserContext';

function Signup() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [username, setUsername] = useState();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const {setUserData} = useContext(UserContext);

  const history = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const newUser = {email, password, confirmPassword, username};
      await axios.post('http://localhost:8000/api/user/signup', newUser);
      const loginRes = await axios.post('http://localhost:8000/api/user/login', {
        email,
        password,
      });
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      localStorage.setItem('auth-token', loginRes.data.token);
      setLoading(false);
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
      <label htmlFor="title" className="label">
      Sign Up
      </label>
      {error && <label>{error}</label>}
      <label className="label">
    Username
      </label>
      <input
        type="text"
        name="email"
        className="input"
        onChange={(e) => setUsername(e.target.value)}/>
      <label htmlFor="title" className="label">
      Email
      </label>
      <input
        type="text"
        name="email"
        className="input"
        onChange={(e) => setEmail(e.target.value)} />
      <label htmlFor="description" className="label">
      Password
      </label>
      <input
        type="text"
        name="Password"
        className="input"
        onChange={(e) => setPassword(e.target.value)} />
      <label htmlFor="Password Confirmation" className="label">
      Password Confirmation
      </label>
      <input
        type="text"
        name="passwordConfirmation"
        className="input"
        onChange={(e) => setConfirmPassword(e.target.value)} />
      <button disabled={loading} type="submit" className="button">
      Sign Up
      </button>
    </form>
    <div className="w-100 text-center mt-2">
    Already have an account?<Link to="/login">Log in</Link>
    </div></>
  );
}

export default Signup;
