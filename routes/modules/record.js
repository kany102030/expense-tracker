const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')
router.get('/new', (req, res) => {

  Category.find()
    .lean()
    .then(categories => {
      res.render('new', { scripts: ['/scripts/new.js'], categories })
    })
    .catch(error => console.log(error))

})
router.post('/', (req, res) => {
  const { record_name, record_date, record_category, record_price } = req.body
  Record.create({
    name: record_name,
    date: record_date,
    categoryId: record_category,
    amount: record_price,
  })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router