import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import InputWithIcon from './NavBar'
import LiveFeed from './Live'




import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 600,
    margin: '0 auto'
  },
});

class CenteredTabs extends React.Component {
    constructor(props){
        super(props)
        this.state ={
            value: 0
        }
    }
    handleChange(event, newValue){
        this.setState({value: newValue});
    };
    render(){
        const{ classes } = this.props
        return(
            <Paper className={classes.root}>
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

            {this.state.value == 1 ? <InputWithIcon/> : <LiveFeed/>}
            {/*this.state.value == 1 ? <CheckboxListSecondary/> : <div></div>*/}
      
          </Paper>
        );
    }
}

export default withStyles(styles)(CenteredTabs)