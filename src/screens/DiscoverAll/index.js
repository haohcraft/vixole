import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Screen from '../../components/Screen';
import DesignList from '../../components/DesignList';
import Nav from './Nav';

export default class DiscoverAll extends Component {
    static propTypes = {
        collectionName: PropTypes.string,
        navigator: PropTypes.object,
        items: PropTypes.array
    };
    static navigatorStyle = {
        navBarHidden: true
    };
    render() {
        const { items, collectionName, navigator } = this.props;
        return (
            <Screen>
                <Nav name={ collectionName } navigator={ navigator } />
                <DesignList items={ items } />
            </Screen>
        );
    }
}
