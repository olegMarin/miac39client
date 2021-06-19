import React, { useContext, useState, useEffect } from "react";
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import {Context} from "../functions/context"
import {lay} from '../constants/Layout'
import Menu from '../components/menu/Menu'
import ButtonSend from '../components/menu/ButtonSend'
import {themes} from "../constants/Colors"

import {styles} from "../constants/Styles"
import { Button } from "react-native";
import ValuePicker from "../components/ValuePicker";
import { Camera } from 'expo-camera';
import {FontAwesome, MaterialIcons} from '@expo/vector-icons'

export default function Main(props) {

  let dataSourceHightValue = [] 

  let i = 60
  while (i<241){
    dataSourceHightValue=[...dataSourceHightValue, i]
    i++
  }
  
const dataSourceLowValue = new Array(100).fill({ label: null }).map((item, id) => {
  return id+40
});

const dataSourcePuls = new Array(100).fill({ label: null }).map((item, id) => {
  return id+30
});

  const context = useContext(Context)
  const [hightValue, setHightValue] = useState(120)
  
  const [lowValue, setLowValue] = useState(70)
  
  const [pulse, setPulse] = useState(60)

  const [process, setProcess] = useState(false)

  const [hasCameraPermission, setHasCameraPermission]=useState(null)
const [pic, setPic] = useState(null)
let cameraRef = React.useRef()
const [cameraState, setCameraState] = useState(false)
const [FlashMode, setFlashMode] = useState(false)
const [cameraType, setCameraType]= useState('back')
const [messages, setMessages] = useState()

const _getPhoto = async () => {
    if (cameraRef) {
      let photo = await cameraRef.takePictureAsync({
        quality: 0.3,
        base64: true,
      });
      setPic(photo)
    }
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasCameraPermission(status === 'granted');
    })();
  }, []);

  return (
      <View 
          style={{flex: 1,
                    alignItems: 'flex-start',
                    justifyContent: 'space-around',
                    backgroundColor: themes[context.theme].allBackground,
                    width: lay.window.width,
                    height: lay.window.height,
                    paddingTop: 40
                  }}>
          <Menu 
            style={styles.menu} 
            hasCameraPermission={hasCameraPermission}
            setCameraState={()=>setCameraState(!cameraState)}
          ></Menu>
          <ButtonSend 
              press={()=>{
                
                setProcess(!process)
                }}
              process = {process}
              
            />

          <ValuePicker
          //style={{marginTop: 28}}
            title={'верхнее давление'}
            dataSource={dataSourceHightValue}
            selectedIndex={hightValue-60}
            value={hightValue}
            setValue={(val)=>{setHightValue(val)}}
          />
            <ValuePicker
            title={'нижнее давление'}
            dataSource={dataSourceLowValue}
            selectedIndex={lowValue-40}
            value={lowValue}
            setValue={(val)=>{setLowValue(val)}}
          />
           <ValuePicker
            title={'пульс'}
            dataSource={dataSourcePuls}
            selectedIndex={pulse-30}
            value={pulse}
            setValue={(val)=>{setPulse(val)}}
          />
           {cameraState &&
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
            <Text 
                style={{
                  textAlign: "center",
                  paddingHorizontal: 60,
                  paddingVertical: 8,
                  fontSize: 18,
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
                        setCameraState(false)
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
        }
      </View>
  );
}
