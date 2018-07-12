import React from 'react'
import { connect } from 'react-redux'
import { Creators as ProductsActions } from '../redux/Products'

// Components
class Home extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      form: {
        referer: '', // 'https://www.tokopedia.com/p/fashion-wanita/sepatu/sandal'
        page: 1,
        rows: 200,
        ob: 8
      },
      products: [],
      validation: false
    }
    this.action = { listProducts: false, getProductDetail: false }
  }

  handleInput (e) {
    const { name, value } = e.target
    const { form } = this.state
    let newState = { form }
    newState.form[name] = value
    this.setState(newState)
  }

  async onSubmit () {
    const { referer, page, rows, ob } = this.state.form
    if (referer) {
      this.action = { ...this.action, listProducts: true }
      this.setState({ validation: false })
      this.props.listProducts({ referer, page, rows, ob })
    } else {
      this.setState({ validation: true })
    }
  }

  componentWillReceiveProps (nextProps) {
    const { products, productDetail } = nextProps

    if (!productDetail.isFetching) {
      this.action = { ...this.action }
      if (productDetail.isFound) {
        let newProducts = this.state.products.map((p, i) => {
          if (Number(p.id) === Number(productDetail.data.id)) {
            p['weight'] = productDetail.data.weight
            p['is_insurance'] = productDetail.data.is_insurance
            p['images'] = productDetail.data.images
            p['description'] = productDetail.data.description
            return p
          } else {
            return p
          }
        })
        this.setState({ products: newProducts })
        console.log('productDetail', productDetail)
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
            product['name'] = p.name
            product['stock'] = p.stock === 0 ? 10 : p.stock
            product['price'] = p.price_int
            product['price_sale'] = p.price_int + ((p.price_int * 30) / 100)
            product['condition'] = p.condition
            this.setState({ products: [ ...this.state.products, product ] })
            if (p.url) {
              this.props.getProductDetail({ url: p.url, id: p.id })
              resolve()
            }
          }))
        }
      }
      if (products.isFailure) {
        console.log('isFailure', products)
      }
    }
  }

  render () {
    console.log('state', this.state)
    const { referer, page, rows, ob } = this.state.form
    return (
      <div style={{ padding: '20px' }}>
        <h3>Scrapper Tokopedia</h3>
        <br />
        <div className='container'>
          <input onChange={(e) => this.handleInput(e)} value={referer} type='text' name='referer' placeholder='referer' required /><br />{this.state.validation && <span style={{ color: 'red' }}>Mohon isi referer </span>} <br />
          <input onChange={(e) => this.handleInput(e)} value={page} type='text' name='page' placeholder='page' required /><br /><br />
          <input onChange={(e) => this.handleInput(e)} value={rows} type='text' name='rows' placeholder='rows' required /><br /><br />
          <input onChange={(e) => this.handleInput(e)} value={ob} type='text' name='ob' placeholder='ob' required /><br /><br />
          <button onClick={() => this.onSubmit()}>Scrape Now</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  products: state.products,
  productDetail: state.productDetail
})
const mapDispatchToProps = (dispatch) => ({
  listProducts: (data) => dispatch(ProductsActions.productsRequest(data)),
  getProductDetail: (data) => dispatch(ProductsActions.productDetailRequest(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
