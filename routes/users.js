const express = require('express');
const router = new express.Router();
const knex = require('../db/knex')

//the login route
router.post('/newHost', function(req, res) {
    //grab credentials from request
    let name = req.body.group_name;

    //query db with username and password 

    knex('groups')
    .insert(
        {
            name: name,
            voted_songs: {
                songs:[]
            }, 
            code: uuidv4() 
        }
    )
    .returning(['*'])
    .then((group)=>{ //if we find user then success
        if(group.length != 0){
            res.status(200).json({code: group[0].code ,message: "succesfully created group", auth: true})
        }
        else{
            res.status(200).json({message: "Group name already taken", auth: false})
        }
    })
    .catch(err=>{ //catch err
        console.log(err);
        res.status(500).json(err);
    })
    
});


//the login route
router.post('/joinGroup', function(req, res) {
    //grab credentials from request
    let nickname = req.body.nickname;
    let group_code = req.body.group_code;

    //query db with username and password 

    knex('groups')
    .where('code', group_code)
    .first()
    .then((group)=>{ //if we find group then success
        if(group){
            knex('users')
            .insert(
                {
                    nickname,
                    group_id: group.id
                }
            )
            .then(()=>{
                res.status(200).json({message: "succesfully added to group", auth: true})
            })
            .catch((err=>{
                console.log(err)
                res.status(200).json({message: "Nickname taken or group code doesnt exist", auth: false})
            }))
        }
        else{
            res.status(200).json({message: "group code doesnt exist", auth: false})
        }
    })
    .catch(err=>{ //catch err
        console.log(err);
        res.status(500).json(err);
    })
    
});





function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
  
  module.exports = router;