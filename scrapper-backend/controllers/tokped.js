const request = require('request');
const cheerio = require('cheerio');
const Json2csvParser = require('json2csv').Parser;
const apiTokped = process.env.API_TOKPED
const methods = {}

methods.csvBL = function(req, response){
  const { products, filename } = req.query
  const fields = [
    { label: 'Nama Barang', value: 'name' },
    { label: 'Barang Stok(Minimum 1)', value: 'stock' },
    { label: 'Berat (gram)', value: 'weight' },
    { label: 'Harga (Rupiah)', value: 'price_sale' },
    { label: 'Kondisi(Baru/Bekas)', value: 'condition' },
    { label: 'Deskripsi', value: 'description' },
    { label: 'Wajib Asuransi?(Ya/Tidak)', value: 'is_insurance' },
    { label: 'Merek', value: 'merk' },
    { label: 'Jasa Pengiriman (gunakan vertical bar | sebagai pemisah jasa pengiriman contoh: jner | jney)', value: 'expedition' },
    { label: 'URL Gambar 1', value: 'image1' },
    { label: 'URL Gambar 2', value: 'image2' },
    { label: 'URL Gambar 3', value: 'image3' },
    { label: 'URL Gambar 4', value: 'image4' },
    { label: 'URL Gambar 5', value: 'image5' }
  ]
  let data = JSON.parse(products[0])
  let data2 = [ data ]
  const json2csvParser = new Json2csvParser({ fields, quote: '' });
  const csv = json2csvParser.parse(data2);
  response.set({
    'Content-Disposition': `attachment; filename=${filename}.xls`,
    'Content-Type': 'text/xls'
  });
  console.log('csv', csv)
  response.send(csv);
}

methods.products = function(req, response){
  const { referer, sc, page, rows, ob, start } = req.query
  let url = `${apiTokped}&page=${page}&rows=${rows}&sc=${sc}&ob=${ob}&start=${start}`
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
          // get images
          let images = []
          $('div.jcarousel.product-imagethumb-alt').each((i, value) => {
            $(value).find('ul').find('li').map((j, data) => {
              let img = $(data).find('img').attr('src').replace('100-square', '700')
              images.push(img)
            });
          });
          // get weight & insurance
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
          // get expedition
          let expedition
          $('ul.product-ratingstat.mt-0.p-10').each((idx, val) => {
            expedition = $(val).html().trim()
          });
          // get description
          let description = $('div.product-info-holder').find('p').html().trim().replace(/&amp;/gm, '&').replace(/(\r\n|\n|\r|\s+|\t|&nbsp;)/gm, ' ').replace(/\"/g, "\"\"").replace(/,/g, "comma").replace(/(&quot;|&apos;)/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/<a rel=""nofollow noopener noreferrer"" target=""_blank"" href=""/g, '').replace(/<a rel=""nofollow"" target=""_blank"" href=""/g, '').replace(/">/g, '');
          // .replace(/</a>/g, '')
          resolve({ id, weight, is_insurance, images, expedition, description })
        }
      });
    });
  }

  requestget(req.query).then((data) => {
    const { id, weight, is_insurance, images, expedition, description } = data
    response.json({ data: { id, weight, is_insurance, images, expedition, description } })
  });
}

methods.variant = function(req, response){
  const { id, referer } = req.query
  let url = `https://tome.tokopedia.com/v2/product/${id}/variant`
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
      let variant = JSON.parse(body)
      response.json({ variant: variant.data })
  });
}

module.exports = methods
