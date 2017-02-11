import React, { Component } from 'react';
import {
	StyleSheet,
	Text, 
	View, 
	Dimensions,
} from 'react-native';

import Swiper from 'react-native-swiper';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

var styles = StyleSheet.create({
	SwiperBox : {
		height: 300,
	},
	wrapper: {
	},
	slide1: {
	    height: 300,
	    justifyContent: 'center',
	    alignItems: 'center',
	    backgroundColor: '#9DD6EB',
	},
	slide2: {
	    height: 300,
	    justifyContent: 'center',
	    alignItems: 'center',
	    backgroundColor: '#97CAE5',
	},
	slide3: {
	    height: 300,
	    justifyContent: 'center',
	    alignItems: 'center',
	    backgroundColor: '#92BBD9',
	},
	text: {
	    color: '#fff',
	    fontSize: 30,
	    fontWeight: 'bold',
	},
	flex : {
		flex : 1,
	},
	content : {
		flex : 1,
		backgroundColor : 'gray',
		justifyContent: 'center',
	    alignItems: 'center',
	},
})

export default class ReactSwiper extends Component {
  render() {
    return (
    	<View style={styles.flex}>
    		<View style={styles.SwiperBox}>
			    <Swiper 
				    style={styles.wrapper} 
				    horizontal={true}
				    showsPagination={true}
				    paginationStyle={{height: height + 80}}
				    //activeDot={<View style={{backgroundColor: '#007aff', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} />}
				    autoplay={true}
				    autoplayTimeout={2}
				    showsButtons={false}>
			        <View style={styles.slide1}>
			          	<Text style={styles.text}>Hello Swiper</Text>
			        </View>
			        <View style={styles.slide2}>
			          	<Text style={styles.text}>Beautiful</Text>
			        </View>
			        <View style={styles.slide3}>
			          	<Text style={styles.text}>And simple</Text>
			        </View>
			    </Swiper>
		    </View>
		    <View style={styles.content}>
		    	<Text>看我吊不？</Text>
		    </View>
	    </View>
    );
  }
}
