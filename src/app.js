/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import { Theme } from '@shoutem/theme';
import { getTheme } from '@shoutem/ui';

import configureStore from './configureStore';
import { registerScreens } from './screens';
import { themeVariables } from './theme';
import { navObj as onBoardNavObj } from './screens/Onboard';
import { iconsLoaded, iconsMap } from './theme/icons';

const theme = getTheme(themeVariables);
Theme.setDefaultThemeStyle(theme);

const store = configureStore();
registerScreens(store, Provider);

class App extends Component {
    constructor(props) {
        super(props);
        iconsLoaded.then(() => {
            this.startApp();
        });
    }
    startApp() {
        Navigation.startTabBasedApp({
            tabs: [
                {
                    label: 'Discover',
                    screen: 'v.DiscoverScreen',
                    icon: iconsMap['ios-search']
                }, {
                    label: 'My VIXOLE',
                    screen: 'v.ProfileScreen',
                    icon: iconsMap['ios-person']
                }
            ]
        });
    }
}

export default App;
