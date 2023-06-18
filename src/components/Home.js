import React, {useContext} from 'react';
import UserContext from '../context/UserContext';
import {ShowTodoList} from './showTodoList';
import Login from '../components/Login';

function Home() {
  const {userData} = useContext(UserContext);

  return (
    <div>
      {userData.user ? (
        <>
          <ShowTodoList />
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
