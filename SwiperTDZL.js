/**
 * 3D Swiper 翻页效果
 * 参考 www.reactnative.cn中文网作者之一(天地之灵)的视频教程
 * http://v.youku.com/v_show/id_XMjYwOTU0NzY0MA==.html?spm=a2hzp.8253869.0.0&from=y1.7-2
 * 
 * Date : 2017.04.06
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Animated,
    Dimensions,
    PanResponder,
    propTypes,
} from 'react-native';

var {height, width} = Dimensions.get('window');

export default class SwiperTDZL extends Component {
    // 默认参数
    static defaultProps = {
        open3D: true,       //开启3D
        radius: 50,         //3D半径 (需开启3D)
        autoPlay: true,     //自动轮播
        playTime: 500,      //播放间隔
        playNumber: 0,      //播放轮数 (数值大于0时有效)
        friction: 7,        //摩擦力
        tension: 40,        //张力
        direction: 'right', //默认方向 (顺时针)
    };
    // 参数类型
    static propTypes = {
        open3D: React.PropTypes.bool.isRequired,
        radius: React.PropTypes.number.isRequired,
        autoPlay: React.PropTypes.bool.isRequired,
        playTime: React.PropTypes.number.isRequired,
        playNumber: React.PropTypes.number.isRequired,
        friction: React.PropTypes.number.isRequired,
        tension: React.PropTypes.number.isRequired,
        direction: React.PropTypes.oneOf(['left', 'right']),
    };
    // 构造函数
    constructor(props) {
        super(props);

        this.timer = [];
        this.playCount = 0;
        this.positionValue = 0;
        this.position = new Animated.Value(0);
        this.count = React.Children.count(this.props.children);
        this.animatedStart = this.animatedStart.bind(this);
        // 监听 this.position 值的变化
        this.position.addListener(v => {
            this.positionValue = v.value;
        });
    }

    // 组件加载完成
    componentDidMount() {
        this.autoLoop();
    }

    // 卸载组件
    componentWillUnmount() {
        this.clearTimer();
    }

    // 清空定时器
    clearTimer = () => {
        for(let t of this.timer) {
            clearTimeout(t);
        }
    };

    // 是否继续播放动画
    playContinue = () => {
        let number = this.props.playNumber || 0;
        if(number > 0) {
            if(this.props.direction == 'right' && (number * this.count - 1) <= this.playCount) return false;
            if(this.props.direction == 'left' && (number * this.count) <= -this.playCount) return false;
        }
        return true;
    };

    //自动轮播
    autoLoop = () => {
        if(this.props.autoPlay && this.playContinue()) {
            let that = this;
            let nextValue = this.props.direction == 'left' ? this.positionValue - 1 : this.positionValue + 1;
            nextValue = this.loopStartEnd(nextValue);
            let _timer = setTimeout(() => {
                that.animatedStart(nextValue);
            }, that.props.playTime);
            this.timer.push(_timer);
        }
    };

    //播放动画
    animatedStart = (value) => {
        // 记录轮播总次数
        if(value - this.positionValue > 0) this.playCount++;
        if(value - this.positionValue < 0) this.playCount--;
        // 开始播放
        let that = this;
        Animated.spring(that.position, {
            toValue: value,
            friction: that.props.friction,
            tension: that.props.tension,
        }).start(that.autoLoop);
    };

    // 处理循环的过渡
    loopStartEnd = (n) => {
        if(n < 0) {
            n += this.count;
            this.position.setValue(this.positionValue + this.count);
        }else if(n >= this.count) {
            n -= this.count;
            this.position.setValue(this.positionValue - this.count);
        }

        return n;
    };

    //定义触屏响应事件
    panResponderInit = PanResponder.create({
        // 要求成为响应者：
        onStartShouldSetPanResponder: (evt, gestureState) => false,
        onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
        onMoveShouldSetPanResponder: (evt, gestureState) => true,
        onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
        // 响应开始
        onPanResponderGrant: (evt, gestureState) => {
            this.position.setOffset(this.positionValue);
            this.position.setValue(0);
            this.clearTimer();
        },
        // 移动过程
        onPanResponderMove: (evt, gestureState) => {
            const {dx} = gestureState;
            const touchX = dx / -width;
            this.position.setValue(touchX);
        },
        onPanResponderTerminationRequest: (evt, gestureState) => true,
        // 响应结束
        onPanResponderRelease: (evt, {vx}) => {
            let that = this;
            this.position.flattenOffset();
            const left = Math.floor(this.positionValue);
            const right = left + 1;
            let result = 0;
            // 速度快时 按方向翻页。否则按移动距离翻页。
            if(vx > 0.05) {
                result = left;
            }else if(vx < -0.05) {
                result = right;
            }else {
                result = Math.round(this.positionValue);
            }
            // 处理循环的过渡
            result = this.loopStartEnd(result);
            // 动画效果
            this.animatedStart(result);
        },
    });

    // 基本函数
    render() {
        const { style, children } = this.props;
        let r = Math.sqrt(3)/2 * width + 150 + this.props.radius;
        return (
            <View style={[].concat(styles.container, style)} {...this.panResponderInit.panHandlers}>
                {React.Children.map(children, (child, i) => {
                    let obj = {};
                    if(this.props.open3D) {
                        let i_before = i == 0 ? this.count - 1 : i - 1;
                        let i_after = i == this.count - 1 ? 0 : i + 1;
                        let input_arr = [], output_arr = [];
                        
                        for(let c = 0; c < this.count; c++) {
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
                        // 设置置顶数字
                        obj.zIndex = this.position.interpolate({
                            inputRange: input_arr,
                            outputRange: output_arr,
                        });
                        // 设置3D动画效果
                        obj.transform = [
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
                        ];
                    }else {
                        obj.transform = [{translateX :this.position.interpolate({
                            inputRange: [i, i + 1],
                            outputRange: [0, -width],
                        })}];
                    }
                    return (<Animated.View key={i} style={[styles.item, obj]}>{child}</Animated.View>);
                })}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    flex: {
        flex: 1,
    },
    container: {
        backgroundColor : '#bbb',
        height: 240,
    },
    item: {
        backgroundColor: '#4ca7b3',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
});