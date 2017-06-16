import passport from 'koa-passport';
import User from '../data/models/user';

passport.serializeUser(function(user, done) {
  console.log('serializeUser: ' + user.id)
  done(null, user.id)
})

passport.deserializeUser(async function(id, done) {
  try {
    const user = await User.findById(id);
    done(null, user)
  } catch(err) {
    done(err)
  }
})

const LocalStrategy = require('passport-local').Strategy
passport.use(new LocalStrategy(function(username, password, done) {
  User.findOne({ where: {username}})
    .then(user => {
      console.log(user)
      if (username === user.username && user.validPassword(password)) {
        console.log('logged in')
        done(null, user)
      } else {
        done(null, false)
      }
    })
    .catch(err => done(err))
}))
