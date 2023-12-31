
import {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {UpdateTodo} from './updateTodo'; 
import UserContext from '../context/UserContext';
import {UserDetails} from './userDetails';
import { toast } from 'react-toastify';

function TodoCard({data, handleEdit, handleDelete}) {
  const {_id, title, description} = data;

  return (
    <li key={_id}>
      <div className="title-description">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>

      <div className="button-container">
        <button className="button" name={_id} onClick={handleEdit}>
                    Edit
        </button>
        <button className="button" name={_id} onClick={handleDelete}>
                    Delete
        </button>
      </div>
    </li>
  );
}

export function Dashboard() {
  const [todo, setTodo] = useState([]);
  const [open, setOpen] = useState(false); 
  const [id, setId] = useState(''); 
  const [update, setUpdate] = useState(false);
  const {setUserData} = useContext(UserContext);
  const {userData} = useContext(UserContext);
  const [openProfile, setOpenProfile] = useState(false);

  useEffect(
      function() {
        axios
            .get('http://localhost:8000/api/todo', {
              headers: {
                'authorization': userData.token,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
            })
            .then((res) => {
              console.log(res.data);
              setTodo(res.data);
            })
            .catch((err) => {
              console.log(err.message);
            });
      },
      [update], 
  );

  function handleEdit(e) { 
    setId(e.target.name);
    setOpen(true);
  }

  function handleUpdate() { 
    console.log('update:', update, !update);
    setUpdate(!update);
  }

  function handleDelete(e) { 
    axios.delete(`http://localhost:8000/api/todo/${e.target.name}`);

    setTodo((data) => {
      return data.filter((todo) => todo._id !== e.target.name);
    });
    toast.success('Todo deleted', {
      autoClose: 35,
      position: toast.POSITION.TOP_CENTER
    });
  }

  function handleClose() { 
    setId('');
    setOpen(false);
  }

  function handleProfile() {
    setOpenProfile(true);
  }
  function handleProfileClose() {
    setOpenProfile(false);
  }

  function handleLogOut() {
    setUserData({
      token: undefined,
      user: undefined,
    });
  }

  return (
    <section className="container">
      <button className="button-logout" onClick={handleLogOut}>
                Log Out
      </button>
      <button className="button-profile" onClick={handleProfile}>
                Profile
      </button>
      <Link to="/create-todo" className="button-new">
        <button className="button">New</button>
      </Link>
      <section className="contents">
        <h1>MY TODO</h1>
        <ul className="list-container">
          {todo.map((data) => (
            <TodoCard
              data={data}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              key={''}
            />
          ))}
        </ul>
      </section>
      {open ? (
                <section className="update-container">
                  <div className="update-contents">
                    <p onClick={handleClose} className="close">
                            &times;
                    </p>

                    <UpdateTodo
                      _id={id}
                      handleClose={handleClose}
                      handleUpdate={handleUpdate}
                    />
                  </div>
                </section>
            ) : (
                ''
            )}
      {openProfile ? (
                <section className="update-container">
                  <div className="update-contents">
                    <p onClick={handleProfileClose} className="close">
                            &times;
                    </p>

                    <UserDetails/>
                  </div>
                </section>
            ) : (
                ''
            )}
    </section>
  );
}
