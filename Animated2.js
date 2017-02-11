import React, {
  Component
} from 'react';
import {
  Animated,
  Easing,
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';

export default class Animated2 extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      bounceValue: new Animated.Value(0),
    };
  }
  render(): ReactElement {
    return ( <Animated.View style = {
        [styles.demo, {
          opacity: this.state.bounceValue
        }]
      } >
      <Text style = {
        styles.text
      } > 悄悄的， 我出现了 </Text>
      </Animated.View >
    );
  }
  componentDidMount() {
    Animated.timing(
      this.state.bounceValue, {
        toValue: 1, // 目标值
        duration: 3000, // 动画时间
        easing: Easing.linear // 缓动函数
      }
    ).start();
  }
}

var styles = StyleSheet.create({
  demo: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  text: {
    fontSize: 30
  }
});