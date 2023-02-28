import * as React from 'react';
import type {Router} from '@remix-run/router';
import {useMenus} from '../context/MenusContext';

interface SidebarProps {
  router: Router;
}

const Sidebar: React.FC<SidebarProps> = ({router}: SidebarProps) => {
  const {menus, setMenu} = useMenus();

  return (
    <div className="sidebar">
      {menus
        .filter(m => m.visible)
        .map(button => (
          <button
            key={button.id}
            onClick={() => {
              router.navigate(button.path);
              setMenu(button.id);
            }}
          >
            {button.name}
          </button>
        ))}
    </div>
  );
};

export default Sidebar;
