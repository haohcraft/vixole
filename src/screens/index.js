/* eslint-disable no-unused-vars */
import { AppRegistry } from 'react-native';
import { Navigation } from 'react-native-navigation';
import Onboard from './Onboard';
import ScanScreen from './Scan';

import DiscoverScreen from './Discover';
import ProfileScreen from './Profile';
import LoginScreen from './Login';

export function registerScreens(store, Provider) {
    Navigation.registerComponent('v.Onboard', () => Onboard, store, Provider);
    Navigation.registerComponent('v.ScanScreen', () => ScanScreen, store, Provider);
    Navigation.registerComponent('v.DiscoverScreen', () => DiscoverScreen, store, Provider);
    Navigation.registerComponent('v.ProfileScreen', () => ProfileScreen, store, Provider);
    Navigation.registerComponent('v.LoginScreen', () => LoginScreen, store, Provider);
}
