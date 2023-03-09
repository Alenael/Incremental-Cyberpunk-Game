import {extendTheme} from '@chakra-ui/react';
import {Alert} from './components/Alert';
import {Button} from './components/Button';
import {colors} from './foundations/Colors';
import {styles} from './styles';

const overrides = {
  styles,
  components: {
    Alert,
    Button,
  },
  colors,
};

/** Creates an extended Chakra UI Theme */
export default extendTheme(overrides);
