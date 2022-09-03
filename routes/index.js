const express = require('express')
const home = require('./modules/home')
const records = require('./modules/record')
const router = express.Router()

router.use('/records', records)
router.use('/', home)

module.exports = router