import React, {useContext, useState} from 'react';
import { Text, View, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import {Context} from "../functions/context"
import {themes} from "../constants/Colors"
import {lay} from "../constants/Layout"
import BackButton from "./BackButton"
import {styles} from "../constants/Styles"
import LottieView from 'lottie-react-native';


export default function CompleteAdvice(props) {
  
  const context = useContext(Context)
  let animation = React.createRef();


const adviceArray={
  ok: {
    text: 'У вас отличное давление! Так держать!',
    lottie: 'heart_okay.json',
  },
  ambulance: {
    text: 'У вас критически высокое давление. Успокойтесь и вызовите скорую медицинскую помощь.',
    lottie: 'ambulance.json'
  },
  openWindow: {
    text: 'У вас повышенное давление. Откройте окно и расслабьтесь. Сделайте горячую ванночку для рук.',
    lottie: 'Rest_man.json'
  },
  coffee: {
    text: 'У вас пониженное давление. Успокойтесь и выпейте чашечку кофе.',
    lottie: 'coffee.json'
  }
}
 
const path = '../assets/'+adviceArray[props.advice].lottie

    return(
        <View
            style={{
              width: lay.window.width,
              height: lay.window.height,
              position: 'absolute',
              backgroundColor: themes[context.theme].allBackgroundOp,
              zIndex: 250,
              top: 0,
            }}
           >
           <BackButton
              press={()=>{props.close()}}
            />
           <TouchableOpacity
           
            onPress={()=>props.close()}
           >
            <Text 
                style={{
                  textAlign: "center",
                  paddingHorizontal: 60,
                  paddingVertical: 8,
                  fontSize: 20,
                  fontWeight: '500',
                  color: themes[context.theme].text,
                  height: 'auto',
                  position: 'absolute',
                  zIndex: 251,
                  marginTop: 30,
              }}>{'Результаты сохранены'}</Text>
            </TouchableOpacity>
            <View
              style={{
                position: 'absolute',
                top: 100,
                bottom: 50,
                backgroundColor: themes[context.theme].allBackground,
                color: '#fff',
                height: 450,
                width: 300,
                left: (lay.window.width-280)/2,
                borderRadius: 15,
                zIndex: 200,
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}
              >
              {props.advice==='coffee'&&
                <LottieView
                  ref={animate => {
                    animation = animate;
                  }}
                  loop={true}
                  autoPlay={true}
                  style={{
                    width: 300,
                    height: 300,
                    backgroundColor: 'transparent',
                  }}
                  source={require('../assets/coffee.json')}
                  />
                }
                
              {props.advice==='openWindow'&&
                <LottieView
                  ref={animate => {
                    animation = animate;
                  }}
                  loop={true}
                  autoPlay={true}
                  style={{
                    width: 300,
                    height: 300,
                    backgroundColor: 'transparent',
                  }}
                  source={require('../assets/Rest_man.json')}
                  />
                }
              {props.advice==='ambulance'&&
                <LottieView
                  ref={animate => {
                    animation = animate;
                  }}
                  loop={true}
                  autoPlay={true}
                  style={{
                    width: 300,
                    height: 300,
                    backgroundColor: 'transparent',
                  }}
                  source={require('../assets/ambulance.json')}
                  />
                }
              {props.advice==='ok'&&
                <LottieView
                  ref={animate => {
                    animation = animate;
                  }}
                  loop={true}
                  autoPlay={true}
                  style={{
                    width: 300,
                    height: 300,
                    backgroundColor: 'transparent',
                  }}
                  source={require('../assets/heart_okay.json')}
                  />
                }
                <Text
                style={{
                      margin: 16,
                      width: 250,
                      fontSize: 16,
                      textAlign: 'center',
                      color: themes[context.theme].mainText,
                    }}>{adviceArray[props.advice].text}</Text>
                <TouchableOpacity
                  onPress={()=>{props.close()}}
                >
                  <Text
                    style={{
                      margin: 16,
                      height: 40,
                      width: 250,
                      borderRadius: 8,
                      padding: 8,
                      fontSize: 18,
                      textAlign: 'center',
                      textAlignVertical: 'center',
                      backgroundColor: themes[context.theme].buttonNextDialogColorOn,
                      color: themes[context.theme].mainText,
                    }}
                  >Хорошо</Text>
                </TouchableOpacity>
            </View>
          </View>
    )
}