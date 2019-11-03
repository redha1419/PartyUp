import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import SearchSharpIcon from '@material-ui/icons/SearchSharp';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios'
import CheckboxListSecondary from './Textfield'


const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: theme.spacing(2),
      },
      textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
      },
});

class InputWithIcon extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            search_name: "",
            my_list: []
        }
    }
    onSubmit = (e) => {

        e.preventDefault(); 
        axios.post('http://localhost:3001/search',  {
            group_name: "123456",
            search_name: this.state.search_name
            })
            .then( res =>{  //successful request to backend - set parameters
            console.log(res)
            //res.data.songs = [{id:"n;jkdfbj;kafbj;knf", title:"old town roads", artist:"lil Nas X"},{...}]
           // res.data.songs[i].id ==
            this.setState({my_list: res.data.songs})

            })
            .catch(err =>{  //otherwise print error
            console.log(err)
        })
    }

    render(){
        const{ classes } = this.props
    return (
        <div>
            <form className={classes.container} autoComplete='off' onSubmit = {this.onSubmit}>

            <div className={classes.container}>
                <Grid container spacing={1} alignItems="flex-end">
                <Grid item>
                    <SearchSharpIcon />
                </Grid>
                <Grid item>
                    <TextField id="input-with-icon-grid" label="Search Track" 
                    value = {this.state.search_name}
                    onChange = {(e) => {this.setState({search_name: e.target.value})}}
                    />
                </Grid>
                </Grid>
            </div>
        </form>
        <CheckboxListSecondary listToShow={this.state.my_list}/>
        </div>
        );
    }
}

export default withStyles(styles)(InputWithIcon)