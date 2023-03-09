import React, {lazy} from 'react';

import {Player} from '/@/player';

const Home = lazy(() => import('/@/ui/GameMenu/Home'));
const UnlockedMenu = lazy(() => import('/@/ui/Unlocked'));
const DevMenu = lazy(() => import('/@/ui/DevMenu/DevMenu'));
const ErrorMenu = lazy(() => import('/@/ui/GameMenu/Error'));

export default interface Menu {
  id: string;
  name: string;
  path: string;
  element: JSX.Element;
  errorElement: JSX.Element;
  isVisible(): boolean;
}

export const RouterMetadata: Menu[] = [
  {
    id: '0',
    path: '/',
    element: <Home />,
    errorElement: <ErrorMenu />,
    isVisible: () => true,
    name: 'Home',
  },
  {
    id: '1',
    path: '/dev',
    element: <DevMenu />,
    errorElement: <ErrorMenu />,
    isVisible: () => (import.meta.env.DEV ? true : false),
    name: 'Dev',
  },
  {
    id: '2',
    path: '/unlocked',
    element: <UnlockedMenu />,
    errorElement: <ErrorMenu />,
    isVisible: () => (Player.unlocked ? true : false),
    name: 'Unlocked',
  },
];
