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
  TextInput,
} from 'react-native';

export default class SeachInput extends Component {
  //构造
  constructor(props)
  {
      super(props);
      this.state = {
           show : false,
           value : '',
       };
  }

  //获取输入框内容
  getValue = (text) => {
    this.setState({
      show : true,
      value : text
    });
  };

  //显示搜索结果
  showResult = () => {
    return (
      this.state.show && this.state.value != '' ? 
      <Text>正在搜索 [{this.state.value}] 中 ...</Text> 
      : null
    );
  };

  //基本方法， 默认执行
  render() {
    return (
      <View style={styles.flex}>
        <View style={styles.seachBox}>
          <View style={styles.flex}>
            <TextInput 
              placeholder='请输入名称' 
              placeholderTextColor='#117769' 
              onChangeText={this.getValue}
            />
          </View>

          <View style={styles.seachTextBox}>
            <Text style={styles.seachText}>搜索</Text>
          </View>
        </View>

        <View style={styles.seachResult}>
          {this.showResult()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  flex : {
    flex : 1,
  },
  seachBox : {
    height : 40,
    marginLeft : 5,
    marginRight : 5,
    marginTop : 20,
    flexDirection : 'row',
  },
  seachTextBox : {
    width : 80,
    height : 40,
    borderRadius : 5,
    justifyContent : 'center',
    alignItems : 'center',
    backgroundColor : '#117769',
  },
  seachText : {
    padding : 10,
    color : '#fff',
  },
  seachResult : {
    flex : 1,
    marginLeft : 5,
    marginRight : 5,
    marginTop : 20,
  },
});

