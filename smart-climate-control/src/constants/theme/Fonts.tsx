import * as Siz from './Sizes';
import * as col from './Colors';
import { TextStyle } from "react-native";

interface Fonts {
  welcome: TextStyle;
  name: TextStyle;
  caption: TextStyle;
  h1: TextStyle;
  button: TextStyle;
}

export const fonts: Fonts = {
    welcome: {
      fontSize: Siz.sizes.welcome,
      color: col.colors.gray,
      letterSpacing: -0.6,
      lineHeight: Siz.sizes.welcome + 4,
    },
    name: {
      fontSize: Siz.sizes.name,
      fontWeight: '600',
      color: col.colors.black,
      letterSpacing: -1.1,
      lineHeight: Siz.sizes.name + 4,
    },
    caption: {
      fontSize: Siz.sizes.welcome,
      color: col.colors.gray,
      letterSpacing: -0.6,
      lineHeight: Siz.sizes.welcome + 4,
    },
    h1: {
      fontSize: Siz.sizes.h1,
      color: col.colors.black,
      letterSpacing: -5,
      lineHeight: Siz.sizes.h1,
    },
    button: {
      fontSize: Siz.sizes.button,
      color: col.colors.black,
      fontWeight: '600',
      letterSpacing: -0.4,
      lineHeight: Siz.sizes.button + 4,
    },
  };