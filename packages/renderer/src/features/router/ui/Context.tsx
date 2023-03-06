import type Menu from '../RouterMetadata';
import React, {useContext} from 'react';
import {RouterMetadata} from '../RouterMetadata';

/** Holds our Menu Metadata and any logic tied up in the menu system */
export class MenuData {
  menus: Menu[] = RouterMetadata;
  selectedMenu = '';

  setMenu(id: string): void {
    this.selectedMenu = id;
  }
}

export const Menus = new MenuData();
export const Context = React.createContext<MenuData>({} as MenuData);

export const MenusProvider = ({children}: any) => {
  return <Context.Provider value={Menus}>{children}</Context.Provider>;
};

export const useMenus = (): MenuData => useContext(Context);
