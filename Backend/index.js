const express = require("express")
require('dotenv').config()
const cors = require("cors")
const app = express();

app.use(express.static('static'))
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cors())


// routers
const indexRouter = require('./routes/index')
const postRouter = require('./routes/post')
const commentRouter = require('./routes/comment')
const registerRouter = require('./routes/registration')

const reportRouter = require('./routes/report')
const reputationRouter = require('./routes/reputation')

app.use(indexRouter.router)
app.use(postRouter.router)
app.use(commentRouter.router)
app.use(registerRouter.router)
app.use(reportRouter.router)
app.use(reputationRouter.router)


app.listen(3000, () => {
  console.log(`Example app listening at http://localhost:3000`)
})