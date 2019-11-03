import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import ExpandLessRoundedIcon from '@material-ui/icons/ExpandLessRounded';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles(theme => ({
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
  
}));

export default function LiveFeed() {
  const classes = useStyles();

  return (
    <List dense className={classes.paper}>
      {[0, 1, 2, 3,4,5,6,7,8,9,10].map(value => {
        let labelId = `checkbox-list-secondary-label-${value}`;
        return (
          <ListItem key={value} button>
            <ListItemAvatar>
              <Avatar
                alt={`Avatar n°${value + 1}`}
                src={`/static/images/avatar/${value + 1}.jpg`}
              />
            </ListItemAvatar>
            <ListItemText id={labelId} primary={`List  ${value + 1}`}
            secondary={'Secondary text'} />
            <ListItemSecondaryAction>
            {value}
            <IconButton edge="end" aria-label="comments">
            <ExpandLessRoundedIcon></ExpandLessRoundedIcon>
            </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
  );
}