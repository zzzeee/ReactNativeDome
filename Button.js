import React, { Component } from 'react';
import {
	StyleSheet,
	Text, 
	View, 
	TouchableHighlight 
} from 'react-native';

export default class Button extends Component {

	//构造
	constructor(props)
	{
		super(props);
		this.state = {};
	}

	render() {
		let {text, onPress} = this.props;
	    return (
	    	<TouchableHighlight style={styles.btnBox} onPress={onPress}>
				<Text  numberOfLines={1} style={styles.btnText}>{text}</Text>
			</TouchableHighlight>
	    );
	}
}

const styles = StyleSheet.create({
	btnBox : {
		minWidth : 120,
		height : 35,
		borderRadius : 8,
		backgroundColor : 'green',
		justifyContent: 'center',
		alignItems: 'center',
		margin : 5,
	},
	btnText : {
		color : '#fff',
		padding : 5,
	},
});
