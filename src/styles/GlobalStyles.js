import {StyleSheet} from 'react-native';

var Style = StyleSheet.create({
    container: {
        flex: 1
    },
    rowContent: {
        flexDirection: 'column'
    },
    colContent: {
        flexDirection: 'row'
    },
    centerY: {
        justifyContent: 'center',
    },
    centerX: {
        alignItems: 'center'
    },
    icon: {
        width: 24,
        height: 24
    },
    drawerIcon: {
        width: 30,
        height: 30
    }
});

var Color = {
    lightBlack: '#262626',
    lightWhite: '#e6e6e6',
    white: '#cccccc',
    lightBlue: '#1a75ff',
    bule: '#0066ff',
    red: '#ff3333'
}

var Theme = {Style, Color};

export default Theme;