const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const bcrypt = require('bcryptjs')
const passport = require('passport')
router.get('/login', (req, res) => {
  res.render('login')
})
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))
router.get('/register', (req, res) => {
  res.render('register')
})
router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []

  if (!name || !email || !password || !confirmPassword) {
    errors.push({ message: 'Please Fill All Input' })
  }
  if (confirmPassword !== password) {
    errors.push({ message: 'Confirm Password Error!' })
  }
  if (errors.length) {
    return res.render('register', { errors, name, email, password, confirmPassword })
  }
  User.findOne({ email })
    .then(user => {
      if (user) {
        errors.push({ message: 'User Already Risgister' })
        return res.render('register', { errors, name, email, password, confirmPassword })
      }
      bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(password, salt))
        .then(hash => User.create({ name, email, password: hash }))
        .then(() => {
          req.flash('success_msg', 'Register Success! Please Login.')
          res.redirect('/users/login')
        })
        .catch(error => console.log(error))
    })
    .catch(error => console.log(error))
})
router.get('/logout', function (req, res) {
  req.logout(error => {
    if (error) return next(error)
    req.flash('success_msg', 'Logout Successfully')
    res.redirect('/users/login')
  })
})
module.exports = router