const express = require("express");
const app = express();
app.use(express.json());
//create a note: -
const notes = []; //local database
const users = [{
    username: "gaurang",
    password: "123123"
},{
    username: "dhall",
    password: "456456"
}]

//signup: -
app.post("/signup", function(req, res){
    const requestedUserName = req.body.username; 
    const requestedPassword = req.body.password;
    const userExists = users.find((user) => user.username === requestedUserName)
    if(userExists){
        return res.status(403).send({
            msg: "this user already exists"
        })
    }
    users.push({username: requestedUserName,
        password: requestedPassword});
    res.json({
        msg: "you have signed up successfully!"
    })
})

//sign-in: -
app.post("sign-in", function(req, res){
    const requestedUserName = username;
    const requestedPassword = password;
    const userExists = users.find(user => user.username === requestedUserName && user.password === requestedPassword);
    if(!userExists){
        return res.status(403).json({
            msg: "user does not exist"
        })
    }
    //json webtokens -> jwt
    const token = jwt.sign({
        username: requestedUserName,
        password: requestedPassword
    },"gaurang456")
    res.json({
        token: token
    })
})

app.post("/note", function(req, res){
    //check if user is logged in: -
    const token = req.body.token;
    if(!token){
        return res.status(403).send({
            status: "user not signed in!, otherwise token would've been generated... this means that user hasn't registered"
        })
    }
    const decoded = jwt.verify(token, "gaurang456");
    if(!decoded){
        return res.status(403).json({
            response: "incorrect token"
        })
    }
    const temp = req.body.note;
    notes.push(temp);
    res.json({
        msg: "done!"
    })
})

//get all notes: -
app.get("/note", function(req, res){
    res.send(
        notes
    )
})

//extract the frontend from client: -
app.get("/note", function(req, res){
    res.sendFile("/", "c:\Users\Gaurang Dhall\OneDrive\Desktop\coding\Harkirat WebDev\Backend\b\Express\Authentication\index.html");
})