import React, {Component} from 'react';


import './App.css';
import AppBar from './ui/AppBar';

class App extends Component {
  render(){
    const logo = 'Pessoas'
    return (
    <div className="container-fluid">
     <AppBar className = 'logo'logo = {logo}/>
     {this.props.children}
    </div>
  );
  }
}

export default App;
