import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FlatList } from 'react-native';
import { get } from 'lodash';
import Nav from './Nav';
import Screen from '../../components/Screen';
import DesignSection from '../../components/DesignSection';

const extractKey = ({ id }) => id;
const NUM_PREVIEW = 7;

class DiscoverScreen extends Component {
    static propTypes = {
        navigator: PropTypes.object,
        collection: PropTypes.array.isRequired
    };
    static navigatorStyle = {
        navBarHidden: true
    };
    onSeeAllPress = ({ label }) => () => {
        this.props.navigator.push({
            screen: 'v.DiscoverAllScreen',
            passProps: {
                collectionName: label,
                items: this.props.collection
            }
        });
    }
    onItemPress = ({ index }) => () => {
        this.props.navigator.showModal({
            screen: 'v.DesignDetailScreen',
            passProps: {
                collection: this.props.collection,
                index
            }
        });
    }
    renderItem = ({ item }) => {
        const { navigator } = this.props;
        return <DesignSection
                navigator={ navigator }
                label={ item.label }
                collection={ item.data }
                onItemPress={ this.onItemPress }
                onSeeAllPress={ this.onSeeAllPress({ label: item.label }) } />;
    }
    render() {
        const rows = [
            { id: 0, data: this.props.collection, label: 'VISUAL JOCKEY' },
            { id: 1, data: this.props.collection, label: 'DANCING' },
            { id: 2, data: this.props.collection, label: 'MOTION' }
        ];
        return (
            <Screen>
                <Nav />
                <FlatList
                    data={ rows }
                    renderItem={ this.renderItem }
                    keyExtractor={ extractKey } />
            </Screen>
        );
    }
}

export const navObj = {
    screen: 'v.DiscoverScreen'
};

export default connect(
    state => ({
        collection: get(state, 'collection.data', []).slice(0, NUM_PREVIEW)
    })
)(DiscoverScreen);
