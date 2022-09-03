const express = require('express')
const router = express.Router()
const getIconInfoFromURL = require('../../utils/fontawsome').getIconInfoFromURL
const Record = require('../../models/record')
const Category = require('../../models/category')

router.use('/', (req, res) => {
  const inputCategory = req.query.category

  Category.find()
    .lean()
    .then(categories => {
      const categorySelected = categories.find(category => category.name === inputCategory)
      const searchCondiction = {};
      if (categorySelected) {
        searchCondiction['categoryId'] = categorySelected._id
      }

      categoriesOther = categories.filter(category => category.name !== inputCategory)

      Record.find(searchCondiction)
        .lean()
        .then(records => {
          let totalAmount = 0
          for (let i = 0; i < records.length; i++) {
            totalAmount += records[i].amount
            const category = categories.find(category => String(category._id) === String(records[i].categoryId))
            const iconInfo = {}
            if (!getIconInfoFromURL(category.icon, iconInfo)) return

            records[i]['iconName'] = iconInfo.iconName
            records[i]['iconStyle'] = iconInfo.iconStyle
            records[i].date = records[i].date.toJSON().slice(0, 10)
          }

          if (inputCategory === "ALL") {
            return res.render('index', { records, categoriesOther, categorySelected, totalAmount, categoriesALL: true })
          } else {
            return res.render('index', { records, categoriesOther, categorySelected, totalAmount, categoriesALL: false })
          }

        })
        .catch(error => console.log(error))
    })

})
module.exports = router