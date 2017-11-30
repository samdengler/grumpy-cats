'use strict';

const fs = require('fs');
const util = require('util');
const cheerio = require('cheerio')
const parseString = require('xml2js').parseString;

function get_rss_feed(callback) {
  fs.readFile('./rss.xml', 'utf-8', (err, data) => {
    console.log(data);
    parseString(data, (err, result) => {
      callback(null, result);
    })
  });
}

function parse_description(image_description) {
  const description = cheerio.load(image_description);
  return description('img').attr('src');
}

function random_image(callback) {
  get_rss_feed((err, data) => {
    console.log(util.inspect(data, false, null));
    var items = data.rss.channel[0].item;
    var random_item = items[Math.floor(Math.random() * items.length)];
    var image_url = parse_description(random_item.description[0]);
    callback(err, image_url);
  });
}

function image_body(image_url) {
  const resize_percentage = '100%';
  return {
    image_url: image_url,
    height: resize_percentage,
    width: resize_percentage
  };
}

exports.lambda_handler = (event, context, callback) => {
  console.log('Received event:', JSON.stringify(event, null, 2));

  random_image((err, image_url) => {
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(image_body(image_url))
    });
  });
};
