import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { get } from 'lodash';
import classnames from 'classnames';
import {
    Screen,
    View,
    Text,
    Button
} from '@shoutem/ui';

import Colors from '../theme/colors';
import { navObj as scanScreenNavObj } from './ScanScreen';
import BleActions from '../middlewares/ble/actions';
import { BleStateMap } from '../middlewares/ble/utils';

const styles = {
    text: {
        color: Colors.white
    }
};
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
        const buttonStyle = classnames('lg-gutter-top', {
            muted: !isReady
        });
        return (
            <Screen>
                <View styleName='fill-parent vertical space-around xl-gutter-left xl-gutter-right'>
                    <Text styleName='medium-wide md-gutter-top'>
                        If you have VIXOLE sneaker, you can pair it with your device here
                    </Text>
                    <Button onPress={() => this.onPairPress()} styleName={ buttonStyle }>
                        <Text style={ styles.text }>START PAIR</Text>
                    </Button>
                </View>
            </Screen>
        );
    }
    onPairPress() {
        if (this.props.isReady) {
            this.props.navigator.push(scanScreenNavObj);
        }
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
