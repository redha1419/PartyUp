import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import ExpandLessRoundedIcon from '@material-ui/icons/ExpandLessRounded';
import Avatar from '@material-ui/core/Avatar';
import axios from 'axios'
import {TokenContext} from '../contexts/TokenContext';

const styles = theme => ({
    '@global': {
        body: {
          backgroundColor: theme.palette.common.white,
        },
      },
    paper: {
        marginTop: theme.spacing(5),
        maxWidth: 600,
        margin: '0 auto'
  }
})

class CheckboxListSecondary extends React.Component {
    static contextType = TokenContext;
    constructor(props){
        super(props);
    }
    upVote(value, event){
        console.log(value)

        axios.post('http://localhost:3001/upVote',  {
          group_code: this.context.code,
          song: value
          })
          .then( res =>{  //successful request to backend - set parameters
          console.log(res)
            //res.data.songs = [{id:"n;jkdfbj;kafbj;knf", title:"old town roads", artist:"lil Nas X"},{...}]
            console.log("good")
          })
          .catch(err =>{  //otherwise print error
          console.log(err)
      })
    }
    mapList(){
        const{ classes } = this.props
        let my_array = []
        let array1 = this.props.listToShow
        array1.forEach(value => {
            const labelId = `checkbox-list-secondary-label-${value.id}`;
            my_array.push(
              <ListItem key={value.id}>
                <ListItemAvatar>
                  <Avatar
                    alt={`Avatar n°${value + 1}`}
                    src={`${value.img}`} //value.image
                  />
                </ListItemAvatar>
                <ListItemText id={labelId} primary={`${value.title}`}
                secondary={`${value.artist}`} />
                <ListItemSecondaryAction >
                <Button  edge="end" aria-label="comments" key={value.id} onClick={this.upVote.bind(this, value)}>
                     < ExpandLessRoundedIcon/>
                </Button>
                </ListItemSecondaryAction>
              </ListItem>
            )
        });
        return my_array;
    }



    render(){
        console.log(this.props.listToShow)
        const{ classes } = this.props
        return (
            <List dense className={classes.paper}>
            {this.mapList()}
            </List>
          );
    }
 
}

export default withStyles(styles)(CheckboxListSecondary);