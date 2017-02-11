import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  LayoutAnimation,
  StyleSheet,
} from 'react-native';

const customAnim = {
  customSpring: {
    duration: 400,
    create: {
      type: LayoutAnimation.Types.spring,
      property: LayoutAnimation.Properties.scaleXY,
      springDamping: 0.6
    },
    update: {
      type: LayoutAnimation.Types.spring,
      springDamping: 0.6
    }
  },
  customLinear: {
    duration: 200,
    create: {
      type: LayoutAnimation.Types.linear,
      property: LayoutAnimation.Properties.opacity,
    },
    update: {
      type: LayoutAnimation.Types.easeInEaseOut
    }
  }
};

export default class DemoLayoutAnimation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 100,
      height: 100,
    };
    this._onPress = this._onPress.bind(this);
    //this._createAnimation = this._createAnimation.bind(this);
  }

  //   componentWillMount() {
  //     LayoutAnimation.spring();
  //   }

  componentWillUpdate() {
    LayoutAnimation.configureNext(customAnim.customLinear);
  }

  _onPress = () => {
    // LayoutAnimation.spring();
    this.setState({ width: this.state.width + 20, height: this.state.height + 20 });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.box, { width: this.state.width, height: this.state.height }]} />
        <TouchableOpacity onPress={this._onPress}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Press me!</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  box: {
    backgroundColor: 'red'
  },
  button: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'black'
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  }
});