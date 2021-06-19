import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useContext } from 'react';
import {Context} from "../functions/context"
import {themes} from "../constants/Colors"


export default function BackButton(props) {
  const context = useContext(Context)
  return (
    <TouchableOpacity style={{
          position: "absolute",
          left: 15,
          top: 45,
          width: 50,
          height: 50,
          borderRadius: 50,
          backgroundColor: "#0002",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          zIndex: 200,
        }}
          onPress={() => {
            context.toggleTheme()
          }
          }>
          <Ionicons
            name="md-contrast"
            color={themes[context.theme].title}
            size={26}
            style={{ backgroundColor: 'transparent' }}
          />
        </TouchableOpacity> 
  );
}
