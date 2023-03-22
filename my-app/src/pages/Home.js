import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPublishedCourses } from '../services/CourseService';

const Home = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const publishedCourses = await getPublishedCourses();
      setCourses(publishedCourses);
    };

    fetchCourses();
  }, []);

  return (
    <div>
      <h1>Welcome to Llamally</h1>
      <p>Here are some of our published courses:</p>
      {courses.map((course) => (
        <div key={course.id}>
          <Link to={`/courses/${course.id}`}>
            <h3>{course.title}</h3>
          </Link>
          <p>{course.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Home;