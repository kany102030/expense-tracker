const seedData = [

  {
    userName: '廣志',
    email: 'user1@user1.com',
    password: '1234',
    records: [
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
  },
  {
    userName: '小新',
    email: 'user2@user2.com',
    password: '1234',
    records: [
      {
        name: '午餐',
        date: '2019-05-23',
        amount: 60,
        categoryName: '餐飲食品'
      },
      {
        name: '晚餐',
        date: '2019-05-23',
        amount: 60,
        categoryName: '餐飲食品'
      },
      {
        name: '捷運',
        date: '2019-05-24',
        amount: 120,
        categoryName: '交通出行'
      },
      {
        name: '電影：驚奇隊長',
        date: '2019-05-24',
        amount: 220,
        categoryName: '休閒娛樂'
      }
    ]
  }
]
require('dotenv').config()
const db = require('../../config/mongoose')
const Category = require('../category')
const Record = require('../record')
const User = require('../user')
const bcrypt = require('bcryptjs')


db.once('open', () => {
  let uploadNum = 0
  let totalNum = 0
  for (let userData of seedData) {
    totalNum += userData.records.length
  }

  for (let userData of seedData) {
    records = userData.records
    const { userName, email, password } = userData
    bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(password, salt))
      .then(hash => {
        User.create({
          name: userName,
          email: email,
          password: hash
        })
          .then(user => {
            for (let record of records) {
              const { name, date, amount } = record

              Category.findOne({ name: record.categoryName })
                .then(category => {
                  return Record.create({ name, date, amount, categoryId: category._id, userId: user._id })
                    .then(() => {
                      uploadNum++
                      if (uploadNum === totalNum) {
                        console.log('record seed done')
                        process.exit(0)
                      }
                    })
                })
                .catch(error => console.log(error))
            }
          })
      })


  }
})