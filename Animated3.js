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

export default class Animated3 extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      fadeInOpacity: new Animated.Value(0),
      rotation: new Animated.Value(0),
      fontSize: new Animated.Value(0),
    };

    //this.startAnimation = this.startAnimation.bind(this);
  }

  startAnimation = () => {
    var timing = Animated.timing;
    var that = this;
    this.state.fadeInOpacity.setValue(0);
    this.state.rotation.setValue(0);
    this.state.fontSize.setValue(0);
    Animated.parallel(['fadeInOpacity', 'rotation', 'fontSize'].map(property => {
      return timing(this.state[property], {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        //delay: 500,
      });
    })).start(()=>{      
      this.timer = setTimeout(
        () => { 
          that.startAnimation();
        }
      ,800);
    });
  };

  componentDidMount() {
    this.startAnimation();
  }

  componentWillUnmount() {
    // 如果存在this.timer，则使用clearTimeout清空。
    // 如果你使用多个timer，那么用多个变量，或者用个数组来保存引用，然后逐个clear
    this.timer && clearTimeout(this.timer);
  }

  render(): ReactElement {
    return ( < Animated.View style = {
        [styles.demo, {
          opacity: this.state.fadeInOpacity,
          transform: [{
            rotateZ: this.state.rotation.interpolate({
              inputRange: [0, 1],
              outputRange: ['0deg', '360deg']
            })
          }]
        }]
      } >
      < Animated.Text style = {
        {
          fontSize: this.state.fontSize.interpolate({
            inputRange: [0, 1],
            outputRange: [12, 26]
          })
        }
      } > 我骑着七彩祥云出现了 < /Animated.Text>
      </Animated.View>
    );
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