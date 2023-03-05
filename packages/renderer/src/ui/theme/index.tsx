import {extendTheme} from '@chakra-ui/react';
import {ButtonStyle} from './components/Button';
import {Colors} from './foundations/Colors';
import {Styles} from './styles';

const overrides = {
  Styles,
  components: {ButtonStyle},
  colors: Colors,
};

export default extendTheme(overrides);
