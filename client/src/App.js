import React, { Component } from 'react';
// import './App.css';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import Route from 'react-router-dom/Route';

const User = ({match}) => {
  return ( <h1> Welcome User {match.params.username} </h1>)
}

class App extends Component {
render () {
  return ( 
    <Router>
      <div className="App">
      
      <ul> 
        <li>
          <Link to="/">Home</Link>
          </li>
          <li>
          <Link to="/about">About</Link>
          </li>
      </ul>
      <Route path="/" exact strict render={
        () => {
          return ( <h1>Welcome to Beautify</h1>);
        }
      }/>
      <Route path="/about" exact strict render={
        () => {
          return ( <h1>About Beautify</h1>);
        }
      }/>
      <Route path="/user/:username" exact strict component ={User} />
    </div>
    </Router>
  );
}
}

// import {
//   BrowserRouter as Router,
//   Route,
//   Switch
// } from "react-router-dom";
// import Freelancers from "./pages/Freelancers";

// function App() {
//   return (
//     <Router>
//       <div>
//         <Nav />
//         <Switch>
//           <Route exact path="/" component={Freelancers} />
//           <Route exact path="/freelancers" component={Freelancers} />
//           <Route exact path="/freelancers/:id" component={Detail} />
//           <Route component={NoMatch} />
//         </Switch>
//       </div>
//     </Router>
//   );
// }

export default App;
