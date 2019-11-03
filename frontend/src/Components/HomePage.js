import React from 'react';
import logo from '../logo.svg';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import '../App.css';
import SpotifyWebPlayer from 'react-spotify-web-playback';


const styles = theme => ({
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
});

export const clientId = "ca01bcb9c7bb4fcba110e037d4206258"
export const authEndpoint = 'https://accounts.spotify.com/authorize?';
export const redirectUri = "http://localhost:3000/verify";
export const scopes = [
  "streaming",
  "user-read-email",
  "user-read-private",
  "user-read-playback-state",
  "user-modify-playback-state",
  "app-remote-control",
  "user-modify-playback-state",
  "user-read-currently-playing",
  "user-read-playback-state"
];

// Get 

// Get the hash of the url
const hash = window.location.hash
  .substring(1)
  .split("&")
  .reduce(function(initial, item) {
    if (item) {
      var parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);
    }
    return initial;
  }, {});

window.location.hash = "";

class HomePage extends React.Component {
  //static contextType = TokenContext;
  constructor(props){
    super(props)
    
    this.state ={
      token: ""
    }
  
  }
  componentDidMount() {
    // Set token
    let _token = hash.access_token;
    console.log(_token)
    if (_token) {
      // Set token
      this.setState({
        token: _token
      });
    }
  }
  render() {
    console.log(this.state.token)
    const{ classes } = this.props
    return (
    <div className="App">
      
      <header className="App-header">
        <h1>
          Welcome
        </h1>
        <img src={logo} className="App-logo" alt="logo" />

        {!this.state.token && (
        <Button variant="contained" color="primary" className={classes.button}
         href={`${authEndpoint}client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`}
        >
         Hosting a Party?
        </Button>
        )}
      <Button variant="contained" color="secondary" className={classes.button} onClick={()=>{this.props.history.push('/user')}}>
      Joining a Party?
      </Button>
        
        
      </header>
      
    </div>
  );
  }
}

export default withStyles(styles)(HomePage)