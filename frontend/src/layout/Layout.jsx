import { Outlet } from 'react-router-dom'
import Nav from '../components/Nav/Nav'
import Footer from '../components/Footer/Footer'

const Layout = () => {
  return (
    <>
      <Nav />
      <Outlet />
      <Footer />
    </>
  )
}

export default Layout