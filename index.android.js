import React, { Component } from 'react';
import { 
	AppRegistry, 
	Navigator, 
	StyleSheet,
	Text, 
	View, 
	TouchableHighlight 
} from 'react-native';

import Button from './Button';
import TopTitle from './TopTitle';
import StateChange from './StateChange';
import AreaList from './AreaList';
import SeachPage from './SeachPage';
import TabView from './TabView';
import WebView from './WebView';
import ProductList from './ProductList';
import Swiper from './Swiper';
import Animated from './Animated_list';
import Animated1 from './Animated1';
import Animated2 from './Animated2';
import Animated3 from './Animated3';
import Animated4 from './Animated4';
import ListContent from './ListContent';

class AwesomeProject extends Component {

	//构造
  	constructor(props)
  	{
      	super(props);
  	}

  	//返回首页
	return_index = (title, navigator, item) => {
		return (
			<View style={styles.flex}>
				<TopTitle  title={title} onPress={() => navigator.push({title:'首页',id:'main'})} />
				<View style={styles.flex}>
					{item}
				</View>
			</View>
		);
	};

	//返回动画列表
	return_animated_list = (title, navigator, item) => {
		return (
			<View style={styles.flex}>
				<TopTitle  title={'Animated动画 - ' + title} onPress={() => navigator.push({title:'Animated动画',id:'Animated'})} />
				<View style={styles.flex}>
					{item}
				</View>
			</View>
		);
	};


	rendNavigator = (route, navigator) => {
		switch(route.id){
			case 'main' :
				return (
					<View  style={styles.menuBox}>
						<View style={styles.title}>
							<Text>welcome to Linzy react-native!</Text>
						</View>

						<View style={styles.btnList}>
							<Button text="改变视图" onPress={() => navigator.push({title:'更改state',id:'StateChange'})} />
							<Button text="省份列表" onPress={() => navigator.push({title:'省份列表',id:'AreaList'})} />
							<Button text="ListView" onPress={() => navigator.push({title:'ListView',id:'ListContent'})} />
							<Button text="搜索页面" onPress={() => navigator.push({title:'搜索页面',id:'SeachPage'})} />
							<Button text="TabBarView" onPress={() => navigator.push({title:'scrollable-tab-view测试',id:'TabView'})} />
						  	<Button text="WebView" onPress={() => navigator.push({title:'WebView页面',id:'WebView'})} />
					        <Button text="商品列表" onPress={() => navigator.push({title:'商品列表',id:'ProductList'})} />
					        <Button text="图片轮播" onPress={() => navigator.push({title:'图片轮播',id:'Swiper'})} />
					        <Button text="Animated动画" onPress={() => navigator.push({title:'Animated动画',id:'Animated'})} />
							<Button text="弹性拉伸" onPress={() => navigator.push({title:'Animated动画',id:'Animated'})} />
		            	</View>
					</View>
				);
				break;

			case 'StateChange' : 
				return (this.return_index(route.title, navigator, <StateChange />));
				break;
			case 'AreaList' : 
				return (this.return_index(route.title, navigator, <AreaList />));
				break;
			case 'ListContent' : 
				return (this.return_index(route.title, navigator, <ListContent />));
				break;
			case 'SeachPage' : 
				return (this.return_index(route.title, navigator, <SeachPage />));
				break;
			case 'TabView' : 
				return (this.return_index(route.title, navigator, <TabView />));
				break;
		    case 'WebView' : 
		        return (this.return_index(route.title, navigator, <WebView />));
		        break;
		    case 'ProductList' : 
		        return (this.return_index(route.title, navigator, <ProductList />));
		        break;
		    case 'Swiper' :
		        return (this.return_index(route.title, navigator, <Swiper />));
		        break;
		    case 'Animated' :
		        return (this.return_index(route.title, navigator, <Animated route={route} navigator={navigator} />));
		        break;
		    case 'Animated1' :
		        return (this.return_animated_list(route.title, navigator, <Animated1 />));
		        break;
		    case 'Animated2' :
		        return (this.return_animated_list(route.title, navigator, <Animated2 />));
		        break;
		    case 'Animated3' :
		        return (this.return_animated_list(route.title, navigator, <Animated3 />));
		        break;
	        case 'Animated4' :
		        return (this.return_animated_list(route.title, navigator, <Animated4 />));
		        break;
			default : 
				return false;
		}
	};

    render() {
	    return (
	      <Navigator
	        initialRoute={{ title: '首页', id: 'main' }}
	        renderScene={this.rendNavigator}
	      />
	    );
	}
}

const styles = StyleSheet.create({
	flex : {
		flex : 1,
		backgroundColor : '#fff',
	},
	menuBox : {
		flex : 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor : '#fff',
	},
	title : {
		marginBottom : 20,
	},
	btnList : {
		justifyContent: 'center',
    	flexDirection: 'row',
    	flexWrap: 'wrap',
	},
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);