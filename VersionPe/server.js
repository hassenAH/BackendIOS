import express from "express"
import UserRoute from"./Routes/User.js"
import mongoose from"mongoose";


import dotenv from"dotenv" ;
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import session from 'express-session'
import passport from 'passport';
import Google from 'passport-google-oauth2'
const g =Google.Strategy;

const options ={
  definition: {
    openapi : '3.0.0',
    info :{
      title :'Bizoz Project ',
      version : '1.0.0'
    },
    servers:[
      {
        url: 'http://localhost:5000/'
      }
    ]
  },
  apis: ["./Routes/*.js"],
}

const swaggerSpec = swaggerJSDoc(options)

dotenv.config({path:'./config/config.env'});


const app = express();
app.use(express.urlencoded({extended: true, limit: '50mb'}));

const databaseName = "bizos"; // L'@ du serveur
const port = process.env.PORT || 9090; // Le port du serveur

  mongoose.set("debug", true);
  mongoose.Promise = global.Promise;

  mongoose
    .connect(`mongodb://localhost:27017/${databaseName}`)
    .then(() => {
      console.log(`connected to ${databaseName}`);
    })
    .catch((err) => {
      console.log(err);
    });

app.use(express.json());

app.use("/user", UserRoute);
app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerSpec))
app.use(session({
  secret: "secret",
  resave: false ,
  saveUninitialized: true ,
}))
app.use(passport.initialize()) // init passport on every route call
app.use(passport.session())    //allow passport to use "express-session"
const GOOGLE_CLIENT_ID = "825384301124-ildkjgm6nklsd5h1e71j33ac9apatd8i.apps.googleusercontent.com"
const GOOGLE_CLIENT_SECRET = "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"
var authUser = (request, accessToken, refreshToken, profile, done) => {
  return done(null, profile);
}
passport.use(new g({
  clientID:     GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:5000/auth/google/callback",
  passReqToCallback   : true
}, authUser));


passport.serializeUser( (user, done) => { 
  console.log(`\n--------> Serialize User:`)
  console.log(user)
   // The USER object is the "authenticated user" from the done() in authUser function.
   // serializeUser() will attach this user to "req.session.passport.user.{user}", so that it is tied to the session object for each session.  

  done(null, user)
} )

passport.deserializeUser((user, done) => {
  console.log("\n--------- Deserialized User:")
  console.log(user)
  // This is the {user} that was saved in req.session.passport.user.{user} in the serializationUser()
  // deserializeUser will attach this {user} to the "req.user.{user}", so that it can be used anywhere in the App.

  done (null, user)
}) 




/* Demarrer le serveur a l'ecoute des connexions */
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});



app.get('/auth/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
));

app.get('/auth/google/callback',
    passport.authenticate( 'google', {
        successRedirect: '/dashboard',
        failureRedirect: '/login'
}));

//Define the Login Route
app.get("/login", (req, res) => {
    res.render("login.ejs")
})


//Use the req.isAuthenticated() function to check if user is Authenticated
const checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) { return next() }
  res.redirect("/login")
}

//Define the Protected Route, by using the "checkAuthenticated" function defined above as middleware
app.get("/dashboard", checkAuthenticated, (req, res) => {
  res.render("dashboard.ejs", {name: req.user.displayName})
})

//Define the Logout
app.post("/logout", (req,res) => {
    req.logOut()
    res.redirect("/login")
    console.log(`-------> User Logged out`)
})