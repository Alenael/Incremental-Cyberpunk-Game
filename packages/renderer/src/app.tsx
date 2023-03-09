import React, {Suspense} from 'react';

import {ChakraProvider} from '@chakra-ui/react';

import theme from '/@/ui/theme';
import {Start} from '/@/ui/StartMenu/Start';

/** Executes the games run */
const App: React.FC = () => {
  return (
    <ChakraProvider theme={theme}>
      <Suspense>
        <Start />
      </Suspense>
    </ChakraProvider>
  );
};

export default App;
