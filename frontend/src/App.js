import React, {useEffect, useState} from 'react';
import axios from "axios";

const App = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('api/users').then(value => value.data).then(value => setUsers(value))
    },[]);
  return (
      <div>
          {users.map(user=><div key={user._id}>{user.name}{user.age}</div>)}
      </div>
  );
};

export {App};
