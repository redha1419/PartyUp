import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios'
import {TokenContext} from '../contexts/TokenContext';
//import {AuthContext} from './contexts/AuthContext';

const styles = theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

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

class VerifyHostPage extends React.Component {
  static contextType = TokenContext;
  constructor(props){
    super(props)
    this.state ={
      token: "",
      group_name: ""
    }
  }
  componentDidMount() {
    // Set token
    // Get the hash of the url

    let _token = hash.access_token;
    console.log(_token)
    if (_token) {
      // Set token
      this.setState({
        token: _token
      });
      //this.context.setToken(_token)
    }
  }
  createGroup(e){
    e.preventDefault(); 

    axios.post('http://localhost:3001/newHost',  {
      group_name: this.state.group_name,
      token: this.state.token
      })
      .then( res =>{  //successful request to backend - set parameters
        console.log(res)
        if(res.data.auth){
          console.log("here")
          this.context.setToken(this.state.token)
          this.props.history.push('/')
        }
        //this.props.history.push('/')
      })
      .catch(err =>{  //otherwise print error
        console.log(err)
    }) 

  }
  render(){
  const{ classes } = this.props

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
        </Avatar>
        <Typography component="h1" variant="h5">
          Create a group name!
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Group name"
            autoComplete="Group Name"
            autoFocus
            value={this.state.group_name}
            onChange={(e)=>{this.setState({group_name: e.target.value})}}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={this.createGroup.bind(this)}
            className={classes.submit}
          >
            Sign In
          </Button>
        </form>
      </div>
    </Container>
  );
}
}; 

export default withStyles(styles)(VerifyHostPage)