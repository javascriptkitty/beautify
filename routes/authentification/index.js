const express = require("express");
const router = express.Router();
const passport = require("passport");
// const db = require("../../models");
const providersController = require('../../controllers/providersController');


router.get("/user", (req, res) => {
   const user = req.user;
   providersController.getProviderIdByUserId(user.id)
   .then(provider => {
      if (provider && provider.length) {
         user.providerId = provider[0].id;
      }
      res.json({ 
         loggedIn: req.isAuthenticated(),
         user: req.user     
      });
   });
})

router.post("/signup", (req, res, next) => {

   console.log("SIGNUP ROUTE HIT!");

    passport.authenticate("local-signup", (err, user) => {
       if (err) {
          console.log("Error: ", err);
          return next(err);
       }
 
       if (!user) {
          console.log("Not a user.")
          return res.send("Please re-enter your username and password.");
       }
 
       req.login(user, err => {
          if (err) {
             console.log("auth error")
             return next(err);
          }
 
          res.cookie("username", req.user.username);
          res.cookie("user_id", req.user.id);
          return res.redirect("/");
       });
 
    })(req, res, next);
 });
 
 router.post("/login", (req, res, next) => {

    passport.authenticate("local-login", (err, user) => {
       if (err) {
          console.log("Error: ", err);
          return next(err);
       }
 
       if (!user) {
          console.log("Not a user.");
          return res.send("Please re-enter your username and password.");
       }
 
       req.login(user, (err) => {
          
          if (err) {
             console.log("auth error");
             return next(err);
          }
 
          res.cookie("username", user.username);
          res.cookie("user_id", user._id);
          var userI = { username: user.username }
          return res.json(userI);
       })
 
    })(req, res, next);
 });

 router.get("/logout", function (req, res) {

   req.session.destroy(function (err) {
     if (err) {
       console.log("Error: ", err);
     }
     res.clearCookie("user_id");
     res.clearCookie("username");
     res.clearCookie("connect.sid");
     res.redirect("/");
   });

 });
 
 module.exports = router;
