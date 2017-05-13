/* eslint-disable no-unused-vars */
import { Provider } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import { Theme } from '@shoutem/theme';
import { getTheme } from '@shoutem/ui';

import configureStore from './configureStore';
import { registerScreens } from './screens';
import { themeVariables } from './theme';
import { navObj as onBoardNavObj } from './screens/Onboard';

const theme = getTheme(themeVariables);
Theme.setDefaultThemeStyle(theme);

const store = configureStore();
registerScreens(store, Provider);

Navigation.showModal({
    screen: 'v.Onboard'
});

