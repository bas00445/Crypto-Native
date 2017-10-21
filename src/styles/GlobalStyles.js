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
        width: 24,
        height: 24
    },
    headerLabel: {
        backgroundColor: '#25282f',
        padding: 10,
    },
    headerLabelText: {
        color: '#ffffff',
        fontSize: 22,
        fontWeight: 'bold'
    },
    cardContainer: {
        padding: 10, 
        borderRadius: 4,
        backgroundColor: '#3c4552'
    }
});

var Color = {
    lightBlack: '#262626',
    lightWhite: '#e6e6e6',
    pureWhite: '#ffffff',
    white: '#bdbdbd',
    whiteGrey3: '#ccc',
    whiteGrey2: '#424242',
    whiteGrey1: '#2d3139',
    grey: '#25282f',
    darkGrey: '#16181d',
    lightBlue: '#2196f3',
    blue: '#0b7dda',
    darkBlue: '#0a6fc2',
    red: '#ff3333',
    yellow: '#ffcc00',
    green: '#00cc66',
    darkGreen: '#009933',
    pink: '#e91e63',
    whiteGreyBlue: '#3c4552',
    greyBlue: '#2d3139'
}

var Theme = {Style, Color};

export default Theme;