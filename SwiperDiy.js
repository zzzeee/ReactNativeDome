import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
} from 'react-native';

import SwiperItem from './SwiperTDZL';

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
      let obj = {
        open3D: true,       //开启3D
        radius: 0,         //3D半径
        autoPlay: true,     //自动轮播
        playTime: 300,      //播放间隔
        playNumber: 0,      //播放轮数 (数值大于0时有效)
        friction: 4,        //摩擦力
        tension: 90,        //张力
        direction: 'right', //默认方向(顺时针)
      };
    return (
        <View style={styles.swiperBox}>
            <SwiperItem style={styles.swiper} {...obj}>
                <View style={[styles.page, styles.page1]}>
                    <Text style={styles.pageText}>我是第一页</Text>
                </View>
                <View style={styles.page}>
                    <Text style={styles.pageText}>我是第二页</Text>
                </View>
                <View style={[styles.page, styles.page3]}>
                    <Text style={styles.pageText}>我是第三页</Text>
                </View>
                <View style={[styles.page, styles.page4]}>
                    <Text style={styles.pageText}>我是第四页</Text>
                </View>
                <View style={styles.page}>
                    <Text style={styles.pageText}>我是第五页</Text>
                </View>
                <View style={[styles.page, styles.page6]}>
                    <Text style={styles.pageText}>我是第六页</Text>
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
    page6: {
        backgroundColor: '#487',
    },
    pageText: {
        fontSize: 16,
        color : '#fff',
    },
});
