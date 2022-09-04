const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')
const user = require('../../models/user')
router.get('/:id/edit', (req, res) => {
  Category.find()
    .lean()
    .then(categories => {
      Record.findById(req.params.id)
        .lean()
        .then(record => {
          const categorySelected = categories.find(category => String(category._id) === String(record.categoryId))
          categoriesOther = categories.filter(category => category.name !== categorySelected.name)
          record.date = record.date.toJSON().slice(0, 10)
          res.render('edit', { record, categoriesOther, categorySelected })
        })
        .catch(error => console.log(error))
    })
    .catch(error => console.log(error))

})
router.get('/new', (req, res) => {

  Category.find()
    .lean()
    .then(categories => {
      res.render('new', { scripts: ['/scripts/new.js'], categories })
    })
    .catch(error => console.log(error))

})
router.put('/:id', (req, res) => {
  const { record_name, record_date, record_category, record_price } = req.body
  Record.findById(req.params.id)
    .then(record => {
      record.name = record_name
      record.date = record_date
      record.categoryId = record_category
      record.amount = record_price
      return record.save()
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})
router.delete('/:id', (req, res) => {
  Record.findById(req.params.id)
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})
router.post('/', (req, res) => {
  const { record_name, record_date, record_category, record_price } = req.body
  Record.create({
    name: record_name,
    date: record_date,
    categoryId: record_category,
    amount: record_price,
    userId: req.user._id
  })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router