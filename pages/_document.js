import Document, { Html, Head, Main, NextScript } from 'next/document'
import Navigation from '../components/Navigation/index'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <body style={{backgroundImage:"url('/bg_1.svg')",backgroundPositionX: 'right',backgroundRepeat:'no-repeat'}}>
          <Navigation></Navigation>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
