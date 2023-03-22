import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import UserService from '../services/UserService';
import { getTutorByUser, createTutor } from '../services/TutorService';
const TutorSignup = () => {
  const [display_name, set_display_name] = useState('');
  const [work_email, set_work_email] = useState('');
  const [bio, set_bio] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { currentUser } = useAuth();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await UserService.getUser(currentUser.uid);
      setUser(user);
      if (!user) {
        navigate('/login');
      } else {
        const tutor = await getTutorByUser(user.id);
        console.log(tutor);
        if (!tutor) {
          set_display_name(user.name);
          set_work_email(user.email);
        } else {
          //Navigate to tutor profile
          console.log("Already a Tutor");
          navigate('/profile');
        }
      }
    };

    fetchUser();

  }, [currentUser]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      await createTutor({ display_name: display_name, work_email: work_email, user_id: user.uid, bio: bio });
      // Redirect to home page or login page after successful registration
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1>Register</h1>
      {error && <p>{error}</p>}
      <form onSubmit={handleFormSubmit}>
        <label>
          Display Name:
          <input
            type="text"
            value={display_name}
            onChange={(event) => set_display_name(event.target.value)}
          />
        </label>
        <br />
        <label>
          Work Email:
          <input
            type="email"
            value={work_email}
            onChange={(event) => set_work_email(event.target.value)}
          />
        </label>
        <br />
        <label>
          Bio:
          <textarea
            type="email"
            value={bio}
            onChange={(event) => set_bio(event.target.value)}
          />
        </label>
        <br />
        <button type="submit">Become a Tutor</button>
      </form>
    </div>
  );

};

export default TutorSignup;