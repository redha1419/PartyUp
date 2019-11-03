const express = require('express');
const router = new express.Router();
const knex = require('../db/knex')
const axios = require('axios')

//the login route
router.post('/voteSong', function(req, res) {
    //grab credentials from request
    let nickname = req.body.nickname;
    let song = req.body.song;
    let group_code = req.body.group_code;

    //query db with username and password 

    knex('groups')
    .where('code', group_code)
    .first()
    .then(group=>{
        if(group){
            //make sure person is in this group
            knex('users')
            .where(
                {
                    nickname,
                    group_id: group.id
                }
            )
            .first()
            .then(user=>{
                //now take song and update the group json
                new_vote = updateVote(group.voted_songs, song)
                knex('projects')
                .where('id', group.id)
                .update('voted_songs', new_vote)
                .then(()=>{
                    //success
                    res.status(200).json({message: "succesfully voted", auth: true})
                })
                .catch(err=>{
                    //err
                    console.log(err);
                    res.status(500).json(err);
                })
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

/*
router.post('/getSong', function(req,res){
    let group_code = req.body.group_code

    knex('groups')
    .where('code', group_code)
    .first()
    .then(group =>{
        
    })
});
*/

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
                let clean_list = [];
                for (let i =0; i<songs.tracks.items.length(); i++){
                    clean_list.push({
                        artist: songs.tracks.items[i].artists[0].artist,
                        id: songs.tracks.items[i].id,
                        title: songs.tracks.items[i].name
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
            
        }
    })
    .catch(err=>{
        console.log(err)
        res.status(403).json({message: "Database error?"})
    })

})

function updateVote(old_vote, song){
    // my vote song structure : {id: "some_id", votes: #}
    for(let i=0; i<old_vote.length(); i++){
        if(old_vote.songs[i].id === song){
            old_vote.songs[i].votes ++;
            return old_vote;
        }
    }

    old_vote.songs.push({id: song, votes: 1});
    return old_vote;
}
  
module.exports = router;