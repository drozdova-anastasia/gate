import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import './UserDetail.css';
import Header from '../../shared/Header/Header';

function UserDetail ({handleLoadUser, userDetail}) {
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    handleLoadUser(parseInt(params.id));
    //if (user) {
    //    setUser(user);
    //} else {
    //    navigate('/');
    //}
  }, []);

  return (
    <main className='user'>
      <Header/>
      <div>{userDetail.username}</div>
    </main>
  );
}

export default UserDetail;