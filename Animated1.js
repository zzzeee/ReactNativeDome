import React, {
    Component
} from 'react';
import {
    Animated,
    Image,
    StyleSheet,
    Text,
    View,
    Dimensions,
} from 'react-native';

var {height, width} = Dimensions.get('window');

export default class Animated1 extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {
            bounceValue: new Animated.Value(0),
        };
    }
    render(): ReactElement {
        return ( < Animated.Image // 可选的基本组件类型: Image, Text, View
            source = {require('./images/animated.jpg')}
            style = {
                {
                    flex: 1,
                    width: width,
                    //alignItems: 'center',
                    //justifyContent: 'center',
                    transform: [ // `transform`是一个有序数组（动画按顺序执行）
                        {
                            scale: this.state.bounceValue
                        }, // 将`bounceValue`赋值给 `scale`
                    ]
                }
            }
            />
        );
    }
    componentDidMount() {
        this.state.bounceValue.setValue(2); // 设置一个较大的初始值
        Animated.spring( // 可选的基本动画类型: spring, decay, timing
            this.state.bounceValue, // 将`bounceValue`值动画化
            {
                toValue: 0.7, // 将其值以动画的形式改到一个较小值
                friction: 1, // Bouncier spring
                tension: 20,
            }
        ).start(); // 开始执行动画
    }
}