import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { get } from 'lodash';

import {
    Screen,
    View,
    Text,
    Divider,
    Caption,
    Row,
    TouchableOpacity
} from '@shoutem/ui';
import Icon from 'react-native-vector-icons/Ionicons';

import Colors from '../../theme/colors';
import { navObj as onBoardNavObj } from '../Onboard';
import BleActions from '../../middlewares/ble/actions';

/* eslint-disable */
const image = require('../../assets/images/1_bird.jpg');
/* eslint-enable */

class ProfileScreen extends Component {
    static propTypes = {
        navigator: PropTypes.object.isRequired,
        disconnectDevice: PropTypes.func.isRequired,
        isConnected: PropTypes.bool.isRequired,
        selectedDevice: PropTypes.object
    };

    render() {
        return (
            <Screen>
                <View>
                    <Divider styleName="section-header">
                        <Caption>VIXOLE Sneaker</Caption>
                    </Divider>
                        { this.renderDevice() }
                    <Divider styleName='line' />
                </View>
            </Screen>
        );
    }

    renderDevice() {
        if (this.props.selectedDevice && this.props.selectedDevice.id.length) {
            const { name, id } = this.props.selectedDevice;
            const bulbStyle = {
                color: this.props.isConnected ? 'black' : Colors.dark40
            };
            return (
                <Row styleName="small">
                    <Icon name="md-bulb" size={ 35 } style={ bulbStyle }/>
                    <Text styleName='md-gutter-left'>{name || 'Unknown'}</Text>
                    <TouchableOpacity onPress={() => this.props.disconnectDevice({ deviceId: id })}>
                        <Icon name="ios-close" size={ 35 }/>
                    </TouchableOpacity>
                </Row>
            );
        }
        return (
            <TouchableOpacity onPress={() => this.props.navigator.showModal(onBoardNavObj)}>
                <Row styleName="small">
                    <Icon name="ios-add" size={ 35 }/>
                    <Text styleName='md-gutter-left'>Add Your Sneaker</Text>
                </Row>
            </TouchableOpacity>
        );
    }
}

export const navObj = {
    screen: 'v.ProfileScreen'
};

export default connect(
    (state) => {
        const selectedId = get(state, 'ble.selectedDevice.id');
        const isConnected = get(state, 'ble.selectedDevice.isConnected');
        const selectedDevice = get(state, `ble.devicesMap.${selectedId}`);
        return {
            selectedDevice,
            isConnected
        };
    }, {
        disconnectDevice: BleActions.disconnectDevice,
    }
)(ProfileScreen);
