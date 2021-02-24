const express = require('express');
const mongoose = require('mongoose');
const ShortUrl = require('./models/shortUrl');
const affiliateLink = require('./index')

require('dotenv').config();

const app = express()
const port = process.env.PORT || 5000;

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established sucessfully");
})

// mongoose.connect("mongodb://localhost:/urls",{ useNewUrlParser:true, useUnifiedTopology: true},(error)=>{
// 	if(!error)
// 	{
// 		console.log("Succefully connect to the urls DB");
// 	}
// 	else
// 	{
// 		console.log("Error to Stablish Connection");
// 	}
// });


app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))


app.get('/', async (req, res) => {

  const shortUrls = await ShortUrl.find()
  res.render('index', { shortUrls: shortUrls })

})

app.post('/createAffiliate', async (req, res) => {
  console.log(req.body.inputurl)
  console.log(affiliateLink(req.body.inputurl));

})

app.post('/shortUrls', async (req, res) => {

  console.log(req.body.inputurl)
  console.log(affiliateLink(req.body.inputurl));
  await ShortUrl.create({ full: affiliateLink(req.body.inputurl) })

  res.redirect('/')
})

app.get('/:shortUrl', async (req, res) => {
  const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl })
  if (shortUrl == null) return res.sendStatus(404)

  shortUrl.clicks++
  shortUrl.save()
  res.redirect(shortUrl.full);
})

app.listen(port || 5000, () => {
  console.log(`Server is running on port: ${port}`)
});