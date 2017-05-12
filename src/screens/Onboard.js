import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { get } from 'lodash';
import {
  View, Text, Button,
  BorderRadiuses
} from 'react-native-ui-lib';
import { navObj as scanScreenNavObj } from './ScanScreen';
import BleActions from '../middlewares/ble/actions';
import { BleStateMap } from '../middlewares/ble/utils';

class Onboard extends Component {
    static propTypes = {
        navigator: PropTypes.object,
        checkState: PropTypes.func.isRequired,
        isReady: PropTypes.bool.isRequired
    };
    static navigatorStyle = {
        navBarHidden: true
    };
    componentWillMount() {
        this.props.checkState();
    }
    render() {
        const { isReady } = this.props;
        return (
            <View flex paddingH-55 paddingT-120>
                <Text dark10 text16>If you have VIXOLE sneaker, you can pair it with your device here</Text>
                <View marginT-100 bottom>
                    <Button
                        disabled={ !isReady }
                        text70
                        white
                        background-dark
                        borderRadius={ BorderRadiuses.br10 }
                        onPress={() => this.onPairPress()}
                        label="START PAIRING"/>
                </View>
            </View>
        );
    }
    onPairPress() {
        this.props.navigator.push(scanScreenNavObj);
    }
}

export const navObj = {
    screen: 'v.Onboard'
};

export default connect(
    state => ({
        isReady: get(state, 'ble.bleState') === BleStateMap.PoweredOn
    }),
    {
        checkState: BleActions.checkState
    }
)(Onboard);
