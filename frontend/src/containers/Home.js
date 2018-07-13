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
        merk: 'lainnya',
        sc: 0,
        page: 1,
        rows: 200,
        ob: 8,
        filename: ''
      },
      products: [],
      validation: false
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
    const { referer, sc, page, rows, ob } = this.state.form
    if (referer) {
      this.action = { ...this.action, listProducts: true }
      this.setState({ validation: false })
      this.props.listProducts({ referer, sc, page, rows, ob })
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
        <p>Download CSV</p>
      </CsvCreator>
    )
  }

  componentWillReceiveProps (nextProps) {
    const { products, productDetail, csv } = nextProps

    if (!productDetail.isFetching) {
      this.action = { ...this.action }
      if (productDetail.isFound) {
        let newProducts = this.state.products.map((p, i) => {
          if (Number(p.id) === Number(productDetail.data.id)) {
            p['weight'] = productDetail.data.weight
            p['is_insurance'] = productDetail.data.is_insurance === 'Optional' ? 'Tidak' : 'Ya'
            for (let i = 0; i < productDetail.data.images.length; i++) {
              p[`image${i + 1}`] = productDetail.data.images[i]
            }
            p['description'] = productDetail.data.description !== '' ? productDetail.data.description : 'Selamat datang di toko Shekilla.'
            p['expedition'] = productDetail.data.expedition
            return p
          } else {
            return p
          }
        })
        this.setState({ products: newProducts })
        console.log('productDetail', productDetail)
        console.log('state', this.state)
      }
      if (productDetail.isFailure) {
        console.log('isFailure', productDetail)
      }
    }

    if (!products.isFetching && this.action.listProducts) {
      this.action = { ...this.action, listProducts: false }
      if (products.isFound) {
        console.log('isFound', products)
        for (let i = 0, pr = Promise.resolve(); i < products.products.length; i++) {
          pr = pr.then(_ => new Promise(resolve => {
            let p = products.products[i]
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
              setTimeout(() => {
                resolve()
              }, 5000)
            }
          }))
        }
      }
      if (products.isFailure) {
        console.log('isFailure', products)
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
    const { referer, merk, sc, page, rows, ob, filename } = this.state.form

    return (
      <div style={{ padding: '20px' }}>
        <h3>Scrapper Tokopedia</h3>
        <br />
        <div className='container'>
          <input onChange={(e) => this.handleInput(e)} value={referer} type='text' name='referer' placeholder='referer' required /><br />{this.state.validation && <span style={{ color: 'red' }}>Mohon isi referer </span>} <br />
          <input onChange={(e) => this.handleInput(e)} value={merk} type='text' name='merk' placeholder='merk' required /><br /><br />
          <input onChange={(e) => this.handleInput(e)} value={sc} type='text' name='sc' placeholder='sc' required /><br /><br />
          <input onChange={(e) => this.handleInput(e)} value={page} type='text' name='page' placeholder='page' required /><br /><br />
          <input onChange={(e) => this.handleInput(e)} value={rows} type='text' name='rows' placeholder='rows' required /><br /><br />
          <input onChange={(e) => this.handleInput(e)} value={ob} type='text' name='ob' placeholder='ob' required /><br /><br />
          <input onChange={(e) => this.handleInput(e)} value={filename} type='text' name='filename' placeholder='filename/category' required /><br /><br />
          <button onClick={() => this.onSubmit()}>Scrape Now</button>
        </div>
        <br /><br />
        {this.props.productDetail.isFound && this.csvCreator() }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  products: state.products,
  productDetail: state.productDetail,
  csv: state.csv
})
const mapDispatchToProps = (dispatch) => ({
  listProducts: (data) => dispatch(ProductsActions.productsRequest(data)),
  getProductDetail: (data) => dispatch(ProductsActions.productDetailRequest(data)),
  generateCSV: (data) => dispatch(ProductsActions.csvRequest(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
