import React, {useContext} from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {Context} from "../functions/context"
import {themes} from "../constants/Colors"
import {lay} from "../constants/Layout"
import BackButton from "./BackButton"

export default function History(props) {
  
  const context = useContext(Context)


 
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
                width: 300,
                left: (lay.window.width-300)/2,
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
                    borderEndColor: '#777'
                  }}
                >
                  <Text
                  style={{width: 50, fontSize: 12,color: themes[context.theme].text}}
                  >время</Text>
                  <Text
                  style={{width: 50, fontSize: 12,color: themes[context.theme].text}}
                  >верхнее</Text>
                  <Text
                  style={{width: 50, fontSize: 12,color: themes[context.theme].text}}
                  >нижнее</Text>
                  <Text
                  style={{width: 50, fontSize: 12,color: themes[context.theme].text}}
                  >пульс</Text>
                  <Text
                  style={{width: 50, fontSize: 12,color: themes[context.theme].text}}
                  >кислород (%)</Text>
                  <Text
                  style={{width: 50, fontSize: 12,color: themes[context.theme].text}}
                  >метка</Text>
                </View>
                {
                  props.history.map((item, index)=>{
                    <View
                      key={index}
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        borderEndColor: '#777'
                      }}
                    >
                      <Text
                      style={{width: 50, fontSize: 12, color: themes[context.theme].text}}
                      >{item.unixtime}</Text>
                      <Text
                      style={{width: 50, fontSize: 12}}
                      >{item.topPress}</Text>
                      <Text
                      style={{width: 50, fontSize: 12}}
                      >{item.lowPress}</Text>
                      <Text
                      style={{width: 50, fontSize: 12}}
                      >{item.pulse}</Text>
                      <Text
                      style={{width: 50, fontSize: 12}}
                      >{item.saturation}</Text>
                      <Text
                      style={{width: 50, fontSize: 12}}
                      >{item.tag}</Text>
                    </View>
                  })
                }
            </ScrollView>
          </View>
    )
}