import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Admin from './pages/Admin';
import Student from './pages/Student';


function App() {
  return (
    <Router>
      <main>
        <Route path = "/" exact component = {LandingPage} />
        <Route path = "/admin" exact component = {Admin} />
        <Route path = "/student" exact component = {Student} />
      </main>    
    </Router>
  );
}

export default App;
