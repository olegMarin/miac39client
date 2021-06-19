import { FontAwesome } from '@expo/vector-icons';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GiftedChat, Bubble, Send, Time, InputToolbar } from 'react-native-gifted-chat';
import 'dayjs/locale/ru'
import { lay } from '../constants/Layout';
import { Context } from '../functions/context'
import {themes} from '../constants/Colors'

import BackButton from '../components/BackButton'
import ContrastButton from '../components/ContrastButton'

export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
            messages: [
        {
          _id: 4,
          createdAt: new Date(2020, 2, 6, 20, 22, 0),
          system: true,
          controlPhoto: 1,
          photo: "",
        Base64: "",
        },{
          _id: 3,
          createdAt: new Date(2020, 2, 4, 20, 22, 0),
          system: true,
          controlPhoto: 2,
          photo: "",
        Base64: "",
        },
      {
        _id: 2,
        text: "Чуть не сдох, если честно))))))",
        createdAt: new Date(2020, 1, 29, 16, 18, 0),
        user: {
          _id: 2,
          name: 'Лёша',
          avatar: 'https://nashatynda.ru/img/avatars/avatar_512.png',
        },
      },{
        _id: 1,
        text: "Как твое самочувствие? С кровати встал?",
        createdAt: new Date(2020, 1, 29, 16, 15, 0),
        user: {
          _id: 1,
          name: 'Mия',
          avatar: 'https://nashatynda.ru/img/avatars/avatar_512.png',
        },
       },   
    ],
    };
  }
  static navigationOptions = ({ navigation }) => ({
    title: (navigation.state.params || {}).name,
  });



  get user() {
    return {
      name: this.context.user.name,
      email: this.context.user.email,
      avatar: this.context.avaURL,
      _id: this.context.user.id,
    };
  }

  renderSend = (props) => {
    return (
      <Send
        {...props}
      >
        <View style={{ marginRight: 20, marginBottom: 10 }}>
          <FontAwesome name={'send'} size={30} color={themes[this.context.theme].chatBubble1Text} />
        </View>
      </Send>
    );
  }
  renderBubble = (props) => {

    return (
      <Bubble
        {...props}
        textStyle={{
          left: {
            color: themes[this.context.theme].chatBubble2Text,
          },
          right: {
            color: themes[this.context.theme].chatBubble1Text,
            
          },
        }}
        wrapperStyle={{
          left: {
            backgroundColor:themes[this.context.theme].chatBubble2,
          },
          right: {
            backgroundColor:themes[this.context.theme].chatBubble1,
          },
        }}
      />
    );
  }

  renderTime= (props) => {

    return (
      <Time
        {...props}
        timeTextStyle={{
          left: {
            color: themes[this.context.theme].chatBubble2Text,
          },
          right: {
            color: themes[this.context.theme].chatBubble1Text,
          },
        }}
      ></Time>
    );
  }

  renderInputToolbar =(props) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          backgroundColor: 'transparent'
        }}
      ></InputToolbar>
    );
  }

  render() {
    return (
      <View
        style={{
          flexDirection: 'column',
          height: lay.window.height,
          width: lay.window.width
        }}
      >
        <BackButton
          press={()=>this.context.setScreen('main')}
          
        />
        <ContrastButton
          
        />
        <GiftedChat
          ref={(gc)=>{this.gc=gc}}
          messages={this.state.messages}
          onSend={(message)=>{
              this.setState({messages: [message[0], ...this.state.messages]})
            }}
          user={this.user}
          multiline = {true}
          renderSend={props => this.renderSend(props)}
          renderBubble={this.renderBubble}
          locale = {'ru'}
          renderTime={this.renderTime}
          renderInputToolbar ={this.renderInputToolbar }
          textInputStyle = {{
            marginBottom: 8,
            marginHorizontal: 16,
            width: lay.window.width,
            //height: 50,
            //borderColor: '#3023FA',
            padding: 8,
            paddingHorizontal: 16,
            borderRadius: 15,
            color: themes[this.context.theme].chatBubble1Text,
            backgroundColor:themes[this.context.theme].chatBubble1,
          }}
          placeholder="ваше сообщение"
        />
      </View>
    );
  }

  componentDidMount() {
    
  }

  componentWillUnmount() {
   
  }
  
}
Chat.contextType = Context;