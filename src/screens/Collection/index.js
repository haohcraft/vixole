import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { connect } from 'react-redux';
import Screen from '../../components/Screen';
import DesignList from '../../components/DesignList';
import StaticNav from '../../components/StaticNav';
import EmptyState from './EmptyState';

class Collection extends Component {
    static propTypes = {
        navigator: PropTypes.object,
        items: PropTypes.array
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
    onAddPress = () => {
        this.props.navigator.switchToTab({
            tabIndex: 0
        });
    }
    render() {
        const { items } = this.props;
        return (
            <Screen>
                <StaticNav title='collection' />
                {
                    items.length ? (
                        <DesignList items={ items } onItemPress={ this.onItemPress } numColumns={ 2 } />
                    ) : (
                        <EmptyState onPress={ this.onAddPress } />
                    )
                }
            </Screen>
        );
    }
}
export default connect(
    state => ({
        items: get(state, 'collection.data', [])
    })
)(Collection);
