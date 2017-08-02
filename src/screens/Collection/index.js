import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { connect } from 'react-redux';
import Screen from '../../components/Screen';
import DesignList from '../../components/DesignList';
import { DesignItemActions } from '../../components/DesignItem';
import StaticNav from '../../components/StaticNav';
import EmptyState from './EmptyState';

class Collection extends Component {
    static propTypes = {
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
    onAddPress = () => {
        this.props.navigator.switchToTab({
            tabIndex: 0
        });
    }
    onToggleSave = ({ uuid }) => () => {
        this.props.toggleSave({ uuid });
    }
    render() {
        const { items, saved } = this.props;
        return (
            <Screen>
                <StaticNav title='collection' />
                {
                    items.length ? (
                        <DesignList
                            items={ items }
                            saved= { saved }
                            onItemPress={ this.onItemPress }
                            numColumns={ 2 }
                            toggleSave={ this.onToggleSave } />
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
        items: get(state, 'collection.data', []),
        saved: get(state, 'saved', {}),
    }), {
        toggleSave: DesignItemActions.toggleSave
    }
)(Collection);
