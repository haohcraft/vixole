import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    FlatList
} from 'react-native';
import DesignItem from '../DesignItem';
import DesignSection from '../DesignSection';
import { widthPercentage } from '../../lib/utils';
import styles from './style';

const extractKey = ({ uuid }) => uuid;

export default class DesignList extends Component {
    renderItem = numColumns => ({ item, index }) => {
        const { onItemPress, toggleSave, saved } = this.props;
        const designWidth = widthPercentage(100 / numColumns) - 15;
        return <DesignItem
            id={ item.uuid }
            name={ item.name }
            source={ item.url }
            itemWidth={ designWidth }
            isSaved={ saved[item.uuid] }
            onItemPress={ onItemPress({ index }) }
            toggleSave={ toggleSave({ uuid: item.uuid })}
            designWidth={ designWidth } />;
    };

    render() {
        const { items, numColumns = 3 } = this.props;
        return (
            <FlatList
                data={ items }
                columnWrapperStyle={ styles.listContainer }
                numColumns={ numColumns }
                renderItem={ this.renderItem(numColumns) }
                keyExtractor={ extractKey } />
        );
    }
}

DesignList.propTypes = {
    items: DesignSection.propTypes.collection,
    onItemPress: PropTypes.func.isRequired,
    toggleSave: PropTypes.func.isRequired,
    saved: PropTypes.object.isRequired,
    numColumns: PropTypes.number
};
