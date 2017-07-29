import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Text,
    View,
    Image
} from 'react-native';

import Screen from '../../components/Screen';
import Button from '../../components/Button';
import Nav from './Nav';
import { styleDesighDetail, styleButton } from './style';

const imageSource = require('../../assets/images/9_thumber.jpg');

export default class DesignDetail extends Component {
    static propTypes = {
        name: PropTypes.string,
        description: PropTypes.string,
        navigator: PropTypes.object,
    };
    static navigatorStyle = {
        navBarHidden: true,
        screenBackgroundColor: 'transparent',
        modalPresentationStyle: 'overCurrentContext',
    };
    render() {
        const { navigator } = this.props;
        return (
            <Screen style={ styleDesighDetail.screen } >
                <Nav navigator={ navigator } />
                <View style={ styleDesighDetail.container } >
                    <Image
                        style={ styleDesighDetail.image }
                        source={ imageSource } />
                    <View style={ styleDesighDetail.content } >
                        <View style={ styleDesighDetail.contentLeft }>
                            <View style={ styleDesighDetail.contentLeftTitleContainer } >
                                <Text style={ styleDesighDetail.contentLeftTitle }>Good</Text>
                            </View>
                        </View>
                        <View style={ styleDesighDetail.contentRight }>
                            <Text>
                                {
                                    `Store in a cool dry place. Use for formal, evening or casual occasions. 
                                    `
                                }
                            </Text>
                        </View>
                    </View>
                    <View style={ styleDesighDetail.buttons } >
                        <Button label='View' styles={ styleButton } />
                        <Button label='Save' styles={ styleButton } />
                    </View>
                </View>
            </Screen>
        );
    }
}
