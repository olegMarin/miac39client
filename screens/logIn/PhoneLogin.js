import React from 'react';
import { Text, View, ScrollView, Platform, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axi from '../../functions/axiosf'
import { Context } from '../../functions/context'
import { themes } from '../../constants/Colors';
import { styles } from '../../constants/Styles'; 
import PhoneMaskInput from '../../components/PhoneMaskInput/PhoneMaskInput';
import { Ionicons } from '@expo/vector-icons';
import BackButton from '../../components/BackButton'
import ContrastButton from '../../components/ContrastButton'
import { CheckBox, ButtonGroup } from 'react-native-elements'

export default class PhoneLogin extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      num: '+7',
      numExist: true,
      numSave: false,
      pinView: false,
      pin: '',
      pinFull: false,
      pinWrong: false,
      pinOk: false,
      step: 1,
      sum: 1,
      idc: 0,
      recurentRefresh: 0,
      snils:'',
      isIrrationalEating: false,
      age: "",
      fat: false,
      female: false,
      selectedIndexMale: 3,
      smoking: false,
      diabetes: false,
      weight: 0,
      research: false,
      leftVentricularHypertension: false,
      thickeningCarotidArteryWall: false,

    }
  }

  updateIndex = (selectedIndex) =>{
    this.setState({selectedIndexMale: selectedIndex, female: selectedIndex})
  }
  
  _setNum =(val)=>{
    this.setState({ 
      num: val,
      numExist: false,
      numSave: false,
      pinView: false,
      pin: '',
      pinFull: false,
      pinWrong: false,
      pinOk: false,
      token: '',
    })
    if(val.length>15){
      axi("","sendSMS", { phone: val }).then((result) => {
        if (result.type == 'approved'){
          this.setState({ numExist: true })
        }
        if (result.type == 'new'){
          this.setState({ numExist: false })
        }
        this.setState({ pinView: result.queue })
        this.pinInputRef.focus()
      }, (e) => { console.log(e) })
    }else{
      this.setState({ pinView: false })
    }
  }

  _setPin = (text) => {
    if (text.length <= 4) {
      this.setState({ pin: text })
    }
    if (text.length == 4) {
      this.setState({ pinFull: true })
      axi("",'pinCheck', { pin: text, phone: this.state.num }).then((result) => {
        if (result.type == 'approved') {
          this.setState({ pinWrong: false, pinOk: true, token: result.token })
          this._logIn(result.token)
        } else {
          this.setState({ pinWrong: true })
        }
      }, (e) => { console.log(e) })
    } else {
      this.setState({ pinFull: false })
    }
  }

  _logIn = async (t) => {
          //записи аккаунта введённого телефона в контекст и в память телефона
          await  AsyncStorage.setItem("userId", t)
          this.context.setUser({id: 2,
                                name: 'oleg',
                                token: t,
                                phone: this.state.num
                              })
          await  AsyncStorage.setItem("phone", this.state.num)
          //вход выполнен карта оплаты есть
         this.context.setScreen('main') 
      }


  render() {
    const buttons = ['Мужчина', 'Женщина']
    return (
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: themes[this.context.theme].allBackground,
        }}
        contentContainerStyle={{
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',}}
        >
        <ContrastButton/>
        {this.state.step < 3 &&
        <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
          backgroundColor: themes[this.context.theme].allBackground,
        }}>
{/*     <TouchableOpacity
          onPress={pass => {
            this.context.setScreen('LogIn')
          }}
          style={{
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
          
          >войти по токену</Text>
        </TouchableOpacity> 
*/}
        <Text 
          style={{
            ...styles.registrationText,
            color: themes[this.context.theme].text,
        }}>
          {'Введите номер телефона'}
        </Text>
          <PhoneMaskInput
            flagSize={'big'}
            valueN={this.state.num}
            placeholder={'+7 (000) 000 00 00'}
            onChange={(val) => this._setNum(val)}
            autoDetectCountry={true}
            style={{
              color: themes[this.context.theme].text,
              backgroundColor: themes[this.context.theme].inputBackground,
              fontFamily: 'Roboto-Bold',
              marginTop: 20,
            }}
          />
          {this.state.pinView &&
            <Text style={{
              color: themes[this.context.theme].text, 
              textAlignVertical: "center", 
              padding: 10,
              paddingHorizontal: 35,
              fontFamily: 'Roboto-Bold',
              backgroundColor: 'transparent'
              }}>
                {this.state.numExist &&'Этот номер уже зарегистрирован в системе, '}{'введите код подтверждения #'+this.state.pinView+' из SMS:'}
            </Text>
          }
          <TextInput 
          style={{
            ...styles.textInput,
            backgroundColor: themes[this.context.theme].inputBackground,
                fontSize: 60, 
                width: 200,
                color: this.state.pinWrong ? '#b11002' :themes[this.context.theme].text, 
                borderBottomColor: this.state.pinWrong ? '#b11002' : themes[this.context.theme].text,
                height: this.state.pinView? 100:0,
                borderRadius: this.state.pinView ? 8 : 0,
                borderWidth: this.state.pinView ? 2 : 0,
                paddingHorizontal: this.state.pinView ? 16 : 0,
                paddingVertical: this.state.pinView ? 7 : 0,
              }}
              ref={(c)=>this.pinInputRef=c}
              placeholder={'____'}
              onChangeText={text => this._setPin(text)}
              value={this.state.pin}
              maxLength={4}
              keyboardType='numeric'
          />
          {this.state.numExist&&
            <>
              <Text 
                style={{
                  ...styles.registrationText,
                  color: themes[this.context.theme].text,
              }}>
                {'Введите СНИЛС'}
              </Text>
              <PhoneMaskInput
                flagSize={'none'}
                valueN={this.state.snils}
                placeholder={'000-000-000 00'}
                mask={'999-999-999 99'}
                onChange={(val) => this.setState({snils: val}) }
                autoDetectCountry={false}
                style={{
                  color: themes[this.context.theme].text,
                  backgroundColor: themes[this.context.theme].inputBackground,
                  marginTop: 20,
                }}
              />
              <ButtonGroup
                  onPress={this.updateIndex}
                  selectedIndex={this.state.selectedIndexMale}
                  buttons={buttons}
                  containerStyle={{height: 40, width: 250,borderRadius: 8}}
                  buttonStyle={{backgroundColor: themes[this.context.theme].chatBubble1, 
                                borderColor: themes[this.context.theme].inputBackground}}
                  textStyle={{color: themes[this.context.theme].chatBubble1Text,}}             
                  selectedTextStyle={{color: themes[this.context.theme].chatBubble2Text}}
                  selectedStyle={{backgroundColor: themes[this.context.theme].chatBubble2}}
                />
              <Text 
                style={{
                  ...styles.registrationText,
                  color: themes[this.context.theme].text,
              }}>
                {'Сколько Вам лет?'}
              </Text>
              <PhoneMaskInput
                flagSize={'none'}
                valueN={this.state.age}
                placeholder={'лет'}
                mask={'99'}
                onChange={(val) => this.setState({age: val}) }
                autoDetectCountry={false}
                style={{
                  color: themes[this.context.theme].text,
                  backgroundColor: themes[this.context.theme].inputBackground,
                  marginTop: 20,
                }}
              />
              <Text 
                style={{
                  ...styles.registrationText,
                  color: themes[this.context.theme].text,
              }}>
                {'Какой у Вас вес?'}
              </Text>
              <PhoneMaskInput
                flagSize={'none'}
                valueN={this.state.weight}
                placeholder={'килограмм'}
                mask={'999'}
                onChange={(val) => this.setState({weight: val}) }
                autoDetectCountry={false}
                style={{
                  color: themes[this.context.theme].text,
                  backgroundColor: themes[this.context.theme].inputBackground,
                  marginTop: 20,
                }}
              />
              <CheckBox
                center
                title='нерационально питаетесь?'
                checked={this.state.isIrrationalEating}
                onPress={()=>this.setState({isIrrationalEating: !this.state.isIrrationalEating})}
                containerStyle={{height: 40, 
                  width: 250,
                  borderRadius: 8, 
                  backgroundColor: themes[this.context.theme].chatBubble1}}
              />
              <CheckBox
                center
                title='есть ли у Вас ожирение?'
                checked={this.state.fat}
                onPress={()=>this.setState({fat: !this.state.fat})}
                containerStyle={{height: 40, 
                  width: 250,
                  borderRadius: 8, 
                  backgroundColor: themes[this.context.theme].chatBubble1}}
              />
              <CheckBox
                center
                title='курите?'
                checked={this.state.smoking}
                onPress={()=>this.setState({smoking: !this.state.smoking})}
                containerStyle={{height: 40, 
                  width: 250,
                  borderRadius: 8, 
                  backgroundColor: themes[this.context.theme].chatBubble1}}
              />
              <CheckBox
                center
                title='страдаете сахарным диабетом?'
                checked={this.state.diabetes}
                onPress={()=>this.setState({diabetes: !this.state.diabetes})}
                containerStyle={{height: 40, 
                  width: 250,
                  borderRadius: 8, 
                  backgroundColor: themes[this.context.theme].chatBubble1}}
              />
              <CheckBox
                center
                title='проводилось ли исследование сердца и сосудов?'
                checked={this.state.research}
                onPress={()=>this.setState({research: !this.state.research})}
                containerStyle={{height: 40, 
                  width: 250,
                  borderRadius: 8, 
                  backgroundColor: themes[this.context.theme].chatBubble1}}
              />
            </>
            

          }

          {this.state.pinOk && !this.state.pinWrong &&
            <TouchableOpacity
              onPress={() => {
                this._logIn()
              }}>
              <Text
                style={{
                  ...styles.textInput,
                  backgroundColor: themes[this.context.theme].buttonNextColor,
                  color: themes[this.context.theme].noticeText,
                  elevation: 4,
                  height: 'auto',
                  fontFamily: 'Roboto-Bold',
                  borderWidth: 0,
                }}>
                  {this.state.numExist ? 'Войти' : "Зарегистрироваться"}
              </Text>
            </TouchableOpacity>  
          }
        </View>
        }

      </ScrollView>
    );
  }

}
PhoneLogin.contextType = Context;