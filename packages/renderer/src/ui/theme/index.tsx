import {extendTheme} from '@chakra-ui/react';
import {Alert} from './components/Alert';
import {Button} from './components/Button';
import {colors} from './foundations/Colors';
import {styles} from './styles';

const overrides = {
  styles,
  components: {
    Button,
    Alert,
    // Alert: {
    //   variants: {
    //     solid: () => {
    //       return {
    //         container: {
    //           bg: `sienna.500`,
    //         },
    //       };
    //     },
    //   },
    // },
  },
  colors,
};

export default extendTheme(overrides);
