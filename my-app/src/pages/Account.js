import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import UserService from '../services/UserService';
import UserSidebar from '../components/UserSidebar';
import { getTutorByUser, removeTutor } from '../services/TutorService';
import { getTutorsCourses } from '../services/CourseService';

function Account() {
  const { currentUser } = useAuth();
  const [user, setUser] = useState(null);
  const [tutor_courses,set_tutor_courses]=useState([])
  const [tutor,set_tutor]=useState(null)
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUser = async () => {
      const user = await UserService.getUser(currentUser.uid);
      setUser(user);
      const tutor=await getTutorByUser(user.id);
      set_tutor(tutor);
      
    };

    

    fetchUser();
    
  }, [currentUser]);

  const handleDeleteAccount = async () => {
    if(tutor){
      const courses=await getTutorsCourses(tutor.id);
      set_tutor_courses(courses);
      if(courses.length>0){
        //Tutor has published courses and needs permission to remove account
        console.log("User Needs permission to remove account");
      }else{
        //Tutor has no published courses with enrolled users
        //Delete Tutor
        //await removeTutor(currentUser.uid)
        //Delete User
        //await UserService.removeUser(currentUser);
        //navigate('/');
        
      }
      
    }else{
      await UserService.removeUser(currentUser);
      navigate('/');
    }
    
    

    
  }
  return (
    <div>
      <UserSidebar />
      <h1>Account</h1>
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

export default Account;