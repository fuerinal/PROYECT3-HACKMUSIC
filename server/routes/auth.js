const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');

// Our user model
const User = require('../models/User');
const Sessions = require('../models/Sessions');
const Player= require('../public/scripts/player.js');

const authRoutes = express.Router();

function returnMessage(message) {
  return (req, res, next) => res.status(500).json({
    error: true,
    message: message
  });
}
authRoutes.get('/signup', returnMessage("This should be a POST"));
authRoutes.post('/signup', (req, res, next) => {
  const {
    username,
    password
  } = req.body;

  if (!username || !password) {
    res.status(400).json({
      message: 'Provide username and password'
    });
    return;
  }

  User.findOne({
    username
  }, '_id').exec().then(foundUser => {
    if (foundUser) {
      res.status(400).json({
        message: 'The username already exists'
      });
      return;
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(password, salt);

    const theUser = new User({
      username,
      password: hashPass
    }).save().then(user => {
      req.login(user, (err) => {
        if (err) {
          res.status(500).json({
            message: 'Something went wrong'
          });
          return;
        }
        res.status(200).json(req.user);
      });
    }).catch(e => res.status(400).json({
      message: 'Something went wrong'
    }));
  });
});

/* Login route: Logs the user in having a username and a password. Uses local strategy from passport */
authRoutes.get('/login', returnMessage("This should be a POST"));
authRoutes.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, theUser, failureDetails) => {
    if (err) {
      res.status(500).json({
        message: 'Something went wrong'
      });
      return;
    }

    if (!theUser) {
      res.status(401).json(failureDetails);
      return;
    }


    req.login(theUser, (err) => {
      if (err) {
        res.status(500).json({
          message: 'Something went wrong'
        });
        return;
      }

      console.log("req.user",req.user.username);

      Sessions.find({
        'username': `${req.user.username}`
      }, (err, cs) => {
        if (err) return handleError(err);
        if (cs[0] === undefined) {


          const newSessions = Sessions({
            username:req.user.username,
          }).save();
          // console.log("Cambios",cs);

        } else {
          console.log("Sin cambios", cs);
        }
      });
      // We are now logged in (notice req.user)
      res.status(200).json(req.user);
    });
  })(req, res, next);
});



/* User authenticated Middleware: Returns JSON ERROR */
function ensureLoginOrJsonError(error = "Unauthorized") {
  return (req, res, next) => req.isAuthenticated() ? next() : res.status(403).json({
    error: error
  });
}

/* Logout route: remember this is a GET! */
authRoutes.get('/logout', (req, res, next) => {
  console.log("logout");
  req.logout();
  Sessions.remove(function(err, removed) {
    //console.log(removed);
  });
  Sessions.find({
    'username': `${req.user.username}`
  }).remove();

  res.status(200).json({
    message: 'Success'
  });
});

/* Check if user is logged in and returns the user or shows error as JSON instead*/
authRoutes.get('/loggedin', ensureLoginOrJsonError(), (req, res, next) => {
  return res.status(200).json(req.user);
});

/* Secret route */
authRoutes.get('/private', ensureLoginOrJsonError(), (req, res, next) => {
  return res.json({
    message: 'This is a private message'
  });
});
// authRoutes.get('/nextsong', (req, res, next) => {
//   console.log("NEXTSONG -> SERVER");
//   // U();
//   res.status(200).json({
//     message: 'Success'
//   });
//
// });

module.exports = authRoutes;
