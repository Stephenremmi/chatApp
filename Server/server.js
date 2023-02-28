const express = require('express')
const app = express();
const jwt = require('jsonwebtoken');
const session = require('express-session')
const bodyParser = require('body-parser')
const cors = require('cors');
const auth_users_routes = require('./router/auth_users.js').authenticated;
let users = require('./router/auth_users.js').users;
let loggedin_users = require('./router/auth_users.js').loggedin_users;
let isValid = require('./router/auth_users.js').isValid;

app.use( bodyParser.json() )
app.use(bodyParser.urlencoded({
    extended: true}))
app.use(cors())

const io = require('socket.io')(3000, {
    cors: {
        origin: ["http://localhost:8080"],
    },
});
app.use(express.json());
app.use("/customer",session({secret:"fingerprint_user",resave: true, saveUninitialized: true}));


app.post('/register', (req,res)=> {
    try{
        console.log(req.body.telnumber)
        console.log(req.body.password)
    const telnumber = req.body.telnumber;
    const password = req.body.password;
    const username = req.body.fname
    console.log(username)
    if(telnumber && password){
        if(!isValid(telnumber)){
            users.push({"telnumber": telnumber, "password": password,"username": username})
            console.log(users)
           // res.status(200).json({message:"user Successfully registered now you can log in!"})
            return res.redirect("http://127.0.0.1:5500/chatApp/client/Authentication/Login.html")
        }else {
            return res.status(404).json({message: "unable to register user the telephone number is already in use!"})
        }
    }
    }catch {
    res.status(500).send();
}
})
io.on('connection', socket => {
    console.log(socket.id)
    socket.on("send-message", message => {
        socket.broadcast.emit('receive-message', {
            message: message,

        })
    })
})
io.on('connection', socket => {
    users.forEach(data => {
        const { username , telnumber } = data;
        socket.emit('login', { telnumber,username})
    })
})

app.use('/customer', auth_users_routes);
app.listen(5000, () => console.log("Server is running!"))
