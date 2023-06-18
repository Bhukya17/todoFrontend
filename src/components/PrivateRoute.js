import {React, useContext} from 'react';
import {Navigate} from 'react-router-dom';
import UserContext from '../context/UserContext';


export default function PrivateRoute({children}) {
  const {userData} = useContext(UserContext);

  if (!userData.token) {
    return <Navigate to='/login' />;
  }

  return children;
}
