import * as React from 'react';
import './app.css';
import Sidebar from './ui/Sidebar';
import {RouterProvider, createMemoryRouter} from 'react-router-dom';
import {MenusProvider} from './context/MenusContext';
import {MenuInfo} from './data/Menus';

const App: React.FC = () => {
  const router = createMemoryRouter(MenuInfo.menus);

  return (
    <MenusProvider>
      <Sidebar router={router} />
      <RouterProvider router={router} />
    </MenusProvider>
  );
};

export default App;
