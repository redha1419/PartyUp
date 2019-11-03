const express = require('express');
const router = new express.Router();
const knex = require('../db/knex')
const axios = require('axios')

router.post('/popSong', function(req,res){
    console.log("got yeeted")
    let group_code = req.body.group_code;
    let song_id = req.body.id;
    knex('groups')
    .where('code', group_code)
    .first()
    .then(group=>{
        if(group){
            //delete
            /*
            let my_list = []
            if(group.voted_songs.songs.length > 0){
                my_list = group.voted_songs.songs.sort((a, b) => (a.votes > b.votes) ? -1 : 1);
                my_list.shift()
            }
            */
           
            /*
           for(let i=0; i<group.voted_songs.songs.length; i++){
                if(song_id == group.voted_songs.songs[i].id){
                    group.voted_songs.songs.splice(i, 1);
                }
           }
           */
           

            knex('groups')
            .where('code', group_code)
            .update('voted_songs', {songs:[]})
            .then(()=>{
                res.status(200).json({message: "succesfully deleted", auth: true})
            })
            .catch(err=>{
                console.log(err);
                res.status(500).json(err);
            })
        }
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json(err);
    })
})

//the login route
router.post('/upVote', function(req, res) {
    //grab credentials from request
    let nickname = req.body.nickname;
    let song = req.body.song;
    let group_code = req.body.group_code;

    //query db with group code  
    knex('groups')
    .where('code', group_code)
    .first()
    .then(group=>{
        if(group){
            //if valid group_code, grab nickname to check if your in there
        //now take song and update the group json
        new_vote = updateVote(group.voted_songs.songs, song)
        knex('groups')
        .where('id', group.id)
        .update('voted_songs', {songs: new_vote})
        .then(()=>{
            //success
            res.status(200).json({message: "succesfully voted", auth: true})
        })
        .catch(err=>{
            //err
            console.log(err);
            res.status(500).json(err);
        })
    
        }else{
            //good erro message
            res.status(200).json({message: "group not found", auth: false})
        }
    })
    .catch(err=>{
        //err
        console.log(err);
        res.status(500).json(err);
    })  
});


router.post('/getSongs', function(req,res){
    let group_code = req.body.group_code;

    knex('groups')
    .where('code', group_code)
    .first()
    .then(group =>{
        res.status(200).json({songs: group.voted_songs.songs})
    })
    .catch(err=>{
        res.status(403).json({message: "error"})
    })
});


router.post('/search', function(req,res){
    let search = req.body.search;
    let group_code = req.body.group_code;

    //grab the group token
    knex('groups')
    .where('code', group_code)
    .first()
    .then(group=>{
        if(group){
            //my magic token
            let spotify_token = 'Bearer ' + group.spotify_token;
            let q = search; 
            console.log(spotify_token)
            console.log(q)
            axios.get('https://api.spotify.com/v1/search/',{
                params:{
                    q,
                    type: 'track',
                    limit: '5'
                },
                headers: {
                    'Authorization': spotify_token
                }
            })
            .then(songs=>{
                console.log(songs.data.tracks.items[0].artists[0].name)
                let clean_list = [];
                for (let i =0; i<songs.data.tracks.items.length; i++){
                    clean_list.push({
                        artist: songs.data.tracks.items[i].artists[0].name,
                        id: songs.data.tracks.items[i].id,
                        title: songs.data.tracks.items[i].name
                    })
                }
                res.status(200).json({songs: clean_list})
            })
            .catch(err=>{
                console.log(err)
                res.status(403).json({message: "Couldnt get search results from spotify?"})
            })
        }
        else{
            res.status(403).json({message: "bad group_code"})
        }
    })
    .catch(err=>{
        console.log(err)
        res.status(403).json({message: "Database error?"})
    })

})

function updateVote(old_vote, song){
    // my vote song structure : {id: "some_id", votes: #}
    for(let i=0; i<old_vote.length; i++){
        if(old_vote[i].id === song.id){
            old_vote[i].votes ++;
            return old_vote;
        }
    }

    old_vote.push({...song, votes: 1});
    old_vote.sort((a, b) => (b.votes > a.votes) ? -1 : 1)
    return old_vote;
}
  
module.exports = router;