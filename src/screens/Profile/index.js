import React, { Component } from 'react';
import PropTypes from 'prop-types';
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

import { navObj as onBoardNavObj } from '../Onboard';

/* eslint-disable */
const image = require('../../assets/images/1_bird.jpg');
/* eslint-enable */

export default class ProfileScreen extends Component {
    static propTypes = {
        navigator: PropTypes.object.isRequired
    };

    render() {
        return (
            <Screen>
                <View>
                    <Divider styleName="section-header">
                        <Caption>VIXOLE Sneaker</Caption>
                    </Divider>
                    <TouchableOpacity onPress={() => this.props.navigator.showModal(onBoardNavObj)}>
                        <Row styleName="small">
                            <Icon name="ios-add" />
                            <Text styleName='sm-gutter-left'>Add Your Sneaker</Text>
                        </Row>
                    </TouchableOpacity>
                    <Divider styleName='line' />
                </View>
            </Screen>
        );
    }
}

export const navObj = {
    screen: 'v.ProfileScreen'
};
