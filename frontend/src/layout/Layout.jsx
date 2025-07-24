import Nav from '../components/Nav/Nav';
import Footer from '../components/Footer/Footer';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar fija */}
      <Nav />

      {/* Contenido con scroll interno */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <div className="flex-1 overflow-y-auto justify-center items-center bg-white">
          <div className="min-h-full flex flex-col">
            <Outlet />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
