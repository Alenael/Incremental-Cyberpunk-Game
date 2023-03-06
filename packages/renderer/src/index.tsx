import * as React from 'react';
import ReactDOM from 'react-dom/client';

import App from '/@/app';
import {ChakraProvider} from '@chakra-ui/react';
import theme from '/@/ui/theme';
import {ToastContainer} from './ui/theme/components/Toast';

/** Main entry way into application */
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
      <ToastContainer />
    </ChakraProvider>
  </React.StrictMode>,
);
