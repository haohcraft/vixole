import React, { Component } from 'react';
import {
  View, Text, Button,
  BorderRadiuses
} from 'react-native-ui-lib';

export default class Onboard extends Component {

    render() {
        return (
            <View flex paddingH-55 paddingT-120>
                <Text dark10 text16>If you have VIXOLE sneaker, you can pair it with your device here</Text>
                <View marginT-100 bottom>
                    <Button
                        text70
                        white
                        background-dark
                        borderRadius={ BorderRadiuses.br10 }
                        label="START PAIRING"/>
                </View>
            </View>
        );
    }
}
