import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { get, values } from 'lodash';
import {
  View, Text
} from 'react-native-ui-lib';
import { ListView, RefreshControl } from 'react-native';

import ProgressBar from '../../components/ProgressBar';
import BleActions from '../../middlewares/ble/actions';
import styles from './style';

class ScanScreen extends Component {
    static propTypes = {
        isScanning: PropTypes.bool.isRequired,
        startScan: PropTypes.func.isRequired,
        stopScan: PropTypes.func.isRequired,
        devicesMap: PropTypes.object.isRequired
    }
    constructor(props) {
        super(props);
        this.state = {
            isRefreshing: false
        };
    }
    componentWillMount() {
        this.scanDevice();
    }
    componentWillUpdate() {
        if (this.state.isRefreshing) {
            this.setState({ isRefreshing: false });
        }
    }
    render() {
        const ds = new ListView.DataSource({ rowHasChanged: (row1, row2) => row1.id !== row2.id });
        const devices = values(this.props.devicesMap);
        const dataSource = ds.cloneWithRows(devices);
        return (
            this.props.isScanning ? <View style={styles.progressBar}><ProgressBar /></View> :
            <ListView
                style={styles.container}
                enableEmptySections
                dataSource={dataSource}
                renderRow={rowData => <View key={rowData.id}><Text>{rowData.name}</Text></View>}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.isRefreshing}
                        onRefresh={() => this.onRefresh()}
                        colors={['#EA0000']}
                        tintColor="white"
                        title="loading..."
                        titleColor="white"
                        progressBackgroundColor="white"
                    />
                }
            />
        );
    }
    onRefresh() {
        this.setState({ isRefreshing: true });
        this.scanDevice();
    }
    scanDevice() {
        const self = this;
        this.props.startScan();
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }
        this.timeoutId = setTimeout(() => {
            self.props.stopScan();
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
