const express = require('express');
const router = express.Router();
const validUrl = require('valid-url');
const shortid = require('shortid');
const config = require('config');

const Url = require('../models/Url');

// @route     POST /api/url/shorten
// @desc      Create short URL
router.post('/shorten', async (req, res) => {
  const { longUrl } = req.body;
  const baseUrl = config.get('baseUrl');

  // Check base url   valid url?
  if (!validUrl.isUri(baseUrl)) {
    return res.status(401).json('Invalid base url');
  }

  // Create url code
  const urlCode = shortid.generate();

  // Check long url
  if (validUrl.isUri(longUrl)) {
    try {
      let url = await Url.findOne({ longUrl });
// if long url found 
      if (url) {
        res.json(url);
      } else {
        //if not,with shortid method with unique code
        const shortUrl = baseUrl + '/' + urlCode;

        url = new Url({
          longUrl,//shorted
          shortUrl,//created
          urlCode,
          date: new Date()
        });

        await url.save();
        //return 
        res.json(url);
      }
    } catch (err) {
      console.error(err);
      res.status(500).json('Server error');
    }
  } else {
    //if lonf url is not valid 
    res.status(401).json('Invalid long url');
  }
});

module.exports = router;