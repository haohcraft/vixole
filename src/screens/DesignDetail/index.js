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


const DESCRIPTION = 'Store in a cool dry place. Use for formal, evening or casual occasions. ';
export default class DesignDetail extends Component {
    constructor(props) {
        super(props);
        const {
            index = 0
        } = props;
        this.state = {
            index
        };
    }
    static propTypes = {
        index: PropTypes.number.isRequired,
        collection: PropTypes.array.isRequired,
        navigator: PropTypes.object.isRequired,
        hasPreNext: PropTypes.bool
    };
    static navigatorStyle = {
        navBarHidden: true,
        screenBackgroundColor: 'transparent',
        modalPresentationStyle: 'overCurrentContext'
    };
    onPrevPress = () => {
        const { index } = this.state;
        this.setState({
            index: index - 1
        });
    }
    onNextPress = () => {
        const { index } = this.state;
        this.setState({
            index: index + 1
        });
    }
    render() {
        const { navigator, hasPreNext, collection = [] } = this.props;
        const { index } = this.state;
        const { name, url } = collection[index];
        return (
            <Screen style={ styleDesighDetail.screen } >
                <Nav
                    navigator={ navigator }
                    hasPreNext={ hasPreNext }
                    isPrevDisabled={ index === 0 }
                    isNextDisabled={ index === collection.length - 1 }
                    onPrevPress={ this.onPrevPress }
                    onNextPress={ this.onNextPress } />
                <View style={ styleDesighDetail.container } >
                    <Image
                        style={ styleDesighDetail.image }
                        source={ url } />
                    <View style={ styleDesighDetail.content } >
                            <View style={ styleDesighDetail.contentTitleContainer } >
                                <Text style={ styleDesighDetail.contentTitle }>{ name.toUpperCase() }</Text>
                            </View>
                            <Text>
                                { DESCRIPTION }
                            </Text>
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
