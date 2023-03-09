import {defineStyleConfig} from '@chakra-ui/react';

/** Overrides the default styling of Chakra Alert */
export const Alert = defineStyleConfig({
  variants: {
    solid: {
      container: {
        bg: 'sienna.500',
      },
    },
  },
});
