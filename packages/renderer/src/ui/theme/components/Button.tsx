import {defineStyleConfig} from '@chakra-ui/react';

export const Button = defineStyleConfig({
  baseStyle: {
    borderRadius: 'none',
    border: '2px solid',
  },
  sizes: {
    sm: {
      px: 4,
      h: '30px',
      fontSize: '20px',
    },
    md: {
      px: 6,
      h: '50px',
      fontSize: '25px',
    },
    lg: {
      px: 8,
      h: '70px',
      fontSize: '30px',
    },
  },
  variants: {
    primary: {
      borderColor: 'smoke.500',
      color: 'sienna.300',
      bg: 'smoke.600',
      _hover: {
        bg: 'smoke.500',
      },
    },
    secondary: {
      border: '2px solid',
      borderColor: 'smoke.500',
      bg: 'smoke.100',
      color: 'smoke.600',
      _hover: {
        bg: 'smoke.300',
      },
    },
  },
  defaultProps: {
    size: 'sm',
    variant: 'primary',
  },
});
