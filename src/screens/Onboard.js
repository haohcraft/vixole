import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { get } from 'lodash';
import {
    Screen,
    View,
    Text,
    Button
} from '@shoutem/ui';
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
            <Screen>
                <View styleName='fill-parent vertical space-around xl-gutter-left xl-gutter-right'>
                    <Text styleName='medium-wide'>
                        If you have VIXOLE sneaker, you can pair it with your device here
                    </Text>
                    <Button disabled={ !isReady } onPress={() => this.onPairPress()} styleName='lg-gutter-top'>
                        <Text>START PAIR</Text>
                    </Button>
                </View>
            </Screen>
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
