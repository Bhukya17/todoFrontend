import {useState, useEffect} from 'react';
import axios from 'axios';

export function UserDetails({_id, handleClose, handleUpdate}) {
  const [data, setData] = useState({title: '', description: ''});
  const token = localStorage.getItem('auth-token');

  useEffect(
      function() {
        axios
            .get('http://localhost:8000/api/user', {
              headers: {
                'authorization': token,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
            })
            .then((res) => {
              console.log(res.data);
              setData(res.data);
            })
            .catch((err) => {
              console.log(err.message);
            });
      },
      [data],
  );

  return (
    <form
      className="form-container"
    >
      <label className="label">
          User Name {':'} {data.username}
      </label>
      <label className="label">
          Email  {':'} {data.useremail}
      </label>
    </form>
  );
}
