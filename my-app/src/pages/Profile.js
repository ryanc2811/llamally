import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import UserService from '../services/UserService';
import UserSidebar from '../components/UserSidebar';

function Profile() {
  const { currentUser } = useAuth();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUser = async () => {
      const user = await UserService.getUser(currentUser.uid);
      setUser(user);
    };


    fetchUser();
  }, [currentUser]);
  const handleDeleteAccount = async () => {
    await UserService.removeUser(currentUser);
    navigate('/');
  }
  return (
    <div>
      <UserSidebar />
      <h1>Profile</h1>
      {user ? (
        <>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>User ID: {user.id}</p>
          <p>Email Verified: {currentUser.emailVerified.toString()}</p>
          <br />
          <button
            onClick={(event) => handleDeleteAccount()}>Delete Account</button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Profile;