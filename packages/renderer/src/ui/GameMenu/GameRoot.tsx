import * as React from 'react';
import {RouterProvider, createMemoryRouter} from 'react-router-dom';

import Sidebar from '/@/features/sidebar/Sidebar';
import {ToastContainer} from '/@/ui/theme/components/Toast';
import {MenusProvider} from '/@/features/router/Context';
import {RouterMetadata} from '/@/features/router/RouterMetadata';
import {PlayerInfo} from './Components/PlayerPanel';

/** Game Root will hold all objects required to display the Game UI */
const GameRoot: React.FC = () => {
  const router = createMemoryRouter(RouterMetadata);

  return (
    <MenusProvider>
      <Sidebar router={router} />
      <RouterProvider router={router} />
      <PlayerInfo />
      <ToastContainer />
    </MenusProvider>
  );
};

export default GameRoot;
