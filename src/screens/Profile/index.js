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
    TouchableOpacity,
    Button,
    Image
} from '@shoutem/ui';
import Icon from 'react-native-vector-icons/Ionicons';

import Colors from '../../theme/colors';
import { navObj as onBoardNavObj } from '../Onboard';
import BleActions from '../../middlewares/ble/actions';
import authActions from '../../middlewares/auth/actions';
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
        isLogin: PropTypes.bool.isRequired,
        logout: PropTypes.func.isRequired,
        isConnected: PropTypes.bool.isRequired,
        selectedDevice: PropTypes.object,
        user: PropTypes.shape({
            name: PropTypes.string,
            pic: PropTypes.string
        }).isRequired
    };
    constructor(props) {
        super(props);
        this.onPressLogout = this._onPressLogout.bind(this);
        this.onPressReconnect = this._onPressReconnect.bind(this);
        this.onPressRemove = this._onPressRemove.bind(this);
    }
    componentWillMount() {
        this.props.checkState();
    }

    render() {
        return (
            <Screen>
                <View>
                    { this.renderUserInfo() }
                    <Divider styleName="section-header">
                        <Caption>VIXOLE Sneaker</Caption>
                    </Divider>
                        { this.renderDevice() }
                    <Divider styleName='line' />
                    {
                        this.props.isLogin && (
                            <Button onPress={this.onPressLogout} >
                                <Text>Log out</Text>
                            </Button>
                        )
                    }
                </View>
            </Screen>
        );
    }

    renderUserInfo() {
        const { user } = this.props;
        const styles = {
            container: {
                alignItems: 'center',
                justifyContent: 'center'
            },
            avatarImage: {
                width: 36,
                height: 36,
                borderRadius: 18,
            }
        };
        if (user.name && user.pic) {
            return (
                <View styleName='vertical md-gutter-bottom md-gutter-top' style={ styles.container }>
                    <Image styleName='h-center' style={ styles.avatarImage } source={{ uri: user.pic }} />
                    <Text styleName='sm-gutter-top'>{ user.name }</Text>
                </View>
            );
        }

        return null;
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
                            <TouchableOpacity onPress={this.onPressReconnect({ selectedDeviceId: id })}>
                                <Icon name="ios-refresh" size={ 35 }/>
                            </TouchableOpacity>
                        )
                    }
                    <TouchableOpacity onPress={this.onPressRemove({ deviceId: id })}>
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
    _onPressReconnect({ selectedDeviceId }) {
        this.props.reConnectDevice({ selectedDeviceId });
    }
    _onPressRemove({ deviceId }) {
        askForRemoveDevice(() => {
            this.props.removeDevice({ deviceId });
        });
    }

    _onPressLogout() {
        this.props.logout();
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
        const isLogin = get(state, 'auth.isAuthenticated');
        const pic = get(state, 'auth.fb.picture.data.url');
        const name = get(state, 'auth.fb.name');
        return {
            selectedDevice,
            isConnected,
            isLogin,
            user: {
                name,
                pic
            }
        };
    }, {
        removeDevice: BleActions.removeDevice,
        reConnectDevice: BleActions.reConnectDevice,
        checkState: BleActions.checkState,
        logout: authActions.logout
    }
)(ProfileScreen);
