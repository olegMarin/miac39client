import React from 'react';
import { Text, ScrollView,  View, TouchableOpacity, TextInput} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { themes } from '../../constants/Colors'; 
import { Context } from '../../functions/context'
import { styles } from '../../constants/Styles';
import axi from '../../functions/axiosf'
import moment from 'moment';
import 'moment/locale/ru';
import ContrastButton from '../../components/ContrastButton'

export default class LogIn extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      id: "",
      pass: "",
      err: null,
    }
  }

  _login() {
    axi("loginBar.php", 'loginBar' ,{ "id": this.state.id, "pass": this.state.pass }).then((result) => {
      //this.setState(result)
      console.log(result)
      if (result == 1) { 
        //this.context.toggleUserID(this.state.id)
        //AsyncStorage.setItem( 'userId', this.state.id )
        //this.props.navigation.navigate('Home') 
      }
      else {this.setState({err: "Неверный ID или пароль"})}
    }, (e) => { console.log(e) })
  }


  render() {
    return (
      <View 
      style={{
        paddingTop: 0,
        flex: 1,
        flexDirection: "column",
          justifyContent: 'flex-start',
          alignItems: 'center',
          backgroundColor: themes[this.context.theme].allBackground,
      }}
      >
       <ContrastButton/>
        <TouchableOpacity
          onPress={pass => {
            this.context.setScreen('PhoneLogin')
          }}
          style={{
            
          marginTop: 70,
            marginVertical: 15,
            height: 50,
            flexDirection: "column",
            backgroundColor: themes[this.context.theme].buttonNextDialogColorOn,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 30,
            borderRadius: 15,
            overflow: 'hidden',
            elevation: 4}}>
          <Text
            style={{
              color: themes[this.context.theme].menuIcon,
            }}
          
          >войти по номеру телефона</Text>
        </TouchableOpacity>
        <TextInput style={{
          marginVertical: 15,
          height: 50,
          flexDirection: "column",
          //justifyContent: "flex-start",
          backgroundColor: themes[this.context.theme].Background1,
          justifyContent: "center",
          alignItems: "center",
          marginHorizontal: 30,
          paddingHorizontal: 15,
          borderRadius: 15,
          overflow: 'hidden',
        }}
          onChangeText={id => {
            this.setState({ id: id });
          }}
          placeholder={"ID"}
          underlineColorAndroid="transparent"
          value={this.state.id}
        />

        <TextInput style={{
          marginVertical: 15,
          height: 50,
          flexDirection: "column",
          //justifyContent: "flex-start",
          backgroundColor: themes[this.context.theme].Background1,
          justifyContent: "center",
          alignItems: "center",
          marginHorizontal: 30,
          paddingHorizontal: 15,
          borderRadius: 15,
          overflow: 'hidden',
        }} 
          onChangeText={pass => {
            this.setState({ pass: pass });
          }}
          secureTextEntry
          placeholder={"пароль"}
          underlineColorAndroid="transparent"
          value={this.state.pass}
        />
        <TouchableOpacity
          onPress={pass => {
            this._login()
          }}
          style={{
            marginVertical: 15,
            height: 50,
            flexDirection: "column",
            backgroundColor: themes[this.context.theme].Background2,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 30,
            borderRadius: 15,
            overflow: 'hidden',
            elevation: 4}}>
          <Text>Войти</Text>
        </TouchableOpacity>
        {this.state.err &&
          <Text style={styles.textWarning}>{this.state.err}</Text>
        }
        <View style={{
          height: 50,
        }}></View>

      </View>

    )
  }
}

LogIn.contextType = Context;
