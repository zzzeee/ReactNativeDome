import React, { Component } from 'react';
import {
	StyleSheet,
	Text, 
	View, 
} from 'react-native';

import ScrollableTabView, {DefaultTabBar, } from 'react-native-scrollable-tab-view';
import Icon from 'react-native-vector-icons/Ionicons';
import WeixinTabBar from './WeixinTabBar';

export default class TabView extends Component {
	constructor(props) {
	  	super(props);
	  	this.state = {
	      	tabNames: ['微信', '通讯录', '发现', '我'],
	      	tabIconNames: ['ios-chatbubbles-outline', 'ios-ionitron-outline', 'ios-compass-outline', 'ios-person-outline'],
	      	tabSelectIconNames: ['ios-chatbubbles', 'ios-ionitron', 'ios-compass', 'ios-person'],
	  	};
	}

  	render() {
    	return (
    		<ScrollableTabView
				renderTabBar={() => <WeixinTabBar tabNames={this.state.tabNames} tabIconNames={this.state.tabIconNames} tabSelectIconNames={this.state.tabSelectIconNames} />}
				//renderTabBar={() => <DefaultTabBar />}
				//style={styles.menu}
				// 默认打开第几个（0为第一个）
				initialPage={0}
				//"top", "bottom", "overlayTop", "overlayBottom"
				tabBarPosition='overlayBottom'
				// 选中的下划线颜色
				tabBarUnderlineStyle={{
					//backgroundColor: '#FF0000',
					height: 0,
				}}
				// 选中的背景颜色
				tabBarBackgroundColor='rgba(240, 240, 240, 0.8)'
				// 选中的文字颜色
				tabBarActiveTextColor='#FF0000'
				// 未选中的文字颜色
				tabBarInactiveTextColor='#333'
				//tabBarTextStyle={{fontSize: 18}}
			>
				<View style={styles.flex} tabLabel='Tab1'>
					<Icon name="ios-chatbubbles-outline" size={20} color="#888" />
					<View><Text>第一页</Text></View>
				</View>
				<View style={styles.flex} tabLabel='Tab2'>
					<Icon name="ios-ionitron-outline" size={20} color="#888" />
					<Text>第二页</Text>
				</View>
				<View style={styles.flex} tabLabel='Tab3'>
					<Icon name="ios-compass-outline" size={20} color="#888" />
					<Text>第三页</Text>
				</View>
				<View style={styles.flex} tabLabel='Tab4'>
					<Icon name="ios-person-outline" size={20} color="#888" />
					<Text>第四页</Text>
				</View>
		    </ScrollableTabView>
    	);
  	}
}

const styles = StyleSheet.create({
  	flex : {
	    flex : 1,
	    justifyContent: 'center',
		alignItems: 'center',
	},
	menu : {
	  	borderBottomColor : 'green',
	  	borderBottomWidth : 1,
	}
});