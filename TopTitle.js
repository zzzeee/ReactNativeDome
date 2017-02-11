import React, { Component } from 'react';
import {
	StyleSheet,
	Text, 
	View, 
	TouchableHighlight, 
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

export default class TopTitle extends Component {

	render() {
		let {title, onPress} = this.props;
	    return (
	    	<View style={styles.topBox}>
	    		<View style={styles.sideBox}>
	    			<TouchableHighlight style={styles.btn} onPress={onPress}>
	    				<Icon name="chevron-left" size={20} color="#888" />
	    			</TouchableHighlight>
	    		</View>
	    		<View style={styles.middleBox}>
	    			<Text>{title}</Text>
	    		</View>
	    		<View style={styles.sideBox}>
	    		</View>
			</View>
	    );
	}
}

var styles = StyleSheet.create({
	topBox : {
		height : 40,
		flexDirection : 'row',
		borderWidth : 1,
		borderColor : '#ddd',
	},
	sideBox : {
		flex : 1,
		height : 40,
		justifyContent: 'center',
		alignItems: 'center',
	},
	middleBox : {
		flex : 8,
		height : 40,
		justifyContent: 'center',
		alignItems: 'center',
	},
	btn : {
		padding : 5,
	},
});
