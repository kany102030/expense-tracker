const records = [
  {
    name: '午餐',
    date: '2019-04-23',
    amount: 60,
    categoryName: '餐飲食品'
  },
  {
    name: '晚餐',
    date: '2019-04-23',
    amount: 60,
    categoryName: '餐飲食品'
  },
  {
    name: '捷運',
    date: '2019-04-24',
    amount: 120,
    categoryName: '交通出行'
  },
  {
    name: '電影：驚奇隊長',
    date: '2019-04-24',
    amount: 220,
    categoryName: '休閒娛樂'
  }
]
require('dotenv').config()
const db = require('../../config/mongoose')
const Category = require('../category')
const Record = require('../record')

db.once('open', () => {
  let uploadNum = 0
  for (let record of records) {
    const { name, date, amount } = record
    Category.findOne({ name: record.categoryName })
      .then(category => {
        return Record.create({ name, date, amount, categoryId: category._id })
          .then(() => {
            uploadNum++
            if (uploadNum === records.length) {
              console.log('record seed done')
              process.exit(0)
            }
          })
      })
      .catch(error => console.log(error))
  }
})