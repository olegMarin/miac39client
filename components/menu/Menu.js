import React, { useContext, useState } from "react";
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import {Context} from "../../functions/context"
import {lay} from '../../constants/Layout'
import { SpeedDial } from 'react-native-elements';
import MenuButton from './MenuButton'
import {styles} from "../../constants/Styles"

export default function Menu(props) {
  
  const context = useContext(Context)
  return (
      <View 
          style={styles.menu}>
        <MenuButton
          width={130}
          icon={'theme-light-dark'}
          press={()=>{context.toggleTheme()}}
          title={context.theme==='light'?'тёмная тема':'светлая тема'}
          />
        <MenuButton
          width={130}
          icon={'history'}
          press={()=>{context.setScreen('chat')}}
          title={'история'}
          />
        <MenuButton
          width={150}
          icon={'chat-processing-outline'}
          press={()=>{context.setScreen('chat')}}
          title={'написать врачу'}
          />
        <MenuButton
          width={200}
          icon={'wifi'}
          press={()=>{context.toggleTheme()}}
          title={'подключить Wi-Fi/BT'}
          />
          {/*  
        <MenuButton
          width={170}
          icon={'bluetooth-connect'}
          press={()=>{context.toggleTheme()}}
          title={'подключить Bluetooth'}
          />
*/}
        {props.hasCameraPermission&&
        <MenuButton
          width={200}
          icon={'camera-plus'}
          press={()=>{props.setCameraState()}}
          title={'фото показаний тонометра'}
          />
         } 
      </View>
  );
}