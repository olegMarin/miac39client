import React, {useContext, useState} from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {Context} from "../functions/context"
import {themes} from "../constants/Colors"
import {lay} from "../constants/Layout"
import BackButton from "./BackButton"
import {styles} from "../constants/Styles"
import {FontAwesome, MaterialIcons} from '@expo/vector-icons'

import { Camera } from 'expo-camera';

export default function CameraScreen(props) {
  
  const context = useContext(Context)


const [pic, setPic] = useState(null)
let cameraRef = React.useRef()
const [FlashMode, setFlashMode] = useState(false)
const [cameraType, setCameraType]= useState('back')

const _getPhoto = async () => {
    if (cameraRef) {
      let photo = await cameraRef.takePictureAsync({
        quality: 0.3,
        base64: true,
      });
      setPic(photo)
    }
  };

 
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
              press={()=>props.close()}
            />
            <Text 
                style={{
                  textAlign: "center",
                  paddingHorizontal: 60,
                  paddingVertical: 8,
                  fontSize: 18,
                  fontWeight: '500',
                  color: themes[context.theme].text,
                  height: 'auto',
                  position: 'absolute',
                  zIndex: 251,
                  marginTop: 30,
              }}>{'разместите дисплей тонометра в рамку внизу и сфотографируйте'}</Text>
            <View
              style={{
                position: 'absolute',
                top: 150,
                bottom: 50,
                backgroundColor: '#444',
                color: '#fff',
                height: 381,
                width: 286,
                left: (lay.window.width-286)/2,
                borderRadius: 15,
                zIndex: 200,
                justifyContent: "center",
                alignItem: "center",
                overflow: 'hidden',
              }}>
                {!pic &&
                    <Camera style={{
                      height: 381,
                      width: 286, 
                      borderRadius: 15,}} 
                      type={cameraType}
                      ref={ref => {
                        cameraRef = ref;
                      }}
                      //ratio={"1:1"}
                      >
                    </Camera>
                }
                {pic &&
                    <View style={{
                      height: 381,
                      width: 286,
                      borderRadius: 15,
                    }}>
                      <ImageBackground
                        style={{width: "100%", height: "100%"}}
                        source={{ uri: pic.uri}}
                      />                    
                    </View>
                  }
                  {/* закрыть окно камеры */}
                  <TouchableOpacity
                    onPress={() => {
                        props.close()
                    }}
                    style={{ ...styles.buttonCamera, bottom: 0, left: 8}}
                  >
                    <FontAwesome name={'remove'} size={26} color="#fffa" />
                  </TouchableOpacity>
                {!pic &&
                    <TouchableOpacity
                      onPress={() => {
                        _getPhoto()
                      }}
                      style={{ ...styles.buttonCamera, bottom: 0, right: 119 }}
                    >
                      <FontAwesome name={'camera'} size={26} color="#fffa" />
                    </TouchableOpacity>
                }
                {!pic &&           
                  <TouchableOpacity
                    onPress={() => {
                      setFlashMode(
                          FlashMode === Camera.Constants.FlashMode.on
                            ? Camera.Constants.FlashMode.off
                            : Camera.Constants.FlashMode.on,
                      )
                    }}
                    style={{ ...styles.buttonCamera, top: 0, right: 64 }}
                  >
                    <MaterialIcons name={(FlashMode === Camera.Constants.FlashMode.on) ? 'flash-on' : 'flash-off'} size={26} color="#fffa" />
                  </TouchableOpacity>
                }{!pic &&
                  <TouchableOpacity
                    onPress={() => {
                    setCameraType(                        
                      cameraType === Camera.Constants.Type.back
                          ? Camera.Constants.Type.front
                          : Camera.Constants.Type.back)
                    }}
                    style={{ ...styles.buttonCamera, top: 0, right: 8 }}
                  >
                    <MaterialIcons name={(cameraType === Camera.Constants.Type.front) ? 'camera-rear' : 'camera-front'} size={26} color="#fffa" />
                  </TouchableOpacity>
                }
                {pic &&
                  <TouchableOpacity
                    onPress={() => {
                      setPic(null)
                    }}
                    style={{ ...styles.buttonCamera, bottom: 0, right: 119 }}
                  >
                    <FontAwesome name={'undo'} size={26} color="#fffa" />
                  </TouchableOpacity>
                }{pic &&
                  <TouchableOpacity
                    onPress={() => {
                      let newMsg = messages
                        for (let i = 1; i < newMsg.length; i++)
                        {
                            newMsg[i].photo = pic.uri
                            newMsg[i].Base64 = pic.base64 
                            newMsg[i]._id = newMsg[i]._id+"pic"
                            newMsg[i].controlPhoto = 3
                        }
                      //тут пишем сообщение для отправки
                      //this.setState({ camera: false, messages: [...newMsg, { system: true, rerender: true}], messIdNewPhoto: this.state.msgGoId })
                      console.log("press", pic.uri)
                    }}
                    style={{ ...styles.buttonCamera, bottom: 0, right: 8 }}
                  >
                    <FontAwesome name={'check'} size={26} color="#fffa" />
                  </TouchableOpacity>
                }
            </View>
          </View>
    )
}