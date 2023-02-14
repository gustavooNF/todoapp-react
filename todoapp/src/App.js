import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import ListTaskComponent  from './components/ListTaskComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import CreateTaskComponent from './components/CreateTaskComponent'


function App() {
  return (
        <Router>
              <HeaderComponent/>
                <div className="container">
                    <Switch> 
                      <Route path = "/" exact component = {ListTaskComponent}></Route>
                      <Route path = "/task"  component = {ListTaskComponent}></Route>
                      <Route path = "/add-task/:id"  component = {CreateTaskComponent}></Route>
                    </Switch>
                </div>
              {/* <FooterComponent/> */}
        </Router>
  );
}

export default App;
