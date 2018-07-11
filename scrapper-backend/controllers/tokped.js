const request = require('request');
const cheerio = require('cheerio');
const apiTokped = process.env.API_TOKPED
const methods = {}

methods.detailProduct = function(req, response){
  const { referer, page, rows, ob } = req.query
  let url = `${apiTokped}&page=${page}&rows=${rows}&ob=${ob}`
  let options = {
    url,
    headers: {
      referer
    }
  };

  const requestget = function (url) {
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
          let description = $('div.product-info-holder').find('p').html()
          resolve({ images, description })
        }
      });
    });
  }

  request.get(options, function callback(err, res, body) {
    if (err && res.statusCode !== 200) throw err;
    console.log('body', typeof body)
      // parsing callback angular
      // let list = JSON.parse(body.replace('angular.callbacks._0(', '').slice(0, -1));
      let list = JSON.parse(body)
      let products = []
      for (let i = 0, pr = Promise.resolve(); i < list.data.products.length; i++) {
        pr = pr.then(_ => new Promise(resolve => {
          let p = list.data.products[i]
          let product = {}
          product['name'] = p.name
          product['stock'] = p.stock === 0 ? 1000 : p.stock
          product['weight'] = 0
          product['price'] = p.price_int
          product['price_sale'] = p.price_int + ((p.price_int * 30) / 100)
          product['condition'] = p.condition
          if (p.url) {
            requestget(p.url).then((dt) => {
              product['images'] = dt.images
              product['description'] = dt.description
              products.push(product)
              console.log('p', product)
              console.log('--------------------> ', i)
              resolve()
              if (i === list.data.products.length -1) {
                response.json({ products })
              }
            });
          }
          
        }));
      }
      
  });
}

module.exports = methods
