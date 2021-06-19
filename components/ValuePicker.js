import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useContext } from 'react';
import {Context} from "../functions/context"
import {themes} from "../constants/Colors"
import { LinearGradient } from 'expo-linear-gradient';
import ScrollPicker from  './ScrollPicker';

import {styles} from "../constants/Styles"
import { lay } from '../constants/Layout';
import ThemedListItem from 'react-native-elements/dist/list/ListItem';

export default class ValuePicker extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: props.value,
      index: props.selectedIndex
    }}
    render(){
  return (
     <View style={{...styles.settSlide, height: lay.window.height/4-40}}>
              <Text style={{ 
                    position: 'absolute', 
                    top: - 20,
                    zIndex: 110,  
                    //padding: 4, 
                    fontSize: 18, 
                    textAlign: 'center',
                    color: themes[this.context.theme].mainText, 
                    fontWeight: '500',
                    backgroundColor: themes[this.context.theme].gradientStart,
                    width: lay.window.width-206,
                  }}>
              {this.props.title}
              </Text>
              <LinearGradient
                colors={[themes[this.context.theme].gradientStart, themes[this.context.theme].gradientEnd]}
                style={{...styles.titleTopGradient, height: (lay.window.height/3-50)/4}}
              />  
              <ScrollPicker
                style={{
                  flex: 1,
                }}
                ref={(sp) => { this.sp = sp }}
                dataSource={this.props.dataSource}
                selectedIndex={this.props.selectedIndex}
                //scrollToIndex={this.props.selectedIndex}
                itemHeight={50}
                wrapperHeight={lay.window.height/3-40}
                wrapperColor={themes[this.context.theme].gradientStart}
                highlightColor={'#a8d8d8'}
                renderItem={(data, index, isSelected) => {
                  return (
                    <View>
                      <Text style={
                        isSelected?{
                            fontSize: 45,fontWeight: '900',
                            color: themes[this.context.theme].mainText,
                          } : 
                          {
                            fontSize: 35,
                            color: "#3cb5c6",}
                          }>
                        {data}
                      </Text>
                    </View>
                  )
                }}
                onValueChange={(data, selectedIndex) => {
                  this.setState({value: data, index: selectedIndex})
                  this.props.setValue(data)
                }}
              />
              <LinearGradient
                colors={[themes[this.context.theme].gradientEnd, themes[this.context.theme].gradientStart]}
                style={{...styles.volumeBottomGradient, height: (lay.window.height/3-50)/4}}
              /> 
        </View>
  );}
}

ValuePicker.contextType = Context;