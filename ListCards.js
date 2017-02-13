import React, { Component } from 'react';
import { 
  AppRegistry, 
  Animated, 
  StyleSheet,
  Text, 
  View, 
  TouchableOpacity 
} from 'react-native';

export default class ListCards extends Component {
  constructor(props) {  
    super(props);  
    this.state={  
       ...props,
       showAnim:new Animated.Value(0)  
     };  
     this.showorhide=0;  
  }  
  
  _showorhideItems(){  
    if(typeof(this.state.name)=='undefined'||this.state.name==null){  
      return;  
    }  
    Animated.timing(          // Uses easing functions  
       this.state.showAnim,    // The value to drive  
       {  
         toValue: this.showorhide == 0 ? 1 : 0,  
       }            // Configuration  
     ).start();  
     this.showorhide=this.showorhide==0?1:0;  
  }  
  
  
  render(){  
    return(  
      <View>  
        <TouchableOpacity onPress={this._showorhideItems.bind(this)}>  
        <View style={styles.headerLine}>  
         <View style={styles.headerRows}><Text>{this.state.name}</Text></View>  
        </View>  
        </TouchableOpacity>  
        <Animated.View  
         style={{
          opacity : this.state.showAnim,
           height:this.state.showAnim.interpolate({  
             inputRange: [0, 1],  
             outputRange: [0, 110]  
           }),  
           overflow:'hidden'
         }  
        }  
        >  
        <View style={styles.showitemContain}>  
         <View style={{height:50, justifyContent:'center', alignItems:'center',}}>  
           <Text>{this.state.title==null?'':this.state.title}</Text>  
         </View>  
         <View style={{height:50, justifyContent:'center', alignItems:'center',}}>  
           <Text>{this.state.fromwhere==null?'':this.state.fromwhere}</Text>  
         </View>  
         </View>  
        </Animated.View>  
  
      </View>  
  
    )  
  }  
}  
  
const styles=StyleSheet.create({  
  headerLine:{  
    height:50,  
    flexDirection:'row',  
    //borderWidth:1,  
    backgroundColor:'#ccc',  
  },  
  headerRows:{  
    flex:1,  
    justifyContent:'center',  
    alignItems:'center',  
  },  
  showitemContain:{  
    borderWidth:1,  
    borderColor:'red',  
    height:110,  
    justifyContent:'center',  
    alignItems:'center',  
  }  
  
});