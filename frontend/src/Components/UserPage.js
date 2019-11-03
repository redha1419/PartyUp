import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

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
    backgroundColor: '#304269',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  root: {
    background: '#F26101',
    border: 0,
    borderRadius: 3,
    boxShadow: '#D9E8F5',
    color: 'white',
    height: 48,
    padding: '0 30px',
  },
  root1: {
    color: '#F26101',
  },
});

class UserPage extends React.Component {
  constructor(props){
    super(props)
  }
  render(){
  const{ classes } = this.props
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
        <MusicNoteIcon />
        </Avatar>
        <Typography className={classes.root1} component="h1" variant="h5">
          User Sign In 
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="NickName"
            label="NickName"
            name="NickName"
            autoComplete="NickName"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="Code"
            label="Code"
            type="Code"
            id="Code"
            autoComplete="current-code"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className= {classes.root}
          >
            Join
          </Button>
          <Grid container>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
}; 

export default withStyles(styles)(UserPage)