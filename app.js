require('dotenv').config()

const express = require('express')
const routes = require('./routes')
const app = express()
const exphbs = require('express-handlebars')



app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))

app.use(routes)
const port = process.env.PORT

app.listen(port, () => {
  console.log(`listening on http://localhost:${port}`)
})