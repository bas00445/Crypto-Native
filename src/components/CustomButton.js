import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight
} from 'react-native';

export default class CustomButton extends Component {
    
    render() {
        var text = this.props.text == null ? '' : this.props.text;
        var textColor = this.props.textColor == null ? '#000000' : this.props.textColor;
        var textSize = this.props.textSize == null ? 22 : this.props.textSize;
        var bgColor = this.props.bgColor == null ? '#1a75ff' : this.props.bgColor;
        var localStyles = StyleSheet.create({
            inputButton: {
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: bgColor
            },
            inputButtonText: {
                fontSize: textSize,
                color: textColor,
            }
        });
        
        return (
            <TouchableHighlight style={localStyles.inputButton} onPress={this.props.onPress} underlayColor="#193441">
                <Text style={localStyles.inputButtonText}>{text}</Text>
            </TouchableHighlight>   
        );
    }
}

