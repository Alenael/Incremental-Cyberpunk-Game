import * as React from 'react';
import type {Router} from '@remix-run/router';

import {Box, Button} from '@chakra-ui/react';

import {useRender} from '/@/hooks/useRender';
import {useMenus} from '../router/Context';

interface SidebarProps {
  router: Router;
}

/** Sidebar will hold all objects required to display the Sidebar UI */
const Sidebar: React.FC<SidebarProps> = ({router}: SidebarProps) => {
  const menus = useMenus();
  useRender();

  return (
    <Box className="sidebar">
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
    </Box>
  );
};

export default Sidebar;
