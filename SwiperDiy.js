import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
} from 'react-native';

import SwiperItem from './SwiperItem';

export default class SwiperDiy extends Component {
  //构造
  constructor(props)
  {
      super(props);
      this.state = {
       };
  }

  //数据加载完毕后执行
  componentDidMount() {
  }

  //基本方法， 默认执行
  render() {
    return (
        <View style={styles.swiperBox}>
            <SwiperItem style={styles.swiper}>
                <View style={[styles.page, styles.page1]}>
                    <Text style={styles.pageText}>我是第一页</Text>
                </View>
                <View style={[styles.page, styles.page2]}>
                    <Text style={styles.pageText}>我是第二页</Text>
                </View>
                <View style={[styles.page, styles.page3]}>
                    <Text style={styles.pageText}>我是第三页</Text>
                </View>
                <View style={[styles.page, styles.page2]}>
                    <Text style={styles.pageText}>我是第四页</Text>
                </View>
                <View style={[styles.page, styles.page3]}>
                    <Text style={styles.pageText}>我是第五页</Text>
                </View>
            </SwiperItem>
        </View>
    );
  }
};

const styles = StyleSheet.create({
    swiperBox: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
    },
    swiper: {
        height: 240,
    },
    page: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    page1: {
        backgroundColor : 'red',
    },
    page2: {
        backgroundColor: 'green',
    },
    page3: {
        backgroundColor: 'blue',
    },
    page4: {
        backgroundColor: '#552'
    },
    page5: {
        backgroundColor: '#698',
    },
    pageText: {
        fontSize: 16,
        color : '#fff',
    },
});
