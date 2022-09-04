const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const User = require('../models/user')

module.exports = app => {
  app.use(passport.initialize())
  app.use(passport.session())

  passport.use(new LocalStrategy({ usernameField: 'email', passReqToCallback: true }, function (req, email, password, done) {
    User.findOne({ email })
      .then(user => {
        if (!user) {
          req.flash('warning_msg', 'Email has not registered!')
          return done(null, false, { message: 'Email has not registered!' })
        }

        bcrypt.compare(password, user.password)
          .then(isMatch => {
            if (!isMatch) {
              req.flash('warning_msg', 'Password incorrect!')
              return done(null, false, "Password incorrect!")
            }
            return done(null, user)
          })
      })
      .catch(error => done(error, false))
  }))

  passport.serializeUser((user, done) => {
    done(null, user._id)
  })
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(error => done(error, null))
  })
}