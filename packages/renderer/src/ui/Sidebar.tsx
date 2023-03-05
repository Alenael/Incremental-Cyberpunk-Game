import * as React from 'react';
import type {Router} from '@remix-run/router';
import {useMenus} from '../features/menus/ui/Context';
import {useRender} from '../hooks/useRender';
import {Button} from '@chakra-ui/react';

interface SidebarProps {
  router: Router;
}

/** Sidebar will hold all objects required to display the Sidebar UI */
const Sidebar: React.FC<SidebarProps> = ({router}: SidebarProps) => {
  const menus = useMenus();
  useRender();

  return (
    <div className="sidebar">
      {menus.menus
        .filter(m => m.isVisible())
        .map(button => (
          <Button
            key={button.id}
            onClick={() => {
              router.navigate(button.path);
              menus.setMenu(button.id);
            }}
          >
            {button.name}
          </Button>
        ))}
    </div>
  );
};

export default Sidebar;
