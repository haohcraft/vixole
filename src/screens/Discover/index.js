import React, { Component } from 'react';
import {
    Screen,
    ListView,
    TouchableOpacity,
    Image,
    Divider,
    GridRow,
    Card
} from '@shoutem/ui';

/* eslint-disable */
const IMGS = [
    { image: require('../../assets/images/1_bird.jpg') },
    { image: require('../../assets/images/2_circle.jpg') },
    { image: require('../../assets/images/3_diamond.jpg') },
    { image: require('../../assets/images/4_face.jpg') },
    { image: require('../../assets/images/5_galaxy.jpg') },
    { image: require('../../assets/images/6_grid.jpg') },
    { image: require('../../assets/images/7_wave.jpg') },
    { image: require('../../assets/images/8_snow.jpg') },
    { image: require('../../assets/images/9_thumber.jpg') },
    { image: require('../../assets/images/10_water.jpg') }
];
/* eslint-enable */

export default class DiscoverScreen extends Component {
    renderRow(rowData, sectionId, index) {
        // rowData contains grouped data for one row,
        // so we need to remap it into cells and pass to GridRow
        if (index === '0') {
            return (
                <TouchableOpacity key={index}>
                    <Image
                        styleName="large"
                        source={ rowData[0].image }
                    />
                    <Divider styleName="line" />
                </TouchableOpacity>
            );
        }
        const cellViews = rowData.map((data, id) => {
            return (
                <TouchableOpacity key={id} styleName="flexible">
                    <Card styleName="flexible">
                        <Image
                            styleName="medium-wide"
                            source={ data.image }
                        />
                    </Card>
                </TouchableOpacity>
            );
        });
        return (
            <GridRow columns={2}>
                {cellViews}
            </GridRow>
        );
    }

    render() {
         // Group the restaurants into rows with 2 columns, except for the
        // first article. The first article is treated as a featured article
        let isFirstArticle = true;
        const groupedData = GridRow.groupByRows(IMGS, 2, () => {
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
}

export const navObj = {
    screen: 'v.DiscoverScreen'
};
