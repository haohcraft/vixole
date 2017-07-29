import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    FlatList
} from 'react-native';
import DesignItem from '../DesignItem';
import DesignSection from '../DesignSection';
import { widthPercentage } from '../../lib/utils';
import styles from './style';

const designWidth = widthPercentage(45);
const itemWidth = designWidth;
const extractKey = ({ uuid }) => uuid;

export default class DesignList extends Component {
    renderItem = ({ item }) => {
        const { navigator } = this.props;
        const onItemPress = () => {
            navigator.showModal({
                screen: 'v.DesignDetailScreen'
            });
        };
        return <DesignItem
            id={ item.uuid }
            name={ item.name }
            source={ item.url }
            itemWidth={ itemWidth }
            onItemPress={ onItemPress }
            designWidth={ designWidth } />;
    };

    render() {
        const { items } = this.props;
        return (
            <FlatList
                data={ items }
                columnWrapperStyle={ styles.listContainer }
                numColumns={ 2 }
                renderItem={ this.renderItem }
                keyExtractor={ extractKey } />
        );
    }
}

DesignList.propTypes = {
    navigator: PropTypes.object.isRequired,
    items: DesignSection.propTypes.collection
};
