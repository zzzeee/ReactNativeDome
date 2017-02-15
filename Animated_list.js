import React, { Component } from 'react';
import { 
	AppRegistry,
	StyleSheet,
	Text, 
	View, 
	Switch,
} from 'react-native';

import Button from './Button';

export default class Animated_list extends Component {

	//构造
  	constructor(props)
  	{
      	super(props);
      	this.state = {
      		eventSwitchIsOn : false,
      	};
  	}

	render() {
		let {route, navigator} = this.props;

	    switch(route.id){
			case 'Animated' :
				return (
					<View style={styles.btnList}>
						<Button text="动画1" onPress={() => navigator.push({title:'动画1',id:'Animated1'})} />
						<Button text="动画2" onPress={() => navigator.push({title:'动画2',id:'Animated2'})} />
						<Button text="动画3" onPress={() => navigator.push({title:'动画3',id:'Animated3'})} />
						<Button text="动画4" onPress={() => navigator.push({title:'动画4',id:'Animated4'})} />
						<Switch
							onTintColor='red'
		                    thumbTintColor='green'
		                    tintColor='blue'
			                disabled={false}
			                // style={{
			                // 	marginBottom: 10,
			                // 	borderColor: '#875',
			                // 	borderWidth: 1,
			                // }}
			                value={this.state.eventSwitchIsOn}
			                onValueChange={
			                	(value) => this.setState({eventSwitchIsOn: value})
			                }
			            />
	            	</View>
				);
				break;
			default : 
				return false;
		}
	}
}

const styles = StyleSheet.create({
	content : {
		flex : 1,
		backgroundColor : 'green',
	},
	btnList : {
		flex : 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});