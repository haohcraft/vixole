/* eslint-disable no-unused-vars */
import { AppRegistry } from 'react-native';
import { Navigation } from 'react-native-navigation';
import Onboard from './Onboard';

export function registerScreens(store, Provider) {
    Navigation.registerComponent('v.Onboard', () => Onboard, store, Provider);
}
