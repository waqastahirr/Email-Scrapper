const express = require('express');
const jsdom = require("jsdom");
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/search', async (req, res) => {

  try {
    const response = await axios.get('https://hoogeveenchiropractic.com/');
    const dom = new jsdom.JSDOM(response.data);
    const document = dom.window.document;
    const content = document.querySelector('title').textContent;

    res.status(200).json({
      status: 'success',
      data: {
        response: res.data,
        content
      }
    });
  }
  catch (error) {
    res.status(400).json({ status: 'failed' });
  }
});

module.exports = app;