import {extendTheme} from '@chakra-ui/react';
import {Button} from './components/Button';
import {colors} from './foundations/Colors';
import {styles} from './styles';

const overrides = {
  styles,
  components: {Button},
  colors,
};
export default extendTheme(overrides);
