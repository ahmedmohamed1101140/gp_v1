var passport              = require("passport");
var User                  = require("../models/user");
var LocalStrategy         = require("passport-local");


passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());// serialize the session itself (id of user)
passport.deserializeUser(User.deserializeUser()); //retrive the USermodel from DB
