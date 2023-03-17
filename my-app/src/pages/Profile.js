import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getUserById } from '../services/UserService';

function Profile() {
  const { currentUser } = useAuth();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUserById(currentUser.uid);
      setUser(user);
    };
    fetchUser();
  }, [currentUser]);

  return (
    <div>
      <h1>Profile</h1>
      {user ? (
        <>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>User ID: {user.id}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Profile;