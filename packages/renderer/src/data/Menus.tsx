import React from 'react';
import Home from '../ui/Pages/Home';
import UnlockedMenu from '../ui/Pages/Unlocked';
import DevMenu from '../ui/Pages/Dev';
import ErrorMenu from '../ui/Pages/Error';
import Player from '../features/Player';

export default interface Menu {
  id: string;
  name: string;
  path: string;
  element: JSX.Element;
  errorElement: JSX.Element;
  visible: boolean;
  isVisible(): boolean;
}

export interface MenuData {
  menus: Menu[];
  selectedMenu: string;
}

export const MenuInfo: MenuData = {
  menus: [
    {
      id: '0',
      path: '/',
      element: <Home />,
      errorElement: <ErrorMenu />,
      visible: true,
      isVisible: () => true,
      name: 'Home',
    },
    {
      id: '1',
      path: '/dev',
      element: <DevMenu />,
      errorElement: <ErrorMenu />,
      visible: import.meta.env.DEV ? true : false,
      isVisible: () => (import.meta.env.DEV ? true : false),
      name: 'Dev',
    },
    {
      id: '2',
      path: '/unlocked',
      element: <UnlockedMenu />,
      errorElement: <ErrorMenu />,
      visible: false,
      isVisible: () => (Player.unlocked ? true : false),
      name: 'Unlocked',
    },
  ],
  selectedMenu: '0',
};
