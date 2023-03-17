import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CourseService from '../services/CourseService';

const Home = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const publishedCourses = await CourseService.getPublishedCourses();
      setCourses(publishedCourses);
    };

    fetchCourses();
  }, []);

  return (
    <div>
      <h1>Welcome to our e-learning platform</h1>
      <p>Here are some of our published courses:</p>
      {courses.map((course) => (
        <div key={course.id}>
          <Link to={`/courses/${course.id}`}>
            <h3>{course.name}</h3>
          </Link>
          <p>{course.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Home;