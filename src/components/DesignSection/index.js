import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
    View,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import DesignItem, { baseItemWidth, More } from '../DesignItem';
import Heading from '../Heading';
import styles, { sliderWidth } from './style';

export default class DesignSection extends PureComponent {
    getSlides = (entries) => {
        const { onItemPress, toggleSave, saved } = this.props;
        const groups = [];
        let group = [];
        entries.forEach((entry, index) => {
            group.push(
                <DesignItem
                    key={ index }
                    id={ entry.uuid }
                    name={ entry.name }
                    isSaved={ saved[entry.uuid] }
                    onItemPress={ onItemPress({ index }) }
                    toggleSave={ toggleSave({ uuid: entry.uuid }) }
                    source={ entry.url } />
            );
            if (group.length === 2) {
                groups.push(
                    <View key={ `groups-${index}` } style={ styles.slideGroup } >
                        { group }
                    </View>
                );
                group = [];
            }
        });
        groups.push(
            <View key='groups-more' style={ styles.slideGroup } >
                <More number={ this.props.collection.length } onPress={ this.props.onSeeAllPress } />
            </View>
        );
        return groups;
    }
    render() {
        const { label, collection, onSeeAllPress } = this.props;
        return (
            <View style={ styles.container }>
                <Heading label={ label } onPress={ onSeeAllPress }/>
                <Carousel
                    sliderWidth={ sliderWidth }
                    itemWidth={ baseItemWidth }
                    firstItem={ 0 }
                    inactiveSlideScale={ 1 }
                    inactiveSlideOpacity={ 1 }
                    enableMomentum={ false }
                    containerCustomStyle={ styles.slider }
                    contentContainerCustomStyle={ styles.sliderContainer }
                    showsHorizontalScrollIndicator={ false }
                    snapOnAndroid={ true }
                    removeClippedSubviews={ false }
                    carouselHorizontalPadding={ 0 }
                >
                    { this.getSlides(collection) }
                </Carousel>
            </View>
        );
    }
}

DesignSection.propTypes = {
    navigator: PropTypes.object.isRequired,
    label: PropTypes.string.isRequired,
    collection: PropTypes.arrayOf(PropTypes.shape({
        uuid: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        url: PropTypes.any
    })).isRequired,
    saved: PropTypes.object.isRequired,
    onSeeAllPress: PropTypes.func.isRequired,
    onItemPress: PropTypes.func.isRequired,
    toggleSave: PropTypes.func.isRequired
};
