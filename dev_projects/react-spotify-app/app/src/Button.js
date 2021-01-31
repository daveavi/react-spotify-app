import './App.css';
import React, {Component} from "react";


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

export default LoginButton;