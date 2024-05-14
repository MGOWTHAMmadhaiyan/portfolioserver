const express = require('express')
const cors = require('cors')
const contact = require('./schema')
const mongoose = require('mongoose')
const app = express()
const mail = require('./sendemail')
require('dotenv').config()

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())

app.get('/', async (req, res) => {
  let allDatas =  await contact.find({})
  console.log('allDatas',allDatas)
  res.json({allDatas})
})

app.post('/submit', async (req, res) => {
  const mailid = req.body.email
  try {
    const existmaild = await contact.findOne({ email: mailid })
    if (existmaild) {
      res.status(400).send({ msg: 'This mailid already exist' })
    }
    else {
      const contactdata = new contact({
        name: req.body.name,
        mobilenumber: req.body.mobilenumber,
        email: req.body.email,
      })
      await contactdata.save()
      res.send({ msg: 'Submitted successfully' })
      await mail.contactmailsend(req.body.email)
    }

  } catch (error) {
    console.log('error-->', error)
  }

})
mongoose.connect(process.env.DB_CONNECTION)
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});
app.listen(process.env.PORT_NUMBER, () => {
  console.log(`server start on port number ${process.env.PORT_NUMBER}`)
})

