import React, { useContext, useState, useEffect } from "react";
import { ImageBackground, Text, TouchableOpacity, View, Alert, ScrollView } from 'react-native';
import {Context} from "../functions/context"
import {lay} from '../constants/Layout'
import Menu from '../components/menu/Menu'
import ButtonSend from '../components/menu/ButtonSend'
import {themes} from "../constants/Colors"

import {styles} from "../constants/Styles"
import ValuePicker from "../components/ValuePicker";
import axi from '../functions/axiosf'
import { Camera } from 'expo-camera';
import History from "../components/History";
import CameraScreen from "../components/CameraScreen";
import NewTag from "../components/NewTag"
import { MaterialCommunityIcons } from '@expo/vector-icons';


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

const dataSourceSaturation = new Array(11).fill({ label: null }).map((item, id) => {
  return id+90
});

  const context = useContext(Context)
  const [hightValue, setHightValue] = useState(120)
  
  const [lowValue, setLowValue] = useState(70)
  
  const [pulse, setPulse] = useState(60)
  
  const [saturation, setSaturation] = useState(98)

  const [process, setProcess] = useState(false)

  const [hasCameraPermission, setHasCameraPermission]=useState(null)

  const [historyScreen, setHistoryScreen] = useState(false)

  const [tags, setTags] = useState(['сон', 'бег', 'подъём на этаж', 'маршрутка'])

  const [teg, setTag] = useState('')

  const [newTegScreen, setNewTegScreen] = useState(false)

const [cameraState, setCameraState] = useState(false)
const [messages, setMessages] = useState()


const _historyRead=()=>{
  axi("",'getHistory', { 
            token: context.user.token
          }).then((result) => {
            if(result!==null){
                setHistory(result)
            }
      }, (e) => { console.log(e) })
  setHistoryScreen(true)
}

const [history, setHistory] = useState([])

  const _sendData = () => {
    setProcess(true)
    axi("",'setData', { 
            token: context.user.token, 
            topPress: +hightValue,
            lowPress: +lowValue,
            pulse: +pulse,
            saturation: +saturation,
            unixtime: (+new Date())/1000,
            tag: teg,
          }).then((result) => {
        if (result.type == 'done') {
          //Alert.alert('данные отправлены')
          setProcess(false)
        } else {
        }
      }, (e) => { console.log(e) })
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
            setHistoryScreen={()=>_historyRead()}
          ></Menu>
          <ButtonSend 
              press={()=>{
                _sendData()
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
          <ValuePicker
            title={'сатурация (%)'}
            dataSource={dataSourceSaturation}
            selectedIndex={saturation-90}
            value={saturation}
            setValue={(val)=>{setSaturation(val)}}
          />
          <ScrollView
            style={{
              position: 'absolute',
              bottom: 150,
              right: 0,
              width: 190,
              height:lay.window.height-490,
                    zIndex: 110,  
            }}
            contentContainerStyle={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center',
              flexWrap: 'wrap',
              paddingVertical: 16
               }}
          >
            {
              tags.map((item, index)=>{
                return(
                <TouchableOpacity
                  key={index}
                  style={{
                    borderRadius: 50,
                    paddingHorizontal: 8,
                    margin: 4,
                    //height: 30,
                    backgroundColor: (item===teg)?themes[context.theme].chatBubble2:themes[context.theme].chatBubble1,
                  }}
                  onPress={()=>setTag(item)}
                >
                    <Text
                      style={{
                        borderRadius: 50,
                        fontSize: 18,
                        //height: 30,
                        color: (item===teg)?themes[context.theme].chatBubble2Text:themes[context.theme].chatBubble1Text,
                    }}>
                      {item}
                    </Text>
                </TouchableOpacity>
                )
              })
            }
            <TouchableOpacity
                  style={{
                    borderRadius: 50,
                    margin: 4,
                    //height: 50,
                    backgroundColor: themes[context.theme].chatBubble2,
                  }}
                  onPress={()=>setNewTegScreen(true)}
                >
                <MaterialCommunityIcons 
                  name="plus-circle" 
                  size={30} 
                  color={themes[context.theme].chatBubble2Text} 
                  style={{
                        borderRadius: 50,
                    }}/>
            </TouchableOpacity>
          </ScrollView>
            {historyScreen&&
              <History
                history={history}
                close={()=>{setHistoryScreen(false)}}
              />
            }
           {cameraState &&
              <CameraScreen
                close={()=>setCameraState(false)} 
                setTop={(v)=>setHightValue(v)}
                setLow={(v)=>setLowValue(v)}
                setPulse={(v)=>setPulse(v)} 
              />
          }
          {newTegScreen&&
            <NewTag
              addTag={(val)=>{
                setTags([val, ...tags])
                setNewTegScreen(false)
                }}
              close={()=>setNewTegScreen(false)}
            />
          }
      </View>
  );
}
