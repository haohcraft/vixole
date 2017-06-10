import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { get } from 'lodash';
import {
    Screen,
    ListView,
    View,
    Divider,
    GridRow,
} from '@shoutem/ui';
import Item, { ItemActions } from '../../components/Item';

class DiscoverScreen extends Component {
    static propTypes = {
        navigator: PropTypes.object,
        collection: PropTypes.array.isRequired,
        likes: PropTypes.object.isRequired,
        like: PropTypes.func.isRequired,
        revokeLike: PropTypes.func.isRequired
    };
    constructor(props) {
        super(props);
        this.renderRow = this._renderRow.bind(this);
    }
    render() {
        // Group the restaurants into rows with 2 columns, except for the
        // first article. The first article is treated as a featured article
        let isFirstArticle = true;
        const groupedData = GridRow.groupByRows(this.props.collection, 2, () => {
            if (isFirstArticle) {
                isFirstArticle = false;
                return 2;
            }

            return 1;
        });
        return (
            <Screen>
                <ListView
                    data={groupedData}
                    renderRow={this.renderRow}
                />
            </Screen>
        );
    }
    _renderRow(rowData, sectionId, index) {
        const { likes, like, revokeLike } = this.props;
        // rowData contains grouped data for one row,
        // so we need to remap it into cells and pass to GridRow
        if (index === '0') {
            return (
                <View key={index}>
                    <Item
                        id={ rowData[0].uuid }
                        source={ rowData[0].url }
                        styleName='large'
                        isLike={ !!likes[rowData[0].uuid] }
                        onPressLike={like}
                        onPressRevokeLike={revokeLike} />
                    <Divider styleName="line" />
                </View>
            );
        }
        const cellViews = rowData.map((data, id) => {
            return (
                <View key={id} styleName="flexible">
                    <Item
                        id={ data.uuid }
                        source={ data.url }
                        styleName='medium-wide'
                        isLike={ !!likes[data.uuid] }
                        onPressLike={like}
                        onPressRevokeLike={revokeLike} />
                </View>
            );
        });
        return (
            <GridRow columns={2}>
                {cellViews}
            </GridRow>
        );
    }
}

export const navObj = {
    screen: 'v.DiscoverScreen'
};

export default connect(
    state => ({
        collection: get(state, 'collection.data', []),
        likes: get(state, 'likes')
    }),
    {
        like: ItemActions.like,
        revokeLike: ItemActions.revokeLike
    }
)(DiscoverScreen);
