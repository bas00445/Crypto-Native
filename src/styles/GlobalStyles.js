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
    },
    datePickerContainer: {
        padding: 10, 
        borderRadius: 4,
        marginBottom: 5, 
        backgroundColor: '#424242',
        borderTopLeftRadius: 4,
        borderBottomLeftRadius: 4,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0
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
    blue: '#0b7dda',
    red: '#ff3333',
    yellow: '#ffcc00',
    green: '#00cc66',
    orange: '#ff751a',
    pink: '#e91e63',
    whiteGreyBlue: '#3c4552',
    greyBlue: '#2d3139',
    signalIcon: '#434956'
}

var Theme = {Style, Color};

export default Theme;