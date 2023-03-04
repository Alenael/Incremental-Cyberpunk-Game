import type Menu from '../MenusMetadata';
import {MenusMetadata} from '../MenusMetadata';
import React, {useContext} from 'react';
import {useRender} from '/@/hooks/useRender';

/** Holds our Menu Metadata and any logic tied up in the menu system */
export class MenuData {
  menus: Menu[] = MenusMetadata;
  selectedMenu = '';

  setMenu(id: string): void {
    this.selectedMenu = id;
  }
}

export const Menus = new MenuData();
export const Context = React.createContext<MenuData>({} as MenuData);

export const MenusProvider = ({children}: any) => {
  useRender();

  return <Context.Provider value={Menus}>{children}</Context.Provider>;
};

export const useMenus = (): MenuData => useContext(Context);
