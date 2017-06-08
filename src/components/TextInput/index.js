import React, { Component } from 'react';
import {
    View,
    TextInput as UITextInput,
    TouchableOpacity
} from '@shoutem/ui';
import Icon from 'react-native-vector-icons/Ionicons';

const styles = {
    icon: {
        position: 'absolute',
        top: 15,
        right: 15
    }
};

export default class TextInput extends Component {
    constructor(props) {
        super(props);
        this.onInputFocus = this._onInputFocus.bind(this);
        this.onInputBlur = this._onInputBlur.bind(this);
        this.onCleanPress = this._onCleanPress.bind(this);
        this.state = {
            focused: false,
            text: ''
        };
    }
    render() {
        return (
            <View styleName='sm-gutter-top'>
                <View>
                    <UITextInput {...this.props}
                        onFocus={ this.onInputFocus }
                        onBlur={ this.onInputBlur }
                        value={ this.state.text }
                        onChangeText={text => this.setState({ text })} />
                    {
                        this.state.focused && !!this.state.text.length &&
                        <TouchableOpacity onPress={ this.onCleanPress } style={ styles.icon }>
                            <Icon name='ios-close' size={ 30 }/>
                        </TouchableOpacity>
                    }
                </View>
            </View>
        );
    }
    _onInputFocus() {
        this.setState({
            focused: true
        });
    }
    _onInputBlur() {
        this.setState({
            focused: false
        });
    }
    _onCleanPress() {
        this.setState({ text: '' });
    }
}

