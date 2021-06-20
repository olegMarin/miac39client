import React, {useContext, useState} from 'react';
import { Text, View, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import {Context} from "../functions/context"
import {themes} from "../constants/Colors"
import {lay} from "../constants/Layout"
import BackButton from "./BackButton"
import {styles} from "../constants/Styles"

export default function History(props) {
  
  const context = useContext(Context)
  const [val, setVal] = useState('')


 
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
              }}>{'Новая метка'}</Text>
            </TouchableOpacity>
            <View
              style={{
                position: 'absolute',
                top: 100,
                bottom: 50,
                backgroundColor: themes[context.theme].allBackground,
                color: '#fff',
                height: 200,
                width: 280,
                left: (lay.window.width-280)/2,
                borderRadius: 15,
                zIndex: 200,
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}
              >
                <TextInput
                  style={{ height: 40, 
                  marginTop: 80,
                          width: 250,
                          paddingHorizontal: 16,
                          fontSize: 18,
                          borderRadius: 8,
                          borderWidth: 2,
                          borderColor: themes[context.theme].mainText,
                          color: themes[context.theme].inputText,
                          backgroundColor: themes[context.theme].inputBackground, }}
                  onChangeText={text => setVal(text)}
                  value={val}
                />
                <TouchableOpacity
                  onPress={()=>{props.addTag(val)}}
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
                  >Сохранить</Text>
                </TouchableOpacity>
            </View>
          </View>
    )
}