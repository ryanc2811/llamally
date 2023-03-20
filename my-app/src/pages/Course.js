import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { getCourseById } from "../services/CourseService";
import { getTutor } from "../services/TutorService";
function Course() {
  const { currentUser } = useAuth();
  const [course, setCourse] = useState({});
  const [tutor,setTutor]=useState({});
  const { id } = useParams();

  useEffect(() => {
    async function fetchCourse() {
      const course = await getCourseById(id);
      setCourse(course);
      const tutor=await getTutor(course.tutor_id);
      setTutor(tutor);
    }

    fetchCourse();
 
  }, [id]);

  return (
    <div>
      <h1>{course.title}</h1>
      <h3>Tutor: {tutor?.display_name}</h3>
      <p>Description: {course.description}</p>
      {currentUser && (
        <>
          {currentUser.uid === tutor.user_id && (
            <button>Edit Course</button>
          )}
          <button>Enroll in Course</button>
        </>
      )}
    </div>
  );
}

export default Course;