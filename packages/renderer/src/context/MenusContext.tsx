/* eslint-disable @typescript-eslint/no-empty-function */
import React, {useContext, useReducer} from 'react';
import type {MenusState} from './MenusReducer';
import {MenusActionsType} from './MenusReducer';
import {MenuInfo} from '../data/Menus';

import MenusReducer from './MenusReducer';

const initialMenus: MenusState = {...MenuInfo, setMenu: () => {}, updateVisible: () => {}};

const MenusContext = React.createContext(initialMenus);

export const useMenus = () => useContext(MenusContext);

export const MenusProvider = ({children}: React.PropsWithChildren) => {
  const [state, dispatch] = useReducer(MenusReducer, initialMenus);

  const updateVisible = () => {
    dispatch({type: MenusActionsType.IS_VISIBLE, payload: ''});
  };

  const setMenu = (payload: string) => {
    dispatch({type: MenusActionsType.SET_MENU, payload: payload});
  };

  return (
    <MenusContext.Provider
      value={{menus: state.menus, updateVisible, selectedMenu: state.selectedMenu, setMenu}}
    >
      {children}
    </MenusContext.Provider>
  );
};
