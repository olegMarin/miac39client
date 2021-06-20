import React, {useContext} from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {Context} from "../functions/context"
import {themes} from "../constants/Colors"
import {lay} from "../constants/Layout"
import BackButton from "./BackButton"
import moment from 'moment';
import 'moment/locale/ru';

export default function History(props) {
  
  const context = useContext(Context)

//console.log(props.history)
 
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
              }}>{'История'}</Text>
            </TouchableOpacity>
            <ScrollView
              style={{
                position: 'absolute',
                top: 100,
                bottom: 50,
                backgroundColor: themes[context.theme].allBackground,
                color: '#fff',
                height: lay.window.height-150,
                width: 320,
                left: (lay.window.width-320)/2,
                borderRadius: 15,
                zIndex: 200,
              }}
              contentContainerStyle={{
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'center',}}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    borderEndColor: '#777',
                    marginTop: 8,
                  }}
                >
                  <Text
                  style={{width: 90, fontSize: 12,color: themes[context.theme].text}}
                  >время</Text>
                  <Text
                  style={{width: 50, fontSize: 12, textAlign: 'center' ,color: themes[context.theme].text}}
                  >верхнее</Text>
                  <Text
                  style={{width: 50, fontSize: 12,textAlign: 'center' ,color: themes[context.theme].text}}
                  >нижнее</Text>
                  <Text
                  style={{width: 35, fontSize: 12,textAlign: 'center' ,color: themes[context.theme].text}}
                  >пульс</Text>
                  <Text
                  style={{width: 30, fontSize: 12,textAlign: 'center' ,color: themes[context.theme].text}}
                  >o2</Text>
                  <Text
                  style={{width: 50, fontSize: 12,color: themes[context.theme].text}}
                  >метка</Text>
                </View>
                {
                  props.history.map((item, index)=>{
                    return(
                    <View
                      key={index}
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        borderEndColor: '#777',
                        marginTop: 8,
                      }}
                    >
                      <Text
                      style={{width: 90, fontSize: 12, color: themes[context.theme].text}}
                      >{moment(item.Unixtime*1000).format('lll')}</Text>
                      <Text
                      style={{width: 50, fontSize: 12,textAlign: 'center' , color: themes[context.theme].text}}
                      >{item.TopPress}</Text>
                      <Text
                      style={{width: 50, fontSize: 12,textAlign: 'center' , color: themes[context.theme].text}}
                      >{item.LowPress}</Text>
                      <Text
                      style={{width: 35, fontSize: 12,textAlign: 'center' , color: themes[context.theme].text}}
                      >{item.Pulse}</Text>
                      <Text
                      style={{width: 30, fontSize: 12,textAlign: 'center' , color: themes[context.theme].text}}
                      >{item.Saturation}</Text>
                      <Text
                      style={{width: 50, fontSize: 12, color: themes[context.theme].text}}
                      >{item.Tag}</Text>
                    </View>)
                  })
                }
            </ScrollView>
          </View>
    )
}