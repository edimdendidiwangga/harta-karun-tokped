import React from 'react'
import api from '../services/Api'
import {connect} from 'react-redux'

// Components
class Home extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      form: {
        referer: '',
        page: '',
        rows: '',
        ob: ''
      }
    }
  }

  handleInput (e) {
    const { name, value } = e.target
    const { form } = this.state
    let newState = { form }
    newState.form[name] = value
    this.setState(newState)
  }
  // 'https://www.tokopedia.com/p/fashion-wanita/sepatu/sandal'
  async onSubmit () {
    const { referer, page, rows, ob } = this.state.form
    const hokya = await api.create().listProducts({ referer, page, rows, ob })
    console.log('hokya', hokya)
  }

  render () {
    const { referer, page, rows, ob } = this.state.form
    // console.log('props', JSON.parse(dataTokped.replace('angular.callbacks._0(', '').slice(0, -1)))
    return (
      <div style={{ padding: '20px' }}>
        <h3>Scrapper Tokopedia</h3>
        <br />
        <div className='container'>
          <input onChange={(e) => this.handleInput(e)} value={referer} type='text' name='referer' placeholder='referer' required /><br /><br />
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
  // company: state.company,
  // campaigns: state.campaigns
})
const mapDispatchToProps = (dispatch) => ({
  // listCampaigns: (data) => dispatch(CampaignsActions.campaignsRequest(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
