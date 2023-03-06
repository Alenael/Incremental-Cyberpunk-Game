import * as React from 'react';
import {RouterProvider, createMemoryRouter} from 'react-router-dom';
import Sidebar from '/@/ui/Sidebar';
import {MenusProvider} from '/@/features/router/ui/Context';
import {RouterMetadata} from '/@/features/router/RouterMetadata';

/** Game Root will hold all objects required to display the Game UI */
const GameRoot: React.FC = () => {
  const router = createMemoryRouter(RouterMetadata);

  return (
    <MenusProvider>
      <Sidebar router={router} />
      <RouterProvider router={router} />
    </MenusProvider>
  );
};

export default GameRoot;
