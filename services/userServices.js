const database = require('../utils/firebase');

const getUsers = (req, res) =>{
    const UsersRef  = database.ref('Users');

    UsersRef.once('value', (snap) => {
        const users = snap.val();

        const result = Object.entries(users);

        let final = [];
        for(let i = 0; i < result.length; i++){
            var obj = result[i][1];
            Object.assign(obj, {id: result[i][0]});
            final.push(obj);
        }

        res.json({users: final}).status(200);
    })
}

const getUser = (req, res) => {
    const UsersRef = database.ref('Users/' + req.params.id);

    UsersRef.once('value', (snap) => {
        res.json(snap.val()).status(200);
    })
}

const setUser = (req, res) =>{
    const UsersRef  = database.ref('Users');
    const body = req.body;
    UsersRef.push().set(body, function(error) {
        if (error) {
            // The write failed...
            console.log("Failed with error: " + error);
            res.json({
                message:'não funcionou'
            }).status(400);
          } else {
            // The write was successful...
            console.log("success");
            res.status(200).json(body);
          }
      })
}

const deleteUser = (req, res) => {
    const UsersRef  = database.ref('Users/' + req.params.id);
    UsersRef.remove();
    
    res.json({
        id:req.params.id
    }).status(200);    
}

const updateUser = (req, res) => {
    const UsersRef = database.ref('Users/' + req.params.id);
    const body = req.body;

    UsersRef.set(body, function(error){
        if (error) {
            // The write failed...
            console.log("Failed with error: " + error);
            res.json({
                message:'não funcionou'
            }).status(400);
          } else {
            // The write was successful...
            console.log("success");
            res.json(body).status(200);
          }
    })
}

module.exports = {
    getUsers,
    getUser,
    setUser,
    deleteUser,
    updateUser
}