/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import Button from './Button';

export default class StateChange extends Component {
  //构造
  constructor(props)
  {
      super(props);
      this.state = {
           number : 0,
       };
  }

  //基本方法， 默认执行
  render() {
    return (
      <View style={styles.loading_view}>
        <Text style={styles.loading_text}>{this.state.number}</Text>

        <View>
          <Button text="添加" onPress={() => {
            this.setState({
              number : this.state.number + 1,
            });
          }} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loading_view : {
    flex : 1,
    justifyContent : 'center',
    alignItems : 'center',
    backgroundColor : '#BBB', 
  },
  loading_text : {
    textAlign : 'center',
    color : '#666',
    fontSize : 35,
    fontWeight : 'bold',
    letterSpacing : 2,
  },
});

