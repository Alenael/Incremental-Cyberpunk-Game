import type {MenuData} from '../data/Menus';
import type Menu from '../data/Menus';

export enum MenusActionsType {
  IS_VISIBLE = 'IS_VISIBLE',
  SET_MENU = 'SET_MENU',
}

export interface MenusState extends MenuData {
  updateVisible: () => void;
  setMenu: (payload: string) => void;
}

type MenusAction = {
  type: MenusActionsType;
  payload: string;
};

function UpdateVisibleMenus(menus: Menu[]) {
  for (const menu of menus) menu.visible = menu.isVisible();
  return menus;
}

export default (state: MenusState, action: MenusAction) => {
  const {type, payload} = action;
  switch (type) {
    case MenusActionsType.IS_VISIBLE:
      return {
        ...state,
        menus: UpdateVisibleMenus(state.menus),
      };

    case MenusActionsType.SET_MENU:
      return {
        ...state,
        selectedMenu: payload,
      };

    default:
      return state;
  }
};
