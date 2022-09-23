import { ToastContainer } from 'react-toastify';

import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <ToastContainer theme='dark' />
    </>
  )
}

export default MyApp
