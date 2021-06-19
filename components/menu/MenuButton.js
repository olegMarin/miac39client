import React, { useContext, useState } from "react";
import {Context} from "../../functions/context"
import {lay} from '../../constants/Layout'
import { SpeedDial } from 'react-native-elements';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {themes} from "../../constants/Colors"

import {styles} from "../../constants/Styles"
import { TouchableOpacity } from "react-native";
import { View, Text } from "react-native";

export default function MenuButton(props) {
  
  const context = useContext(Context)
  return (
      <TouchableOpacity 
          style={{
            backgroundColor: themes[context.theme].buttonNextDialogColorOn,
            width: props.width,
            height: 50,
            borderTopLeftRadius: 50,
            borderBottomLeftRadius: 50,
            elevation: 7,
            flexDirection: "row",
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingLeft: 10
          }}
            accessible={true}
            onPress={props.press}
            >
        <MaterialCommunityIcons 
            name={props.icon}
            size={30} 
            color={themes[context.theme].menuIcon}
            style={{
              margin: 6,
            }} />
        <View
          style={{
            margin: 4,
            height: 42,
            justifyContent: 'center'
          }}
        >
        <Text
          style={{
            color: themes[context.theme].menuIcon,
            fontSize: 15,
            width: props.width-58
          }}
        >{props.title}</Text>
        </View>
          
      </TouchableOpacity>
  );
}
