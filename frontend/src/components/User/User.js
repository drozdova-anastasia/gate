import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import './User.css';

function User ({handleLoadUser}) {
  const [user, setUser] = useState({});
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const user = handleLoadUser(parseInt(params.id));
    if (user) {
        setUser(user);
    } else {
        navigate('/');
    }
  }, []);

  return (
    <>
      <main className='user'>
        <div>!!!</div>
        <div>{user.username}</div>
      </main>
    </>
  );
}

export default User;