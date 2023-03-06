import * as React from 'react';
import {RouterProvider, createMemoryRouter} from 'react-router-dom';
import {ToastContainer, Flip} from 'react-toastify';
import Sidebar from '/@/ui/Sidebar';
import 'react-toastify/dist/ReactToastify.min.css';
import {MenusProvider} from '/@/features/router/ui/Context';
import {RouterMetadata} from '/@/features/router/RouterMetadata';

/** Game Root will hold all objects required to display the Game UI */
const GameRoot: React.FC = () => {
  const router = createMemoryRouter(RouterMetadata);

  return (
    <MenusProvider>
      <Sidebar router={router} />
      <RouterProvider router={router} />
      <ToastContainer
        position="bottom-right"
        autoClose={800}
        hideProgressBar={true}
        pauseOnHover={false}
        pauseOnFocusLoss={false}
        newestOnTop={true}
        closeOnClick={true}
        transition={Flip}
        limit={1}
        draggable={false}
      />
    </MenusProvider>
  );
};

export default GameRoot;
