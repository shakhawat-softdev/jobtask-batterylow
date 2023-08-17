import React from 'react';
import { Outlet } from 'react-router-dom';

const Main = () => {
   return (
      <div>
         <header>This is Header</header>
         <Outlet />
         <footer>This Is footer</footer>
      </div>
   );
};

export default Main;