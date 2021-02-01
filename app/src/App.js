import './App.css';
import React, {Component} from "react";
import SpotifyWebApi from 'spotify-web-api-js';

const spotifyWebApi = new SpotifyWebApi(); 


class App extends Component{
  constructor(props){
    super(props);
    const params = this.getHashParams()
    this.state = {
       nowPlaying: {
         gotName : false, 
         name: "",
         image: '',
       },
       loggiedIn : params.access_token ? true : false 
    }

    if (params.access_token){
      console.log(params.access_token)
      spotifyWebApi.setAccessToken(params.access_token)
    }

    this.getNowPlaying = this.getNowPlaying.bind(this)


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

  getNowPlaying(){
    spotifyWebApi.getMyCurrentPlayingTrack().then((response) => {
          console.log(response)
          this.setState({
            nowPlaying:{
              name: response.item.name,
              image : response.item.album.images[0].url
            }
          })
      })
  }


  render(){
    return(
      <div className="App">
        <h1>
          Personal Spotify Stats 
        </h1>
        <div className ="ButtonContainer">
          {this.state.loggiedIn 
            ? <button onClick={this.getNowPlaying} className="ButtonSize">What song is playing right now?</button>
            : <LoginButton/>
          }
        </div>
          {this.state.nowPlaying.name
            ? <CurrentSong name={this.state.nowPlaying.name} image = {this.state.nowPlaying.image}/>
            : null
          } 





        
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

class LoginButton extends Component{
  render(){
      return(
          <div className ="ButtonContainer">
            <a href='http://localhost:8888'>
                <button className="ButtonSize">Login With Spotify</button>
            </a>
          </div>
      );
  }
}

export default App;
