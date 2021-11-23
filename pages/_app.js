import Navigation from '../components/Navigation'
import '../styles/globals.scss'

function MyApp({ Component, pageProps }) {
  return (
    <div className="app-container">
      <div className="site-container">
        <Navigation />
        <Component {...pageProps} />
      </div>
    </div>
  )
}

export default MyApp
