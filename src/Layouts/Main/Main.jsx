import React from 'react';
import { Outlet } from 'react-router-dom';
import Navber from '../../components/Navbar/Navber';
import { Footer } from '../../components/Footer/Footer';

const Main = () => {
   return (
      <div>
         <Navber />
         <Outlet />
         <Footer />
      </div>
   );
};

export default Main;