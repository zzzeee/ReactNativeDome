import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Dimensions,
  PanResponder,
  TouchableOpacity,
} from 'react-native';

var {height, width} = Dimensions.get('window');

export default class SwiperItem extends Component {
    
  //构造
  constructor(props)
  {
      super(props);
      this.state = {
          width : null,
       };
       
       this.timer = [];
       this.position = new Animated.Value(0);
       this.positionValue = 0;
       this.position.addListener(v => {
           this.positionValue = v.value;
       });
  }

  //数据加载完毕后执行
  componentDidMount() {
      this.autoLoop();
  }

  //自动跳转
  autoLoop = () => {
      console.log(this.positionValue);
      let that = this;
      const count = React.Children.count(this.props.children);
      let next_position = this.positionValue - 1;
      
      if(next_position < 0) {
            next_position += count;
            that.position.setValue(that.positionValue + count);
        }else if(next_position >= count) {
            next_position -= count;
            that.position.setValue(that.positionValue - count);
        }

        let _timer = setTimeout(() => {
            Animated.spring(that.position, {
                toValue: next_position,
                friction: 7,
                tension: 40,
            }).start(that.autoLoop);
        }, 600);
        this.timer.push(_timer);
  };

  componentWillUnmount() {
    // 如果存在this.timer，则使用clearTimeout清空。
    // 如果你使用多个timer，那么用多个变量，或者用个数组来保存引用，然后逐个clear
    //this.timer && clearTimeout(this.timer);
    for(let t of this.timer) {
        clearTimeout(t);
    }
  }

    _panResponder = PanResponder.create({
      // 要求成为响应者：
      onStartShouldSetPanResponder: (evt, gestureState) => false,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
          //console.group('触屏事件');
          console.log('-----------start-----------');
        // 开始手势操作。给用户一些视觉反馈，让他们知道发生了什么事情！
        // gestureState.{x,y}0 现在会被设置为0
        
        this.position.setOffset(this.positionValue);
        this.position.setValue(0);
        for(let t in this.timer) {
            clearTimeout(this.timer[t]);
        }
      },
      onPanResponderMove: (evt, gestureState) => {
        // 最近一次的移动距离为gestureState.move{X,Y}
        // 从成为响应者开始时的累计手势移动距离为gestureState.d{x,y}
        const {dx} = gestureState;
        const touchX = dx / -width;
        console.log('move:' + touchX);
        this.position.setValue(touchX);
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, {vx}) => {
          console.log('-----------end-----------');
          //console.groupEnd();
        // 用户放开了所有的触摸点，且此时视图已经成为了响应者。
        // 一般来说这意味着一个手势操作已经成功完成。
        let that = this;
        this.position.flattenOffset();
        const count = React.Children.count(this.props.children);
        // -------------------允许循环轮播 start-----------------------
        //const left = Math.max(0, Math.floor(this.positionValue));
        //const right = Math.min(count - 1, left + 1);
        // -------------------允许循环轮播 end-----------------------
        const left = Math.floor(this.positionValue);
        const right = left + 1;
        let result = 0;

        if(vx > 0.05) {
            result = left;
        }else if (vx < -0.05) {
            result = right;
        }else {
            result = Math.round(this.positionValue);
        }
        console.log('result = ' + result);
        // -------------------允许循环轮播 start-----------------------
        if(result < 0) {
            result += count;
            this.position.setValue(this.positionValue + count);
        }else if(result >= count) {
            result -= count;
            this.position.setValue(this.positionValue - count);
        }
        // -------------------允许循环轮播 end-----------------------
        Animated.spring(this.position, {
            toValue: result,
            friction: 5,
            tension: 60,
        }).start(that.autoLoop);
      },
      onPanResponderTerminate: (evt, gestureState) => {
          console.log('onPanResponderTerminate');
        // 另一个组件已经成为了新的响应者，所以当前手势将被取消。
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // 返回一个布尔值，决定当前组件是否应该阻止原生组件成为JS响应者
        // 默认返回true。目前暂时只支持android。
        return true;
      },
    });

  //基本方法， 默认执行
  render() {
    const { style, children } = this.props;
    //const r = Math.sqrt(3)/2 * width;
    const r = Math.sqrt(3)/2 * width + 200;
    const count = React.Children.count(this.props.children);
    return (
        <View style={[].concat(styles.container, style)} {...this._panResponder.panHandlers}>
            {React.Children.map(children, (child, i)=>{
                let i_before = i == 0 ? count - 1 : i - 1;
                let i_after = i == count - 1 ? 0 : i + 1;
                let input_arr = [], output_arr = [];

                for(let c = 0; c < count; c++) {
                    if(c == i) {
                        output_arr.push(9);
                    }else if(c == i_before) {
                        output_arr.push(8);
                    }else if(c == i_after) {
                        output_arr.push(8);
                    }else {
                        output_arr.push(1);
                    }
                    input_arr.push(c);
                }

                return (
                    <Animated.View 
                        key={i} 
                        style={[styles.item, {
                            zIndex: this.position.interpolate({
                                //inputRange: [i - 1, i, i + 1],
                                //outputRange: [8, 9, 8],
                                inputRange: input_arr,
                                outputRange: output_arr,
                            }),
                            transform: [
                                // -------------------3D效果的一些样式 start-----------------------
                                {perspective: 850},
                                {scale: 0.6}, 
                                {rotateY: '90deg'},
                                {translateX: r},
                                {rotateY: '-90deg'},
                                {rotateY: this.position.interpolate({
                                    inputRange: [i, i + 1],
                                    outputRange: ['0deg', '-60deg'],
                                })},
                                {rotateY: '-90deg'},
                                {translateX: r},
                                {rotateY: '90deg'},
                                // -------------------3D效果的一些样式 end-----------------------

                                // -------------------2D效果的一些样式 start-----------------------
                                // {translateX: this.position.interpolate({
                                //     inputRange: [i, i + 1],
                                //     outputRange: [0, -width],
                                // })},
                                // -------------------2D效果的一些样式 end-----------------------
                            ]
                        }]}
                    >
                        {child}
                    </Animated.View>
                );
            })}
        </View>
    );
  }
};

const styles = StyleSheet.create({
    flex: {
        flex: 1,
    },
    container: {
        backgroundColor : 'gray',
    },
    item: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
});
