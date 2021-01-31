import './App.css';
import React, { Component} from "react";


class App extends Component{
  constructor(props){
    super(props);
  }



  render(){
    return(
      <div className="App">
        <h1>
          Avi's Spotify Stats 
        </h1>
        <div className ="ButtonContainer">
          <button className="ButtonSize">Most Played Songs</button>
        </div>
      </div>
    );
  }
}

export default App;
