'use strict';

const fs = require('fs');
const util = require('util');
const parseString = require('xml2js').parseString;

function get_rss_feed(callback) {
  fs.readFile('./rss.xml', 'utf-8', (err, data) => {
    console.log(data);
    parseString(data, (err, result) => {
      callback(null, result);
    })
  });
}

function random_image(callback) {
  get_rss_feed((err, data) => {
    console.log(util.inspect(data, false, null));
    var items = data.rss.channel[0].item;
    var random_item = items[Math.floor(Math.random() * items.length)];
    callback(err, random_item.description[0]);
  });
}

function image_body(image) {
  return {
    description: image
  };
}

exports.lambda_handler = (event, context, callback) => {
  console.log('Received event:', JSON.stringify(event, null, 2));

  random_image((err, image) => {
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(image_body(image))
    });
  });
};
