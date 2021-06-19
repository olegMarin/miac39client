import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Context} from "./functions/context"
import {themes} from "./constants/Colors"
import {styles} from "./constants/Styles"
import ThemedListItem from 'react-native-elements/dist/list/ListItem';
import Main from "./screens/Main"
import Chat from "./screens/Chat"
import LogIn from './screens/logIn/LogIn'
import PhoneLogin from './screens/logIn/PhoneLogin'
import { AppearanceProvider, Appearance } from 'react-native-appearance';

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {},
      user1:{
        id: 2,
        name: 'oleg'
      },
      setUser: this.setUser,
      theme: 'light',
      toggleTheme: this.toggleTheme,
      screen: 'PhoneLogin',
      //screen: 'main',
      setScreen: this.setScreen,
    }
  }

  componentDidMount() {
    let gColorScheme = Appearance.getColorScheme()
    if (gColorScheme == "light" || gColorScheme == "dark"){
      this.setState({ theme: gColorScheme})
    }
    if(!this.state.user.id){
      AsyncStorage.getItem("user").then((idt) => {
        if (idt != "" && idt != null && idt != undefined) {
          this.setState({ user: JSON.parse(idt),  screen: 'main'})
        }else{
          this.setState({ screen: 'PhoneLogin' })
        }
      })
    }
    
  }

  setUser=(u)=>{
    this.setState({user: u})
  }

  setScreen=(screenParameter)=>{
    this.setState({screen: screenParameter})
  }

  axiUpdate=(screenParameter, tok)=>{
    //this.setState({ screen: 'wait'})
    axi("loginAdmin.php", null, { token: tok}).then((result) => {
      if (result.type == 'approved') {
        this.setState({screen: screenParameter})
      } else {
        this.setState({ screen: 'LogIn' })
      }
    }, (e) => { console.log(e) })
  }
  
toggleTheme = () =>{
  this.setState({theme: this.state.theme==='light'?'dark':'light'})
}

  render(){
    return (
      <AppearanceProvider>
        <Context.Provider value={this.state}>
          <View 
            style={{...styles.container,
          backgroundColor: themes[this.state.theme].allBackground,}}>
            {this.state.screen==='main'?
              <Main/>:
              <>
                  {this.state.screen==='PhoneLogin'?
                    <PhoneLogin/>:<Chat/>
                  }
              </>
            }
            
          </View>
        </Context.Provider>
      </AppearanceProvider>
    );
  }
}