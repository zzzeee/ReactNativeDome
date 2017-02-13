/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Image,
  ListView,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Animated,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-root-toast';

 var URL = 'http://vpn.jingtaomart.com/api/RegionController/getRegionList';

export default class AreaList extends Component {
  //构造
  constructor(props)
  {
      super(props);
      this.state = {
           dataSource: new ListView.DataSource({
               rowHasChanged: (row1, row2) => {
                // console.log(row1);
                // console.log(row2);
                // alert(JSON.stringify(row1));
                // alert(JSON.stringify(row2));
                // return true;
                return row1 !== row2;
               },
           }),
           list : [],
           bounceValue : new Animated.Value(0),
       };
       this.readRow = this.readRow.bind(this);
       this.update_state = this.update_state.bind(this);
  }

  //数据加载完毕后执行
  componentDidMount() {
    this.fetchDate();
  }

  //基本方法， 默认执行
  render() {
    if(!this.state.loaded)
    {
      return this.dataLoading();
    }

    // automaticallyAdjustContentInsets={false}
    // contentContainerStyle={styles.list_view}
    return (
      <View>
        <ListView 
          dataSource={this.state.dataSource} 
          renderRow={this.readRow} 
          onEndReached={this.data_end}
          onEndReachedThreshold={10}
        />
      </View>
    );
  }

  //获取数据
  fetchDate = () => {
    fetch(URL)
    .then((response) => response.json())
    .then((responseJson) => {
      var datas = responseJson.regionAry[0].child;
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(datas),
        list : datas,
        loaded: true,
      });
    })
    .catch((error) => {
      console.error(error);
    })
  };

  //显示加载数据中的视图
  dataLoading = () => {
    return (
      <View style={styles.loading_view}>
        <Text style={styles.loading_text}>加载数据中 ....</Text>
      </View>
    );
  };

  update_state = (city, rowID) => {
    //alert(JSON.stringify(city));

    let _item = Object.assign({}, city, {'isSelected': city.isSelected ? false : true});
    let _newData = Object.assign({}, this.state.list, {[rowID]: _item});

    // Animated.timing(          // Uses easing functions  
    //    this.state.bounceValue,    // The value to drive  
    //    {  
    //       toValue: _item.isSelected ? 1 : 0,
    //       duration : 300,
    //    }            // Configuration  
    // ).start(() => {
    //   this.setState({
    //    dataSource: this.state.dataSource.cloneWithRows(_newData),
    //   });
    // });
    
    this.setState({
     dataSource: this.state.dataSource.cloneWithRows(_newData),
    });
  };

  //添加每一行数据和样式
  readRow = (city, sectionID, rowID) => {
    return (
      <View>
        <TouchableOpacity onPress={this.update_state.bind(this, city, rowID)}>
          <View style={styles.city_box}>
            <Image 
              source={{uri : city.griImg}}
              style={styles.city_img}
            />

            <View style={styles.city_txt_box}>
              <Text style={styles.city_name}>{city.region_name}</Text>
              {city.isSelected ?
                <Icon name='angle-up' size={18} color="#666" /> :
                <Icon name='angle-down' size={18} color="#666" />
              }
            </View>
          </View>
        </TouchableOpacity>
        <View style={styles.hideContent}>
          {city.isSelected ?
              <Text>{city.griInfo}</Text>
            : null
          }
        </View>
      </View>
    );
  };
};

const styles = StyleSheet.create({
  scrollView : {
    flex : 1,
  },
  loading_view : {
    flex : 1,
    flexDirection : 'row',
    justifyContent : 'center',
    alignItems : 'center',
    backgroundColor : '#BBB', 
  },
  loading_text : {
    textAlign : 'center',
    color : '#666',
    fontSize : 15,
    fontWeight : 'bold',
    letterSpacing : 2,
  },
  city_box : {
      margin: 5,
      backgroundColor: '#eee', 
      borderWidth: 1,  
      borderRadius: 5,  
      borderColor: '#CCC',
      flexDirection: 'row',
      justifyContent: 'space-between',
  },
  btn_box : {
    flex: 1,
    flexDirection: 'column',
  },
  city_img : {
    width : 90,
    height : 90,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  city_txt_box : {
    height : 90,
    flexDirection: 'row',
    alignItems : 'center',
    marginRight : 20,
  },
  city_name : {
    fontSize : 11,
    color : '#666',
    marginRight : 5,
  },
  list_view : {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  hideContent : {
    paddingLeft : 10,
    paddingRight : 10,
  },
});
