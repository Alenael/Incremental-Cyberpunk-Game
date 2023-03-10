import * as React from 'react';
import {RouterProvider, createMemoryRouter} from 'react-router-dom';

import Sidebar from '/@/features/sidebar/Sidebar';
import {ToastContainer} from '/@/ui/theme/components/Toast';
import {MenusProvider} from '/@/features/router/Context';
import {RouterMetadata} from '/@/features/router/RouterMetadata';
import {Tracker} from './Components/Tracker';
import {PlayerTracker} from './Components/PlayerTracker';

/** Game Root will hold all objects required to display the Game UI */
const GameRoot: React.FC = () => {
  const router = createMemoryRouter(RouterMetadata);
  return (
    <MenusProvider>
      <Sidebar router={router} />
      <RouterProvider router={router} />
      <Tracker>{parentOpen => <PlayerTracker parentOpen={parentOpen} />}</Tracker>
      <ToastContainer />
    </MenusProvider>
  );
};

export default GameRoot;
