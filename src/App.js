import './App.css';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import Nav from './components/NavBar';
import { Switch } from 'react-router-dom';
import { Route } from 'react-router';
import Home from './components/Home';
import AddContact from './components/AddContact';
import EditContact from './components/EditContact';


const App=() => {
  return (
    <div className="App">
      <ToastContainer/>
      <Nav/>
      <Switch>
        <Route exact path="/" component= {()=> <Home/>}>
        </Route>
        <Route path="/add">
          <AddContact/>
        </Route>
        <Route path="/edit/:id">
          <EditContact/>
        </Route>
      </Switch>
      
    </div>
  );
}

export default App;
