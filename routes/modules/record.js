const express = require('express')
const router = express.Router()

router.get('/new', (req, res) => {
  res.render('new', { scripts: ['/scripts/new.js'] })
})

module.exports = router