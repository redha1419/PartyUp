import React from 'react';
import logo from '../logo.svg';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import '../App.css';

const styles = theme => ({
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
});


class HomePage extends React.Component {
  constructor(props){
    super(props)
  }
  render() {
    const{ classes } = this.props
    return (
    <div className="App">
      
      <header className="App-header">
        <h1>
          Welcome
        </h1>
        <img src={logo} className="App-logo" alt="logo" />
        <h1>

        </h1>
        <Button variant="contained" color="primary" className={classes.button} onClick={()=>{this.props.history.push('/user')}}>
        Joining a Party?
      </Button>
      <Button variant="contained" color="secondary" className={classes.button} onClick={()=>{this.props.history.push('/verify')}}>
        Hosting a Party?
      </Button>
        
        
      </header>
      
    </div>
  );
  }
}

export default withStyles(styles)(HomePage)