import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import InputWithIcon from './NavBar'
import LiveFeed from './Live'
import SpotifyWebPlayer from 'react-spotify-web-playback';
import {TokenContext} from '../contexts/TokenContext';



import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 600,
    margin: '0 auto',
    marginTop: '50px'
  },
});

class CenteredTabs extends React.Component {
  static contextType = TokenContext;
    constructor(props){
        super(props)
        this.state ={
            value: 0,
            status: 0
        }
    }
    handleChange(event, newValue){
        this.setState({value: newValue});
    };
    componentDidUpdate(prevProps, prevState, snapshot){
      console.log(prevState.status)
      if(prevState.status >= 100){
        this.setState({status: 0})
      }
    }
    render(){
        const{ classes } = this.props
        return(
          <div>
          <div style={{textAlign:'center', marginBottom:'13px', marginTop:'20px'}}>
          Group code: {this.context.code}
          </div>
          
            <Paper className={classes.root}>
              {this.context.token && (
                    <SpotifyWebPlayer
                    token={this.context.token}
                    uris={["spotify:track:78QR3Wp35dqAhFEc2qAGjE"]}
                    callback={(state)=>{this.setState({status: state.position})}}
                />
          )}
            <Tabs
              value={this.state.value}
              onChange={this.handleChange.bind(this)}
              indicatorColor="primary"
              textColor="primary"
              centered
            >
              <Tab label="Live" />
              <Tab label="Search" />
            </Tabs>

            {this.state.value == 1 ? <InputWithIcon/> : <LiveFeed position={this.state.status}/>}
            {/*this.state.value == 1 ? <CheckboxListSecondary/> : <div></div>*/}
      
          </Paper>
          </div>
        );
    }
}

export default withStyles(styles)(CenteredTabs)