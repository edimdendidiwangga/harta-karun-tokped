const request = require('request');
const cheerio = require('cheerio');
const apiTokped = process.env.API_TOKPED
const methods = {}

methods.products = function(req, response){
  const { referer, page, rows, ob } = req.query
  let url = `${apiTokped}&page=${page}&rows=${rows}&ob=${ob}`
  let options = {
    url,
    headers: {
      referer
    }
  };

  request.get(options, function callback(err, res, body) {
    if (err && res.statusCode !== 200) throw err;
      // parsing callback angular
      // let list = JSON.parse(body.replace('angular.callbacks._0(', '').slice(0, -1));
      let list = JSON.parse(body)
      response.json({ products: list.data.products }) 
  });
}

methods.detailProduct = function(req, response){
  const requestget = function ({ url, id }) {
    return  new Promise((resolve, reject) => {
      request(url, function (err, res, body) {
        if (err && res.statusCode !== 200) {
          reject(err);
        } else {
          let $ = cheerio.load(body);
          let images = []
          $('div.jcarousel.product-imagethumb-alt').each((i, value) => {
            $(value).find('ul').find('li').map((j, data) => {
              let img = $(data).find('img').attr('src').replace('100-square', '700')
              images.push(img)
            });
          });
          let weight
          let is_insurance
          $('dl.clearfix.m-0').each((idx, val) => {
            $(val).find('dd').map(function(i, el) {
              if (i === 1) {
                weight = Number($(el).text().replace(/(\n|gr)/gm, '').trim());
              }
              if (i === 3) {
                is_insurance = $(el).text().replace(/\n/gm, '').trim();
              }
            })
          });
          let description = $('div.product-info-holder').find('p').html()
          resolve({ id, weight, is_insurance, images, description })
        }
      });
    });
  }

  requestget(req.query).then((data) => {
    const { id, weight, is_insurance, images, description } = data
    response.json({ data: { id, weight, is_insurance, images, description } })
  });
}

module.exports = methods
