const CATEGORY = {
  家居物業: "https://fontawesome.com/icons/home?style=solid",
  交通出行: "https://fontawesome.com/icons/shuttle-van?style=solid",
  休閒娛樂: "https://fontawesome.com/icons/grin-beam?style=solid",
  餐飲食品: "https://fontawesome.com/icons/utensils?style=solid",
  其他: "https://fontawesome.com/icons/pen?style=solid"
}
require('dotenv').config()
const db = require('../../config/mongoose')
const Category = require('../category')
db.once('open', () => {
  let uploadNum = 0
  for (let name in CATEGORY) {
    Category.create({ name, icon: CATEGORY[name] })
      .then(() => {
        uploadNum++
        if (uploadNum === Object.keys(CATEGORY).length) {
          console.log('category seed done')
          process.exit(0)
        }
      })
      .catch(error => console.log(error))
  }
})