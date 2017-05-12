/* eslint-disable no-unused-vars */
import { Provider } from 'react-redux';
import { Navigation } from 'react-native-navigation';

import configureStore from './configureStore';
import { registerScreens } from './screens';
import theme from './theme';
import { navObj as onBoardNavObj } from './screens/Onboard';

const store = configureStore();
registerScreens(store, Provider);

Navigation.startSingleScreenApp({
    screen: onBoardNavObj
});

