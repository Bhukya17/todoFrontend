
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './components/Home';
import {CreateTodo} from './components/createTodo';
import Login from './components/Login';
import Signup from './components/Signup';
import {useState} from 'react';
import UserContext from './context/UserContext';
import './App.scss';
import PrivateRoute from './components/PrivateRoute';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });
  return (
    <div className="app-contents">
      <BrowserRouter>
        <UserContext.Provider value={{userData, setUserData}}>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="create-todo" element={<PrivateRoute><CreateTodo /></PrivateRoute>} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
          </Routes>
          <ToastContainer />
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
