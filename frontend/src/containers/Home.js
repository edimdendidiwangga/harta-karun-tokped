import React from 'react'
import { connect } from 'react-redux'
import CsvCreator from 'react-csv-creator'
import { Creators as ProductsActions } from '../redux/Products'

// Components
class Home extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      form: {
        referer: '', // 'https://www.tokopedia.com/p/fashion-wanita/sepatu/sandal'
        merk: 'Lainnya',
        sc: 0,
        page: 1,
        rows: 200,
        ob: 8,
        start: 0,
        filename: '',
        category: ''
      },
      products: [],
      productsOut: [],
      validation: false,
      exportTo: 'shopee'
    }
    this.action = { listProducts: false, getProductDetail: false, generateCSV: false }
  }

  handleInput (e) {
    const { name, value } = e.target
    const { form } = this.state
    let newState = { form }
    newState.form[name] = value
    this.setState(newState)
  }

  async onSubmit () {
    const { referer, sc, page, rows, ob, start } = this.state.form
    if (referer) {
      this.action = { ...this.action, listProducts: true }
      this.setState({ validation: false })
      this.props.listProducts({ referer, sc, page, rows, ob, start })
    } else {
      this.setState({ validation: true })
    }
  }

  csvBL () {
    this.action = { ...this.action, generateCSV: true }
    const { products, form } = this.state
    this.props.generateCSV({ products, filename: form.filename })
  }

  csvCreator () {
    const { products, form } = this.state
    const fields = [
      { display: 'Nama Barang', id: 'name' },
      { display: 'Barang Stok(Minimum 1)', id: 'stock' },
      { display: 'Berat (gram)', id: 'weight' },
      { display: 'Harga (Rupiah)', id: 'price_sale' },
      { display: 'Kondisi(Baru/Bekas)', id: 'condition' },
      { display: 'Deskripsi', id: 'description' },
      { display: 'Wajib Asuransi?(Ya/Tidak)', id: 'is_insurance' },
      { display: 'Merek', id: 'merk' },
      { display: 'Jasa Pengiriman (gunakan vertical bar | sebagai pemisah jasa pengiriman contoh: jner | jney)', id: 'expedition' },
      { display: 'URL Gambar 1', id: 'image1' },
      { display: 'URL Gambar 2', id: 'image2' },
      { display: 'URL Gambar 3', id: 'image3' },
      { display: 'URL Gambar 4', id: 'image4' },
      { display: 'URL Gambar 5', id: 'image5' }
    ]
    return (
      <CsvCreator
        filename={form.filename}
        headers={fields}
        rows={products}
      >
        <p>Download BL CSV</p>
      </CsvCreator>
    )
  }

  csvShopee () {
    const { products, form } = this.state
    const fields = [
      { display: 'id', id: 'id' },
      { display: 'ps_category_list_id', id: 'category' },
      { display: 'ps_product_name', id: 'name' },
      { display: 'ps_product_description', id: 'description' },
      { display: 'ps_price', id: 'price' },
      { display: 'ps_stock', id: 'stock' },
      { display: 'ps_product_weight', id: 'weight' },
      { display: 'ps_days_to_ship', id: 'dayinship' },
      { display: 'ps_sku_ref_no_parent', id: 'sku0' },
      { display: 'ps_mass_upload_variation_help', id: 'helpVariant' },
      { display: 'ps_variation 1 ps_variation_sku', id: 'sku_var_1' },
      { display: 'ps_variation 1 ps_variation_name', id: 'name_var_1' },
      { display: 'ps_variation 1 ps_variation_price', id: 'price_var_1' },
      { display: 'ps_variation 1 ps_variation_stock', id: 'stock_var_1' },

      { display: 'ps_variation 2 ps_variation_sku', id: 'sku_var_2' },
      { display: 'ps_variation 2 ps_variation_name', id: 'name_var_2' },
      { display: 'ps_variation 2 ps_variation_price', id: 'price_var_2' },
      { display: 'ps_variation 2 ps_variation_stock', id: 'stock_var_2' },

      { display: 'ps_variation 3 ps_variation_sku', id: 'sku_var_3' },
      { display: 'ps_variation 3 ps_variation_name', id: 'name_var_3' },
      { display: 'ps_variation 3 ps_variation_price', id: 'price_var_3' },
      { display: 'ps_variation 3 ps_variation_stock', id: 'stock_var_3' },

      { display: 'ps_variation 4 ps_variation_sku', id: 'sku_var_4' },
      { display: 'ps_variation 4 ps_variation_name', id: 'name_var_4' },
      { display: 'ps_variation 4 ps_variation_price', id: 'price_var_4' },
      { display: 'ps_variation 4 ps_variation_stock', id: 'stock_var_4' },

      { display: 'ps_variation 5 ps_variation_sku', id: 'sku_var_5' },
      { display: 'ps_variation 5 ps_variation_name', id: 'name_var_5' },
      { display: 'ps_variation 5 ps_variation_price', id: 'price_var_5' },
      { display: 'ps_variation 5 ps_variation_stock', id: 'stock_var_5' },

      { display: 'ps_variation 6 ps_variation_sku', id: 'sku_var_6' },
      { display: 'ps_variation 6 ps_variation_name', id: 'name_var_6' },
      { display: 'ps_variation 6 ps_variation_price', id: 'price_var_6' },
      { display: 'ps_variation 6 ps_variation_stock', id: 'stock_var_6' },

      { display: 'ps_variation 7 ps_variation_sku', id: 'sku_var_7' },
      { display: 'ps_variation 7 ps_variation_name', id: 'name_var_7' },
      { display: 'ps_variation 7 ps_variation_price', id: 'price_var_7' },
      { display: 'ps_variation 7 ps_variation_stock', id: 'stock_var_7' },

      { display: 'ps_variation 8 ps_variation_sku', id: 'sku_var_8' },
      { display: 'ps_variation 8 ps_variation_name', id: 'name_var_8' },
      { display: 'ps_variation 8 ps_variation_price', id: 'price_var_8' },
      { display: 'ps_variation 8 ps_variation_stock', id: 'stock_var_8' },

      { display: 'ps_variation 9 ps_variation_sku', id: 'sku_var_9' },
      { display: 'ps_variation 9 ps_variation_name', id: 'name_var_9' },
      { display: 'ps_variation 9 ps_variation_price', id: 'price_var_9' },
      { display: 'ps_variation 9 ps_variation_stock', id: 'stock_var_9' },

      { display: 'ps_variation 10 ps_variation_sku', id: 'sku_var_10' },
      { display: 'ps_variation 10 ps_variation_name', id: 'name_var_10' },
      { display: 'ps_variation 10 ps_variation_price', id: 'price_var_10' },
      { display: 'ps_variation 10 ps_variation_stock', id: 'stock_var_10' },

      { display: 'ps_variation 11 ps_variation_sku', id: 'sku_var_11' },
      { display: 'ps_variation 11 ps_variation_name', id: 'name_var_11' },
      { display: 'ps_variation 11 ps_variation_price', id: 'price_var_11' },
      { display: 'ps_variation 11 ps_variation_stock', id: 'stock_var_11' },

      { display: 'ps_variation 12 ps_variation_sku', id: 'sku_var_12' },
      { display: 'ps_variation 12 ps_variation_name', id: 'name_var_12' },
      { display: 'ps_variation 12 ps_variation_price', id: 'price_var_12' },
      { display: 'ps_variation 12 ps_variation_stock', id: 'stock_var_12' },

      { display: 'ps_variation 13 ps_variation_sku', id: 'sku_var_13' },
      { display: 'ps_variation 13 ps_variation_name', id: 'name_var_13' },
      { display: 'ps_variation 13 ps_variation_price', id: 'price_var_13' },
      { display: 'ps_variation 13 ps_variation_stock', id: 'stock_var_13' },

      { display: 'ps_variation 14 ps_variation_sku', id: 'sku_var_14' },
      { display: 'ps_variation 14 ps_variation_name', id: 'name_var_14' },
      { display: 'ps_variation 14 ps_variation_price', id: 'price_var_14' },
      { display: 'ps_variation 14 ps_variation_stock', id: 'stock_var_14' },

      { display: 'ps_variation 15 ps_variation_sku', id: 'sku_var_15' },
      { display: 'ps_variation 15 ps_variation_name', id: 'name_var_15' },
      { display: 'ps_variation 15 ps_variation_price', id: 'price_var_15' },
      { display: 'ps_variation 15 ps_variation_stock', id: 'stock_var_15' },

      { display: 'ps_variation 16 ps_variation_sku', id: 'sku_var_16' },
      { display: 'ps_variation 16 ps_variation_name', id: 'name_var_16' },
      { display: 'ps_variation 16 ps_variation_price', id: 'price_var_16' },
      { display: 'ps_variation 16 ps_variation_stock', id: 'stock_var_16' },

      { display: 'ps_variation 17 ps_variation_sku', id: 'sku_var_17' },
      { display: 'ps_variation 17 ps_variation_name', id: 'name_var_17' },
      { display: 'ps_variation 17 ps_variation_price', id: 'price_var_17' },
      { display: 'ps_variation 17 ps_variation_stock', id: 'stock_var_17' },

      { display: 'ps_variation 18 ps_variation_sku', id: 'sku_var_18' },
      { display: 'ps_variation 18 ps_variation_name', id: 'name_var_18' },
      { display: 'ps_variation 18 ps_variation_price', id: 'price_var_18' },
      { display: 'ps_variation 18 ps_variation_stock', id: 'stock_var_18' },

      { display: 'ps_variation 19 ps_variation_sku', id: 'sku_var_19' },
      { display: 'ps_variation 19 ps_variation_name', id: 'name_var_19' },
      { display: 'ps_variation 19 ps_variation_price', id: 'price_var_19' },
      { display: 'ps_variation 19 ps_variation_stock', id: 'stock_var_19' },

      { display: 'ps_variation 20 ps_variation_sku', id: 'sku_var_20' },
      { display: 'ps_variation 20 ps_variation_name', id: 'name_var_20' },
      { display: 'ps_variation 20 ps_variation_price', id: 'price_var_20' },
      { display: 'ps_variation 20 ps_variation_stock', id: 'stock_var_20' },

      { display: 'ps_img_1', id: 'image1' },
      { display: 'ps_img_2', id: 'image2' },
      { display: 'ps_img_3', id: 'image3' },
      { display: 'ps_img_4', id: 'image4' },
      { display: 'ps_img_5', id: 'image5' },
      { display: 'ps_img_6', id: 'image6' },
      { display: 'ps_img_7', id: 'image7' },
      { display: 'ps_img_8', id: 'image8' },
      { display: 'ps_img_9', id: 'image9' },

      { display: 'ps_mass_upload_shipment_help', id: 'expdtHelp' },
      { display: 'channel 80003 switch', id: 'jner' },
      { display: 'channel 80004 switch', id: 'jneok' },
      { display: 'channel 80011 switch', id: 'posk' },
      { display: 'channel 80014 switch', id: 'jntr' }
    ]
    return (
      <CsvCreator
        filename={form.filename}
        headers={fields}
        rows={products}
      >
        <p>Download Shopee CSV</p>
      </CsvCreator>
    )
  }

  scrappeForShopee (products) {
    for (let i = 0, pr = Promise.resolve(); i < products.length; i++) {
      pr = pr.then(_ => new Promise(resolve => {
        let p = products[i]
        let product = {}
        product['id'] = p.id
        product['category'] = this.state.form.category
        product['name'] = p.name.replace(/,/g, 'comma')
        let pricing = p.price_int + ((p.price_int * 30) / 100)
        product['price'] = 100 * Math.ceil(pricing / 100)
        product['stock'] = p.stock === 0 ? 10 : p.stock
        product['sku0'] = p.sku
        if (p.url) {
          this.setState({ products: [ ...this.state.products, product ] })
          this.props.getProductDetail({ url: p.url, id: p.id })
          this.props.productVariant({ referer: p.url, id: p.id })
          setTimeout(() => {
            resolve()
          }, 5000)
        }
      }))
    }
  }

  scrappeDetailShopee (data) {
    let newProducts = this.state.products.map((p, i) => {
      if (Number(p.id) === Number(data.id)) {
        p['weight'] = data.weight
        for (let i = 0; i < data.images.length; i++) {
          p[`image${i + 1}`] = data.images[i]
        }
        p['description'] = data.description !== '' ? `${data.description.replace(/;/g, 'comma')}` : 'Selamat datang di toko Shekilla.'
        if (/jne/.test(data.expedition)) {
          p['jner'] = 'Aktif'
          p['jneok'] = 'Aktif'
        } else {
          p['jner'] = 'Nonaktif'
          p['jneok'] = 'Nonaktif'
        }
        if (/jnt/.test(data.expedition)) {
          p['jntr'] = 'Aktif'
        } else {
          p['jntr'] = 'Nonaktif'
        }
        if (/pos/.test(data.expedition)) {
          p['posk'] = 'Aktif'
        } else {
          p['posk'] = 'Nonaktif'
        }
        return p
      } else {
        return p
      }
    })
    this.setState({ products: newProducts })
  }

  scrappeVariantShopee ({ variant }) {
    if (variant.children.length > 0) {
      let newProducts = this.state.products.map((p, i) => {
        if (Number(p.id) === Number(variant.default_child)) {
          // if (variant.children.length < 20) {
          let no = 0
          for (let i = 0; i < variant.children.length; i++) {
            let v = variant.children[i]
            if (v.enabled) {
              p[`sku_var_${no + 1}`] = v.sku
              let productName = p.name.replace(/comma/g, ',')
              let regex = new RegExp(`${productName} -`, 'g')
              p[`name_var_${no + 1}`] = v.name.replace(regex, '').replace(/,/g, ' -')
              let pricing = v.price + ((v.price * 30) / 100)
              p[`price_var_${no + 1}`] = 100 * Math.ceil(pricing / 100)
              p[`stock_var_${no + 1}`] = v.stock === 0 ? 10 : v.stock
              no += 1
            }
            if (i === 19) {
              i += variant.children.length
            }
          }
          // }
          //  else {
          //   p[`name_var_0`] = variant.children[0].url
          // }
          return p
        } else {
          return p
        }
      })
      this.setState({ products: newProducts })
    }
  }

  scrappeForBL (products) {
    for (let i = 0, pr = Promise.resolve(); i < products.length; i++) {
      pr = pr.then(_ => new Promise(resolve => {
        let p = products[i]
        let product = {}
        product['id'] = p.id
        product['name'] = p.name.replace(/,/g, ' ')
        product['stock'] = p.stock === 0 ? 10 : p.stock
        let pricing = p.price_int + ((p.price_int * 30) / 100)
        product['price_sale'] = 100 * Math.ceil(pricing / 100)
        product['condition'] = p.condition === 1 ? 'Baru' : 'Bekas'
        product['merk'] = this.state.form.merk
        if (p.url) {
          this.setState({ products: [ ...this.state.products, product ] })
          this.props.getProductDetail({ url: p.url, id: p.id })
          this.props.productVariant({ referer: p.url, id: p.id })
          setTimeout(() => {
            resolve()
          }, 5000)
        }
      }))
    }
  }

  parsingExpeditionBL (expdt) {
    let expedition = []
    if (/jne/.test(expdt)) {
      expedition.push('jner')
      expedition.push('jney')
    }
    if (/jnt/.test(expdt)) {
      expedition.push('j&tr')
    }
    if (/ninja/.test(expdt)) {
      expedition.push('ninjar')
    }
    if (/sicepat/.test(expdt)) {
      expedition.push('sicepatr')
    }
    if (/tiki/.test(expdt)) {
      expedition.push('tikir')
    }
    if (/wahana/.test(expdt)) {
      expedition.push('wahana')
    }
    if (/pos/.test(expdt)) {
      expedition.push('posk')
    }
    return expedition.join(' | ')
  }

  scrappeDetailForBL (data) {
    let newProducts = this.state.products.map((p, i) => {
      if (Number(p.id) === Number(data.id)) {
        p['weight'] = data.weight
        p['is_insurance'] = data.is_insurance === 'Optional' ? 'Tidak' : 'Ya'
        for (let i = 0; i < data.images.length; i++) {
          p[`image${i + 1}`] = data.images[i]
        }
        p['description'] = data.description !== '' ? data.description : 'Selamat datang di toko Shekilla.'
        p['expedition'] = this.parsingExpeditionBL(data.expedition)
        return p
      } else {
        return p
      }
    })
    this.setState({ products: newProducts })
  }

  parsingFor (products) {
    if (this.state.exportTo === 'shopee') {
      this.scrappeForShopee(products.products)
    } else {
      this.scrappeForBL(products.products)
    }
  }

  parsingDetailFor (productDetail) {
    if (this.state.exportTo === 'shopee') {
      this.scrappeDetailShopee(productDetail.data)
    } else {
      this.scrappeDetailForBL(productDetail.data)
    }
  }

  parsingVariantFor (variant) {
    if (this.state.exportTo === 'shopee') {
      this.scrappeVariantShopee(variant)
    }
  }

  componentWillReceiveProps (nextProps) {
    const { products, productDetail, variant, csv } = nextProps

    if (!productDetail.isFetching) {
      this.action = { ...this.action }
      if (productDetail.isFound) {
        this.parsingDetailFor(productDetail)
        console.log('state', this.state)
      }
      if (productDetail.isFailure) {
        console.log('isFailure', productDetail)
      }
    }

    if (!products.isFetching && this.action.listProducts) {
      this.action = { ...this.action, listProducts: false }
      if (products.isFound) {
        console.log('Products', products)
        this.parsingFor(products)
      }
      if (products.isFailure) {
        console.log('isFailure Products', products)
      }
    }

    if (!variant.isFetching) {
      if (variant.isFound) {
        // if bL, parsing in other file csv
        this.parsingVariantFor(variant)
        console.log(' variant', variant)
      }
      if (variant.isFailure) {
        console.log(' variant', variant)
      }
    }

    if (!csv.isFetching && this.action.generateCSV) {
      this.action = { ...this.action, generateCSV: false }
      if (csv.isFound) {
        console.log('isFound', csv)
      }
      if (csv.isFailure) {
        console.log('isFailure', csv)
      }
    }
  }

  render () {
    const { referer, merk, sc, page, rows, ob, start, filename, category } = this.state.form

    return (
      <div style={{ padding: '30px' }}>
        <h3>Scrapper Tokopedia</h3>
        <br />
        <input onChange={(e) => this.handleInput(e)} value={referer} type='text' name='referer' placeholder='referer' style={{ width: '400px' }} required /><br />{this.state.validation && <span style={{ color: 'red' }}>Mohon isi referer </span>} <br />
        <input onChange={(e) => this.handleInput(e)} value={sc} type='text' name='sc' placeholder='sc' required /><br /><br />
        <input onChange={(e) => this.handleInput(e)} value={page} type='text' name='page' placeholder='page' required /><br /><br />
        <input onChange={(e) => this.handleInput(e)} value={rows} type='text' name='rows' placeholder='rows' required /><br /><br />
        <input onChange={(e) => this.handleInput(e)} value={ob} type='text' name='ob' placeholder='ob' required /><br /><br />
        <input onChange={(e) => this.handleInput(e)} value={start} type='text' name='start' placeholder='start' required /><br /><br />
        <a onClick={() => this.setState({ exportTo: 'shopee' })} href='#'>Required Shopee</a> | <a onClick={() => this.setState({ exportTo: 'bl' })} href='#'>Required BL</a><br /><br />
        {
          this.state.exportTo === 'shopee'
          ? <div>
            <input onChange={(e) => this.handleInput(e)} value={category} type='text' name='category' placeholder='category ID' required /><br /><br />
            <input onChange={(e) => this.handleInput(e)} value={filename} type='text' name='filename' placeholder='filename/category' required /><br /><br />
            {this.props.productDetail.isFound && this.csvShopee()}
          </div>
          : <div>
            <input onChange={(e) => this.handleInput(e)} value={merk} type='text' name='merk' placeholder='merk' required /><br /><br />
            <input onChange={(e) => this.handleInput(e)} value={filename} type='text' name='filename' placeholder='filename/category' required /><br /><br />
            {this.props.productDetail.isFound && this.csvCreator() }
          </div>
        }
        <br /><br />
        <button onClick={() => this.onSubmit()}>Scrape Now</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  products: state.products,
  productDetail: state.productDetail,
  variant: state.variant,
  csv: state.csv
})
const mapDispatchToProps = (dispatch) => ({
  listProducts: (data) => dispatch(ProductsActions.productsRequest(data)),
  getProductDetail: (data) => dispatch(ProductsActions.productDetailRequest(data)),
  productVariant: (data) => dispatch(ProductsActions.variantRequest(data)),
  generateCSV: (data) => dispatch(ProductsActions.csvRequest(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
