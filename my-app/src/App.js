import logo from './logo.svg';
import './styles/App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import firebase  from './utils/firebase';

//import components
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
//import Courses from './pages/Courses';
//import CourseDetail from './pages/CourseDetail';
//import EditCourse from './pages/EditCourse';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/profile" component={Profile} />
            {/* <Route exact path="/courses" component={Courses} />
            <Route path="/courses/:id" component={CourseDetail} />
            <Route path="/edit-course/:id" component={EditCourse} /> */}
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
