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
    },
    headerLabel: {
        backgroundColor: '#0b7dda',
        padding: 10
    },
    headerLabelText: {
        color: '#ffffff',
        fontSize: 22,
        fontWeight: 'bold'
    },
    cardContainer: {
        backgroundColor: '#ffffff',
        padding: 10,
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.7,
        shadowRadius: 2,
        elevation: 1,
    }
});

var Color = {
    lightBlack: '#262626',
    lightWhite: '#e6e6e6',
    pureWhite: '#ffffff',
    white: '#cccccc',
    lightBlue: '#2196f3',
    blue: '#0b7dda',
    darkBlue: '#0a6fc2',
    red: '#ff3333',
    yellow: '#ffcc00',
    green: '#00cc66',
    darkGreen: '#009933'
}

var Theme = {Style, Color};

export default Theme;