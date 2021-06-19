import React, { useContext, useState } from "react";
import {Context} from "../../functions/context"
import {lay} from '../../constants/Layout'
import { SpeedDial } from 'react-native-elements';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {themes} from "../../constants/Colors"

import {styles} from "../../constants/Styles"
import { TouchableOpacity } from "react-native";
import { View, Text } from "react-native";
import LottieView from 'lottie-react-native';

export default function MenuButton(props) {

  
  const [process, setProcess] = useState(0)
  let animation = React.createRef();
  const context = useContext(Context)
  return (
      <TouchableOpacity 
          style={{
            position: "absolute",
            bottom: 0,
            right: -15,
            backgroundColor: 'transparent',
            width: 200,
            height: 200,
            borderRadius: 110,
            justifyContent: 'center',
            alignItems: 'center',
          }}
            accessible={true}
            onPress={()=>{
              props.press()
              if(process===0){
                setProcess(1)
                animation.play()
              }else{
                setProcess(0)
                animation.stop()
              }
            }}
            >
        {/* <MaterialCommunityIcons 
            name={'send'}
            size={30} 
            color={themes[context.theme].menuIcon}
            style={{
              marginTop: 8,
            }} /> */}
        <LottieView
          ref={animate => {
            animation = animate;
          }}
          loop
          style={{
            width: 200,
            height: 200,
            backgroundColor: 'transparent',
            position: 'absolute',
            zIndex: 1,
            top:0, left: 0
          }}
          source={require('../../assets/beatingHeartIcon.json')}
          // OR find more Lottie files @ https://lottiefiles.com/featured
          // Just click the one you like, place that file in the 'assets' folder to the left, and replace the above 'require' statement
        />
        <View
          style={{
            margin: 4,
            height: 42,
          }}
        >
        {!process&&
          <Text
            style={{
              color: themes[context.theme].title,
              fontWeight: '500',
              marginTop: -10,
              fontSize: 15,
              width: 90,
              textAlign: 'center'
            }}
          >{'отправить показатели'}</Text>
        }
        </View>
          
      </TouchableOpacity>
  );
}
