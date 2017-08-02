import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Screen from '../../components/Screen';
import DesignList from '../../components/DesignList';
import Nav from './Nav';

export default class DiscoverAll extends Component {
    static propTypes = {
        collectionName: PropTypes.string,
        navigator: PropTypes.object,
        saved: PropTypes.object,
        items: PropTypes.array,
        toggleSave: PropTypes.func
    };
    static navigatorStyle = {
        navBarHidden: true
    };
    onItemPress = ({ index }) => () => {
        this.props.navigator.showModal({
            screen: 'v.DesignDetailScreen',
            passProps: {
                collection: this.props.items,
                index,
                hasPreNext: true
            }
        });
    }
    onToggleSave = ({ uuid }) => () => {
        this.props.toggleSave({ uuid });
    }
    render() {
        const { items, collectionName, navigator, saved } = this.props;
        return (
            <Screen>
                <Nav name={ collectionName } navigator={ navigator } />
                <DesignList
                    items={ items }
                    saved={ saved }
                    onItemPress={ this.onItemPress }
                    toggleSave={ this.onToggleSave } />
            </Screen>
        );
    }
}
