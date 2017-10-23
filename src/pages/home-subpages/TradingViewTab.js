import React, { Component } from 'react';
import Theme from '../../styles/GlobalStyles';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Switch,
  ScrollView,
  TextInput,
  AsyncStorage,
  WebView
} from 'react-native';

var Style = Theme.Style;
var Color = Theme.Color;

export default class TradingViewTab extends Component {
  static navigationOptions = {
    title: 'Trading View',
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../../assets/icons/line-chart.png')}
        style={[Style.icon, {tintColor: tintColor}]}
      />
    ),
  };

  constructor(props) {
    super(props);
  }

  
  render() {
    const htmlCode = ` 
    <!-- TradingView Widget BEGIN -->
    <script type="text/javascript" src="https://s3.tradingview.com/tv.js"></script>
    <script type="text/javascript">
    new TradingView.widget({
      "autosize": true,
      "symbol": "BITTREX:BTCUSDT",
      "interval": "D",
      "timezone": "Asia/Bangkok",
      "theme": "Light",
      "style": "1",
      "locale": "en",
      "toolbar_bg": "#f1f3f6",
      "enable_publishing": false,
      "allow_symbol_change": true,
      "hideideas": true
    });
    </script>
    <!-- TradingView Widget END -->
  `;

    return (
      <View style={{flex: 1, backgroundColor: Color.whiteGrey1}}>
        <WebView source={{html: htmlCode}}/>
      </View>
    );
  }
}

var localStyles = StyleSheet.create({

});