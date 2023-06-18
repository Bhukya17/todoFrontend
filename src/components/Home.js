import React, {useContext} from 'react';
import UserContext from '../context/UserContext';
import {Dashboard} from './Dashboard';
import Login from '../components/Login';

function Home() {
  const {userData} = useContext(UserContext);

  return (
    <div>
      {userData.user ? (
        <>
          <Dashboard />
        </>
      ) : (
        <>
          <Login />
        </>
      )}
    </div>
  );
}

export default Home;
