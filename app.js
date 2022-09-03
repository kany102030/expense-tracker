require('dotenv').config()
require('./config/mongoose')
const express = require('express')
const routes = require('./routes')
const app = express()
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(routes)
const port = process.env.PORT

app.listen(port, () => {
  console.log(`listening on http://localhost:${port}`)
})