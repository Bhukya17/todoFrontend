import {useState} from 'react';
import {Link} from 'react-router-dom';
import { toast } from 'react-toastify';


import axios from 'axios';

export function CreateTodo() {
  const [data, setData] = useState({title: '', description: ''});

  function handleChange(e) {
    setData((data) => ({...data, [e.target.name]: e.target.value}));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const todo = {
      title: data.title,
      description: data.description,
    };

    console.log({todo});
    const token = localStorage.getItem('auth-token');
    axios.post('http://localhost:8000/api/todo', data, {
      headers: {
        'authorization': token,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
        .then((res) => {
          setData({title: '', description: ''});
          console.log(res.data.message);
          toast.success('New todo created!', {
            autoClose: 25, // Set the duration in milliseconds (e.g., 3000 for 3 seconds)
            position: toast.POSITION.TOP_CENTER
          });
        })
        .catch((err) => {
          console.log('Error couldn\'t create TODO');
          console.log(err.message);
          toast.error('New todo not created!', {
            autoClose: 25, // Set the duration in milliseconds (e.g., 3000 for 3 seconds)
            position: toast.POSITION.TOP_CENTER
          });
        });

        
  }

  return (
    <section className="container">
      <Link to="/" className="button-back">
        <button type="button" className="button">
                    Back
        </button>
      </Link>
      <section className="contents">
        <form
          onSubmit={handleSubmit}
          className="form-container"
          noValidate
        >
          <label className="label" htmlFor="title">
                        Title
          </label>
          <input
            type="text"
            name="title"
            value={data.title}
            onChange={handleChange}
            className="input"
          />
          <label className="label" htmlFor="description">
                        Description
          </label>
          <input
            type="text"
            name="description"
            value={data.description}
            onChange={handleChange}
            className="input"
          />
          <button type="submit" className="button">
                        Create Todo
          </button>
        </form>
      </section>
    </section>
  );
}
