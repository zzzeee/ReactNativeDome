import React, { Component } from 'react';
import {
	AppRegistry,
	StyleSheet,
	Text, 
	View,
	WebView,
	Dimensions,
} from 'react-native';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

export default class Web_View extends Component {
	//构造
    constructor(props)
    {
		super(props);
		this.state = { 
			url: 'http://vpn.jingtaomart.com/chinamap/index.html'
		};
    }

  render() {
    return (
    	<View style={styles.flex}>
    		<WebView
    			automaticallyAdjustContentInsets={false}
    			source={{uri: this.state.url}}
    			style={{width: width, height : height}}
    			startInLoadingState ={true}
    			/*
					返回数据参数及格式如下：
					加载前和加载后 参数loading发生变化。
					---------------------------------------------------------------------
						{
							canGoBack: false
							canGoForward: false
							loading: true
							target: 57
							title: ""
							url: "http://vpn.jingtaomart.com/chinamap/index.html"
						}
					--------------------------------------------------------------------
						{
							canGoBack: false
							canGoForward: false
							loading: false
							target: 57
							title: "境淘土特产全国网"
							url: "http://vpn.jingtaomart.com/chinamap/index.html"
						}
					---------------------------------------------------------------------
    			*/
    			onNavigationStateChange={(navState) => {
    				console.log(navState);
    			}}

    			onMessage={(e)=>{
    				console.log(JSON.parse(e.nativeEvent.data));
    			}}
    		>
    		</WebView>
    	</View>
    );
  }
}

const styles = StyleSheet.create({
  flex : {
    flex : 1,
  },
});