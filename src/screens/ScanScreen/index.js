import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { get, values } from 'lodash';
import {
    Screen,
    ListView,
    TouchableOpacity,
    Divider,
    Text,
    Row,
    Icon
} from '@shoutem/ui';

import BleActions from '../../middlewares/ble/actions';

class ScanScreen extends Component {
    static propTypes = {
        isScanning: PropTypes.bool.isRequired,
        startScan: PropTypes.func.isRequired,
        stopScan: PropTypes.func.isRequired,
        devicesMap: PropTypes.object.isRequired
    }
    componentWillMount() {
        this.scanDevice();
    }
    render() {
        const devices = values(this.props.devicesMap);
        return (
            <Screen>
                <ListView
                    loading={ this.props.isScanning }
                    data={ devices }
                    renderRow={device => this.renderRow(device)}
                />
            </Screen>
        );
    }
    renderRow(device) {
        return (
            <TouchableOpacity>
                <Row styleName="small">
                    <Icon name="web" />
                    <Text>{device.name || 'Unknown'}</Text>
                    <Icon styleName="disclosure" name="right-arrow" />
                </Row>
                <Divider styleName="line" />
            </TouchableOpacity>
        );
    }
    scanDevice() {
        const self = this;
        this.props.startScan();
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }
        this.timeoutId = setTimeout(() => {
            if (self.props.isScanning) {
                self.props.stopScan();
            }
        }, 1e4);
    }
}

export const navObj = {
    screen: 'v.ScanScreen'
};

export default connect(
    state => ({
        isScanning: get(state, 'ble.isScanning'),
        devicesMap: get(state, 'ble.devicesMap')
    }),
    {
        startScan: BleActions.startScan,
        stopScan: BleActions.stopScan
    }
)(ScanScreen);
