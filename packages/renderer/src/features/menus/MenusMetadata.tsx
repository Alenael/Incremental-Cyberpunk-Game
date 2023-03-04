import React from 'react';
import Home from '../../ui/Pages/Home';
import UnlockedMenu from '../../ui/Pages/Unlocked';
import DevMenu from '../../ui/Pages/Dev';
import ErrorMenu from '../../ui/Pages/Error';
import {Player} from '../Player';

export default interface Menu {
  id: string;
  name: string;
  path: string;
  element: JSX.Element;
  errorElement: JSX.Element;
  isVisible(): boolean;
}

export const MenusMetadata: Menu[] = [
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
