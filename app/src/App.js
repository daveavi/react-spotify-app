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
         name: "",
         image: ''
       },
       topArtist: {
         name: "",
         image : ''
       },

       loggiedIn : params.access_token ? true : false 
    }

    if (params.access_token){
      console.log(params.access_token)
      spotifyWebApi.setAccessToken(params.access_token)
    }

    this.getNowPlaying = this.getNowPlaying.bind(this)
    this.getTopArtist = this.getTopArtist.bind(this)


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


  getTopArtist(){
    spotifyWebApi.getMyTopArtists().then((response) => {
        let currentTopArtist = response.items[0]
        this.setState({
          topArtist:{
            name: currentTopArtist.name,
            image : currentTopArtist.images[0]
          }
        })
        console.log(this.state.topArtist)
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
            ? <AskStats getNowPlaying={this.getNowPlaying} getTopArtist={this.getTopArtist} />
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


class AskStats extends Component{
  render(){
      return(
        <div>
          <button onClick={this.props.getNowPlaying} className="ButtonSize">What song is playing right now?</button> 
          <br></br> <br></br>
          <button onClick={this.props.getTopArtist} className="ButtonSize">Who are my top played artists right now?</button>
        </div>

      );



  }
}

export default App;
