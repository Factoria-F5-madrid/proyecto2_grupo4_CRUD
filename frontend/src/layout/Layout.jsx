// src/layout/Layout.jsx
import Nav from '../components/Nav/Nav'
import Footer from '../components/Footer/Footer'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Nav />

      {/* Contenido + Footer */}
      <div className="flex flex-col flex-1">
        <main className="flex-1 bg-[#ffffff] overflow-y-auto flex items-center justify-center">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default Layout
