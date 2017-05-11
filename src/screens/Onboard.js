import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { get } from 'lodash';
import {
  View, Text, Button,
  BorderRadiuses
} from 'react-native-ui-lib';
import BleActions from '../middlewares/ble/actions';

class Onboard extends Component {
    static propTypes = {
        checkState: PropTypes.func.isRequired
    }
    componentWillMount() {
        this.props.checkState();
    }
    render() {
        return (
            <View flex paddingH-55 paddingT-120>
                <Text dark10 text16>If you have VIXOLE sneaker, you can pair it with your device here</Text>
                <View marginT-100 bottom>
                    <Button
                        text70
                        white
                        background-dark
                        borderRadius={ BorderRadiuses.br10 }
                        label="START PAIRING"/>
                </View>
            </View>
        );
    }
}

export default connect(
    state => ({
        bleState: get(state, 'ble.bleState')
    }),
    {
        checkState: BleActions.checkState
    }
)(Onboard);
