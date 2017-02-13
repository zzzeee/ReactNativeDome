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
//const myIcon = (<Icon name="rocket" size={30} color="#900" />)
//import C_Button from './test/basic/C_Button';
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
                console.log(row1);
                console.log(row2);
                // alert(JSON.stringify(row1));
                // alert(JSON.stringify(row2));
                return true;
                return row1 !== row2;
               },
           }),
           list : [],
           list_state : [],
           loaded: false,
           menu : false,
           state_hide_view : this.hide_view,
           downup : 'angle-up',
           bounceValue : new Animated.Value(0),
           selectIndex : 0,
       };

       this.showorhide=0; 
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

    // return (
    //   <ScrollView 
    //     ref={(scrollView) => { 
    //       console.log(scrollView);
    //       _scrollView = scrollView; 
    //     }}
    //     style={styles.scrollView}>
    //     {this.state.list.map(this.createCardRow)}
    //   </ScrollView>
    // );
  }

  //获取数据
  fetchDate = () => {
    fetch(URL)
    .then((response) => response.json())
    .then((responseJson) => {
      var datas = responseJson.regionAry[0].child;
      var newDatas = [];
      for(let i = 0; i < 3; i++)
      {
        newDatas[i] = datas[i];
      }

      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(newDatas),
        list : newDatas,
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

  update_state = (city) => {
    //alert(JSON.stringify(city));
    // let _data = this.state.list.slice();
    // for(let i in _data)
    // {
    //   if(_data[i].region_id == city.region_id)
    //   {
    //     let _state = _data[i].select ? true : false;
    //     _data[i].select = !_state;
    //     break;
    //   }
    // }
    
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.state.list),
      selectIndex : city.region_id, 
    });

    Animated.timing(          // Uses easing functions  
       this.state.bounceValue,    // The value to drive  
       {  
          toValue: this.showorhide==0?1:0,
          //dataSource: this.state.dataSource.cloneWithRows(this.state.list),
          //selectIndex : city.region_id, 
       }            // Configuration  
     ).start();  

    // alert(JSON.stringify(_data));
    //console.log(_data);
  };

  //添加每一行数据和样式
  readRow = (city, sectionID, rowID) => {
    return (
      <View>
        <TouchableOpacity onPress={this.update_state.bind(this, city)}>
          <View style={styles.city_box}>
            <Image 
              source={{uri : city.griImg}}
              style={styles.city_img}
            />

            <View style={styles.city_txt_box}>
              <Text style={styles.city_name}>{city.region_name}</Text>
              {this.state.selectIndex == city.region_id ?
                <Icon name='angle-up' size={18} color="#666" /> :
                <Icon name='angle-down' size={18} color="#666" />
              }
            </View>
          </View>
        </TouchableOpacity>
        <View>
          {this.state.selectIndex == city.region_id ?
            <Animated.View style={{
              height:this.state.showAnim.interpolate({  
                inputRange: [0, 1],  
                outputRange: [0, 110]  
              }),  
              overflow:'hidden',
            }}>
              <Text>{city.griInfo}</Text>
            </Animated.View> 
            : null
          }
        </View>
      </View>
    );
  };

  // 批量创建
  createCardRow = (province, i) => {
      let _i = i;
      let _state = this.state.list_state[_i] != 'undefined' && this.state.list_state[_i] ? true : false;
      //console.log(this.state.list_state[_i]);
      //console.log(_state);
      return (
        <View key={_i}>
          <TouchableOpacity onPress={(_i) => {
            //this.setState({
              //list_state[_i] : !this.state.list_state[_i]
            //});
            console.log(_i);
          }}>
            <View style={styles.city_box}>
              <Image 
                source={{uri : province.griImg}}
                style={styles.city_img}
              />

              <View style={styles.city_txt_box}>
                <Text style={styles.city_name}>{province.region_name}</Text>
                {
                  _state ?
                    <Icon name='angle-up' size={18} color="#666" /> : 
                    <Icon name='angle-down' size={18} color="#666" />
                }
              </View>
            </View>
          </TouchableOpacity>
        </View>
    );
  };

  //添加数据拉到底的事件
  data_end = () => {
    let toast = Toast.show('你他妈已经到底了！！！', {
        duration: Toast.durations.LONG,
        position: Toast.positions.CENTER,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
        onShow: () => {
            // calls on toast\`s appear animation start
        },
        onShown: () => {
            // calls on toast\`s appear animation end.
        },
        onHide: () => {
            // calls on toast\`s hide animation start.
        },
        onHidden: () => {
            // calls on toast\`s hide animation end.
        }
    });
  };

  chang_state = () => {
    this.setState({
      menu: 1
    });
  };

  hide_view = () => {
    let x = (true? <Text>菜单子内容</Text> : null);
    return x;
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
  down_menu : {
    flex : 1,
    height : 50,
    backgroundColor : '#aaa',
  },
});
