import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { getQuizzes } from "../services/QuizService";

function Course(props) {
  const [quizzes, setQuizzes] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    async function fetchQuizzes() {
      const quizzes = await getQuizzes(props.course.id);
      setQuizzes(quizzes);
    }
    fetchQuizzes();
  }, [props.course.id]);

  return (
    <div className="course">
      <h2>{props.course.name}</h2>
      <p>{props.course.description}</p>
      <ul>
        {quizzes.map((quiz) => (
          <li key={quiz.id}>
            <Link to={`/courses/${props.course.id}/quizzes/${quiz.id}`}>
              {quiz.name}
            </Link>
            {currentUser && (
              <Link to={`/courses/${props.course.id}/quizzes/${quiz.id}/edit`}>
                Edit
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Course;