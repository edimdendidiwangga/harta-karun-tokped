import Document, { Head, Main, NextScript } from 'next/document'
// import api from '../src/services/Api'

class HomeDocument extends Document {
  static async getInitialProps (ctx) {
    const props = await Document.getInitialProps(ctx)
    return { ...props }
  }

  render () {
    return (
      <html lang={this.props.__NEXT_DATA__.props.lang || 'en'}>
        <Head>
          <meta charSet='UTF-8' />
          <title>title</title>
          <meta content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' name='viewport' />
          <meta name='apple-mobile-web-app-status-bar-style' content='black' />
          <link rel='stylesheet prefetch' href={`/static/css/styles.min.css`} />
        </Head>
        <body>
          <Main />
          {/* <script src='https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js' /> */}
          <script src={`/static/js/script.min.js`} />
          <NextScript />

        </body>
      </html>
    )
  }
}

export default HomeDocument
