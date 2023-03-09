import {createStandaloneToast} from '@chakra-ui/react';
import theme from '..';

/** Allows ability to toast from anywhere, even outside React Components */
export const {ToastContainer, toast} = createStandaloneToast({theme});
