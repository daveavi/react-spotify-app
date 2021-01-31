import './App.css';
import LoginButton from "./Button"
import React, {Component} from "react";



class App extends Component{
  constructor(props){
    super(props);
    const params = this.getHashParams()
    this.state = {
       nowPlaying: {
         name: "Not Checked",
         image: ''
       },
       loggiedIn : params.access_token ? true : false 
    }
  }


  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }


  render(){
    return(
      <div className="App">
        <h1>
          Personal Spotify Stats 
        </h1>

        {this.state.loggiedIn 
          ? null
          : <LoginButton/>
        }
        
        {this.state.loggiedIn && <CurrentSong name={this.state.nowPlaying.name}  image={this.state.nowPlaying.image}/>}
      </div>
    );
  }
}


class CurrentSong extends Component {
  render(){
    return(
      <div>
          <h1>Now Playing: {this.props.name}</h1>
          <div>
            <img src = {this.props.image} style={{width: 100}}/>
          </div>
      </div>
    );
  }
}

export default App;
