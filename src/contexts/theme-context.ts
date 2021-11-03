import {createContext} from 'react';
import {
  DANGER,
  WHITE,
  BACK,
  DEFAULTCOLOR,
  DT_PRIMARY_100,
  LT_PRIMARY_100,
  LT_PRIMARY_075,
  LT_PRIMARY_050,
  LT_PRIMARY_025,
  DT_PRIMARY_025,
  DT_PRIMARY_050,
  DT_PRIMARY_075,
} from '@constants/colors';
import {THEME_DARK_VALUE, THEME_LIGHT_VALUE} from '@constants/async-storage';

export interface Theme {
  primary100: typeof DT_PRIMARY_100 | typeof LT_PRIMARY_100;
  primary075: typeof DT_PRIMARY_075 | typeof LT_PRIMARY_075;
  primary050: typeof DT_PRIMARY_050 | typeof LT_PRIMARY_050;
  primary025: typeof DT_PRIMARY_025 | typeof LT_PRIMARY_025;
  danger: typeof DANGER;
  white: typeof WHITE;
  back: typeof BACK;
  defaultColor: typeof DEFAULTCOLOR;
}

export interface Themes {
  [THEME_DARK_VALUE]: Theme;
  [THEME_LIGHT_VALUE]: Theme;
}

export const themes: Themes = {
  light: {
    primary100: LT_PRIMARY_100,
    primary075: LT_PRIMARY_075,
    primary050: LT_PRIMARY_050,
    primary025: LT_PRIMARY_025,
    danger: DANGER,
    white: WHITE,
    back: BACK,
    defaultColor: DEFAULTCOLOR,
  },
  dark: {
    primary100: DT_PRIMARY_100,
    primary075: DT_PRIMARY_075,
    primary050: DT_PRIMARY_050,
    primary025: DT_PRIMARY_025,
    danger: DANGER,
    white: WHITE,
    back: BACK,
    defaultColor: DEFAULTCOLOR,
  },
};

interface ThemeContextInterface {
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextInterface>({
  theme: themes[THEME_DARK_VALUE],
  toggleTheme: () => {}, // eslint-disable-line
});
