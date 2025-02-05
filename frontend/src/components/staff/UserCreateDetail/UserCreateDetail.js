import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import './UserCreateDetail.css';
import Header from '../../shared/Header/Header';

function UserCreateDetail ({handleLoadUser, userDetail}) {
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    //handleLoadUser(parseInt(params.id));
    //if (user) {
    //    setUser(user);
    //} else {
    //    navigate('/');
    //}
  }, []);
//<div>{userDetail.username}</div>
  return (
    <main className='user-create-detail'>
      <Header/>
      
    </main>
  );
}

export default UserCreateDetail;