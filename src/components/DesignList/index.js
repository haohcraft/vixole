import React from 'react';
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
const renderItem = ({ item }) => (
    <DesignItem
        id={ item.uuid }
        name={ item.name }
        source={ item.url }
        itemWidth={ itemWidth }
        designWidth={ designWidth } />
);
renderItem.propTypes = {
    ...DesignItem.propTypes
};
const DesignList = ({ items }) => {
    return (
        <FlatList
            data={ items }
            columnWrapperStyle={ styles.listContainer }
            numColumns={ 2 }
            renderItem={ renderItem }
            keyExtractor={ extractKey } />
    );
};

DesignList.propTypes = {
    items: DesignSection.propTypes.collection
};

export default DesignList;
