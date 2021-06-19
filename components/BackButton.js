import React, {useContext} from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {Context} from "../functions/context"
import {themes} from "../constants/Colors"

export default function BackButton(props) {
  
  const context = useContext(Context)
  return (
    <TouchableOpacity 
      onPress={() => {
        props.press()
      }}
      style={{
        position: 'absolute',
        right: -15,
        top: 45,
          backgroundColor: "#0002",
        
        height: 50,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        zIndex: 100,
      }}>
      <Ionicons
        name="ios-arrow-back"
        size={30}
        color={themes[context.theme].title}
      />
    </TouchableOpacity>
  );
}
