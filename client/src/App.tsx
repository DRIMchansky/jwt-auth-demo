import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Outlet } from 'react-router-dom'

import { Layout } from './components/Layout'
import { Header } from './components/Header'

const App = () => {
  return (
    <>
      <Header />
      <ToastContainer />
      <Layout>
        <Outlet />
      </Layout>
    </>
  )
}

export default App
