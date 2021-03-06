import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import ExpandLessRoundedIcon from '@material-ui/icons/ExpandLessRounded';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios'
import {TokenContext} from '../contexts/TokenContext';
import dotenv from 'dotenv'
dotenv.config()
let BACKEND_URL="http://35.230.179.171:3001"

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
  },
  
});

class Livefeed extends React.Component{
  static contextType = TokenContext;
    constructor(props){
        super(props);
        this.state = {
            my_list: [],
           // status: 0
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot){
      console.log(prevProps)
      let my_token = 'Bearer ' + this.context.token;
      console.log(my_token)
  
      if(prevState.my_list.length > 0 && prevProps.position >= 100 ){

        axios({
          method: 'put',
          url: 'https://api.spotify.com/v1/me/player/play',
          data: {
            uris: ['spotify:track:'+prevState.my_list[0].id],
          },
          headers:{
            'Content-Type':'application/json',
            'Authorization': my_token
          }
        })
        .then(res=>{
          console.log("SENT INADM")
          axios.post(BACKEND_URL + '/popSong',{
            group_code: this.context.code,
            id: prevState.my_list[0].id
          })
          .then((res)=>{
            console.log("yooo")
          })
  
          console.log(res)
          //this.setState({status: 0})
        })
      }

    }
    componentDidMount(){

        this.interval = setInterval(
            () =>{
              axios.post(BACKEND_URL + '/getSongs',  {
                group_code: this.context.code
                })
                .then( res =>{  //successful request to backend - set parameters
                  //console.log(res)
                  //res.data.songs = [{id:"n;jkdfbj;kafbj;knf", title:"old town roads", artist:"lil Nas X"},{...}]
                  // res.data.songs[i].id ==
                  //console.log(res.data.songs)
                  if(res.data.songs.length >0){
                    let temp = res.data.songs.sort((a, b) => (a.votes > b.votes) ? -1 : 1)
                    this.setState({my_list: temp})  
                  }else{
                    this.setState({my_list: []})  
                  }

                })
                .catch(err =>{  //otherwise print error
                console.log(err)
            })
            },
            1000
        );
    }
    componentWillUnmount(){
        clearInterval(this.interval);
    }

    upVote(value, event){
      console.log(value)
      
      axios.post(BACKEND_URL + '/upVote',  {
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
  queueUp(){
    //remove song from db (reza)
    //play new song
    /*
    console.log("I GOT CALLED")
    if(this.state.status < 97){
      return
    }
    
    let my_token = 'Bearer ' + this.context.token;
    console.log(my_token)

    if(this.state.my_list.length <= 0){
      return
    }

    axios({
      method: 'put',
      url: 'https://api.spotify.com/v1/me/player/play',
      data: {
        uris: ['spotify:track:'+this.state.my_list[0].id],
      },
      headers:{
        'Content-Type':'application/json',
        'Authorization': my_token
      }
    })
    .then(res=>{
      console.log("QUWUWUW")
      console.log(res)
    })
    */

  }

    mapList(){
      const{ classes } = this.props
      let my_array = []
      this.state.my_list.forEach(value => {
          const labelId = `checkbox-list-secondary-label-${value.id}`;
          my_array.push(
            <ListItem key={value.id}>
              <ListItemAvatar>
                <Avatar
                  alt={`Avatar n°${value + 1}`}
                  src={`${value.img}`}
                />
              </ListItemAvatar>
              <ListItemText id={labelId} primary={`${value.title}`}
              secondary={`${value.artist}`} />
              <ListItemSecondaryAction >
              {value, value.votes}
              <IconButton  edge="end" aria-label="comments" key={value.id} onClick={this.upVote.bind(this, value)}>
                   < ExpandLessRoundedIcon/>
              </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          )
      });
      return my_array;
  }

    render(){
      console.log(this.state.my_list)
        const classes = withStyles();
        return (
          <List dense className={classes.paper}>
            {/*this.state.status*/}
          {this.mapList()}
          </List>
        );
}

}
export default withStyles(styles)(Livefeed);