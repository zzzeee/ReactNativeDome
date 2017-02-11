import React, { Component } from 'react';
import {
	AppRegistry,
	Image,
  	ListView,
  	ScrollView,
	StyleSheet,
	Text, 
	View,
	TouchableOpacity,
	AsyncStorage,
	Dimensions,
	PixelRatio,
} from 'react-native';

import Button from './Button';

var GWCid = 'GWC_ID_';
var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

var Model = [{
	id : '1',
	name : '苹果',
	price : 20,
}, {
	id : '2',
	name : 'k复健科人苹果',
	price : 240,
}, {
	id : '3',
	name : '替代品授信捡拾',
	price : 60,
}, {
	id : '4',
	name : '吉他手e',
	price : 65.5,
}, {
	id : '5',
	name : '香焦',
	price : 10.2,
}];

export default class ProductList extends Component {

	//构造
	constructor(props)
	{
		super(props);
		this.state = {
			GWC_count : 0,
			GWC_list : [],
		};

		this.getNumber = this.getNumber.bind(this);
	}

	componentDidMount() {
		let that = this;
		AsyncStorage.getAllKeys(function(err, keys){
			if(err)
			{
				alert('读取AsyncStorage数据错误！');
			}
			else
			{
				let total_count = 0;
				let _numberArr = [];
				for(let i in keys)
				{
					console.log(keys[i]);
					
					
					AsyncStorage.getItem(keys[i], function(err, result){
						if(!err)
						{
							if(result && keys[i].indexOf(GWCid) === 0)
							{
								let _data = JSON.parse(result);
								total_count += _data.count;
								_numberArr.push(_data);
							}

							if(i != 0 && i == keys.length - 1)
							{
								that.setState({
									GWC_count : total_count,
									GWC_list : _numberArr,
								});
							}
						}
					});
				}
			}
		});
	}

	//添加购物车信息
	press = (data) => {
		let that = this;
		let key = GWCid + data.id;
		AsyncStorage.getItem(key, function(err, result){
			if(!err)
			{
				let _data;
				if(result)
				{
					_data = JSON.parse(result);
					_data.count++;
				}
				else
				{
					_data = data;
					_data.count = 1;
				}
				
				let arr = that.state.GWC_list;
				let add = true;
				for(let i in arr)
				{
					if(arr[i] && arr[i].id == _data.id)
					{
						add = false;
						arr[i] = _data;
						break;
					}
				}
				if(add)
				{
					arr.push(_data);
				}

				AsyncStorage.setItem(key, JSON.stringify(_data), function(err){
					if(!err)
					{
						that.setState({
							GWC_count : that.state.GWC_count + 1,
							GWC_list : arr,
						});
					}
				});
			}
		});
	};

	//获取商品数量
	getNumber = (id) => {
		let arr = this.state.GWC_list;
		for(let i in arr)
		{
			if(arr[i] && arr[i].id == id)
			{
				return arr[i].count;
			}
		}

		return 0;
	};

  	render() {
	  	var list = [];
	  	var _count = this.state.GWC_count;
	  	var str = "共" + _count + "件商品，去结算";
	  	for(var i in Model)
	  	{
			let row = (
				<View key={i} style={styles.row}>
					<Item 
						number={this.getNumber(Model[i].id)}
						title={Model[i].name}
						press={this.press.bind(this, Model[i])}
					/>
				</View>
			);

			list.push(row);
	  	}

	    return (
	    	<ScrollView stle={styles.scrollview}>
	    		<View style={styles.item_box}>{list}</View>
	    		<Button text={str} />
		    </ScrollView>
	    );
	}
}

const styles = StyleSheet.create({
	flex : {
	    flex : 1,
	    justifyContent: 'center',
		alignItems: 'center',
	},
	row : {
		width : width / 2 - 20,
	  	height : 100,
	  	margin : 10,
	  	backgroundColor : '#ddd',
	  	borderColor : '#aaa',
	  	borderWidth : 1 / PixelRatio.get(),
	},
	item : {
	  	flex : 1,
	  	justifyContent: 'space-between',
	},
	item_txt_box : {
	  	backgroundColor : 'rgba(0, 0, 0, 0.7)',
	},
	item_txt : {
	  	padding : 5,
	  	color : '#fff',
	},
	scrollview : {
	  	flex : 1,
	},
	item_box : {
		flexDirection: 'row',
	  	flexWrap: 'wrap',
	},
	number_box : {
	  	flex : 1,
		alignItems: 'flex-end',
	},
	number_txt : {
		width : 20,
		height : 20,
		borderRadius : 10,
		color : '#fff',
		backgroundColor : 'red',
		marginRight : 10,
		marginTop : 10,
		textAlign : 'center',
	},
});

var Item = React.createClass({
	render() {
		//console.log(this.props.number);
		return (
			<View style={styles.item}>
				<View style={styles.number_box}>
					{this.props.number ? 
						<Text style={styles.number_txt}>{this.props.number}</Text>
						: null
					}
				</View>
				
				<TouchableOpacity onPress={this.props.press}>
					<View style={styles.item_txt_box}>
						<Text numberOfLines={1} style={styles.item_txt}>{this.props.title}</Text>
					</View>
				</TouchableOpacity>
			</View>
		);
	}
});
