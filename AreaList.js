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
  TouchableOpacity
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
               rowHasChanged: (row1, row2) => row1 !== row2,
           }),
           list : [],
           list_state : [],
           loaded: false,
           menu : false,
           state_hide_view : this.hide_view,
           downup : 'angle-up',
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

    //automaticallyAdjustContentInsets={false}
    //contentContainerStyle={styles.list_view}
    // return (
    //   <View>
    //     <ListView 
    //       dataSource={this.state.dataSource} 
    //       renderRow={this.readRow} 
    //       onEndReached={this.data_end}
    //       onEndReachedThreshold={10}
    //     />
    //   </View>
    // );

    return (
      <ScrollView 
        ref={(scrollView) => { 
          console.log(scrollView);
          _scrollView = scrollView; 
        }}
        style={styles.scrollView}>
        {this.state.list.map(this.createCardRow)}
      </ScrollView>
    );
  }

  //获取数据
  fetchDate = () => {
    fetch(URL)
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(responseJson.regionAry[0].child),
        list : responseJson.regionAry[0].child,
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

  update_state = () => {
    let {key} = this.props;
    console.log({key});
    // this.setState({
    //   menu : !this.state.menu,
    //   downup : this.state.downup == 'angle-up' ? 'angle-down' : 'angle-up',
    // });
  };

  //添加每一行数据和样式
  readRow = (city) => {
    //console.log(city.child);
    //let city_child = city.child;
    return (
      <View>
        <View>
          <TouchableOpacity onPress={this.update_state}>
            <View style={styles.city_box}>
              <Image 
                source={{uri : city.griImg}}
                style={styles.city_img}
              />

              <View style={styles.city_txt_box}>
                <Text style={styles.city_name}>{city.region_name}</Text>
                {
                  this.state.downup == 'angle-up' ?
                    <Icon name='angle-up' size={18} color="#666" /> : 
                    <Icon name='angle-down' size={18} color="#666" />
                }
              </View>
            </View>
          </TouchableOpacity>
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

  show_downup = () => {
    if(this.state.downup == 'angle-up')
    {
      return <Icon name='angle-up' size={18} color="#666" />
    }
    else
    {
      return <Icon name='angle-down' size={18} color="#666" />
    }
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
