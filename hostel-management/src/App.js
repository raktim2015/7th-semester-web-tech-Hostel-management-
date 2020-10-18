import React,{useState} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Admin from './pages/Admin';
import Student from './pages/Student';
import {AuthContext} from './context/auth.js'

function App() {
  const [authTokens, setAuthTokens] = useState();
  
  const setTokens = (data) => {
    localStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
  }

  return (
    <AuthContext.Provider value = {{authTokens, setAuthTokens: setTokens}}>
      <Router>
        <main>
          <Route path = "/" exact component = {LandingPage} />
          <Route path = "/admin" exact component = {Admin} />
          <Route path = "/student" exact component = {Student} />
        </main>    
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
