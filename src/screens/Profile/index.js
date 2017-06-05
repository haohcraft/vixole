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
import { askForRemoveDevice } from '../../middlewares/ble/utils';

/* eslint-disable */
const image = require('../../assets/images/1_bird.jpg');
/* eslint-enable */

class ProfileScreen extends Component {
    static propTypes = {
        navigator: PropTypes.object.isRequired,
        removeDevice: PropTypes.func.isRequired,
        checkState: PropTypes.func.isRequired,
        reConnectDevice: PropTypes.func.isRequired,
        isConnected: PropTypes.bool.isRequired,
        selectedDevice: PropTypes.object
    };
    componentWillMount() {
        this.props.checkState();
    }

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

    renderUserInfo() {
        //
    }

    renderDevice() {
        if (this.props.selectedDevice && this.props.selectedDevice.id.length) {
            const { name, id } = this.props.selectedDevice;
            const bulbStyle = {
                color: this.props.isConnected ? 'black' : Colors.dark70
            };
            return (
                <Row styleName="small">
                    <Icon name="md-bulb" size={ 35 } style={ bulbStyle }/>
                    <Text styleName='md-gutter-left'>{name || 'Unknown'}</Text>
                    {
                        !this.props.isConnected && (
                            <TouchableOpacity onPress={() => this.onPressReconnect({ selectedDeviceId: id })}>
                                <Icon name="ios-refresh" size={ 35 }/>
                            </TouchableOpacity>
                        )
                    }
                    <TouchableOpacity onPress={() => this.onPressRemove({ deviceId: id })}>
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
    onPressReconnect({ selectedDeviceId }) {
        this.props.reConnectDevice({ selectedDeviceId });
    }
    onPressRemove({ deviceId }) {
        askForRemoveDevice(() => {
            this.props.removeDevice({ deviceId });
        });
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
        removeDevice: BleActions.removeDevice,
        reConnectDevice: BleActions.reConnectDevice,
        checkState: BleActions.checkState
    }
)(ProfileScreen);
