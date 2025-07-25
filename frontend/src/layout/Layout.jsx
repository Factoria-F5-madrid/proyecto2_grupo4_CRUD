import { useEffect, useState } from 'react';
import Nav from '../components/Nav/Nav';
import Footer from '../components/Footer/Footer';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeIn(true);
    }, 50); 
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`flex h-screen overflow-hidden transition-opacity duration-700 ${
        fadeIn ? 'opacity-100' : 'opacity-0'
      }`}
    >
      
      <Nav />

    
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
