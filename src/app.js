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
import { widthPercentage } from './lib/utils';

const theme = getTheme(themeVariables);
Theme.setDefaultThemeStyle(theme);

const store = configureStore();
registerScreens(store, Provider);

const tabIconShift = widthPercentage(20) / 2;
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
                    screen: 'v.DiscoverScreen',
                    icon: iconsMap['ios-search'],
                    iconInsets: {
                        top: 6,
                        left: -tabIconShift,
                        bottom: -6,
                        right: tabIconShift
                    },
                }, {
                    screen: 'v.ProfileScreen',
                    icon: iconsMap['ios-person'],
                    iconInsets: {
                        top: 6,
                        left: 0,
                        bottom: -6,
                        right: 0
                    },

                }, {
                    screen: 'v.CollectionScreen',
                    icon: iconsMap['ios-person'],
                    iconInsets: {
                        top: 6,
                        left: tabIconShift,
                        bottom: -6,
                        right: -tabIconShift
                    },

                }
            ],
            tabsStyle: {
                tabBarTranslucent: true,
            }
        });
    }
}

export default App;
