
import { StyleSheet } from 'react-native';
import {lay} from './Layout'

const tintColor = '#005462';

export const styles ={
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: lay.window.height,
    width: lay.window.width,
  },
  menu:{
      position: 'absolute',
      top: 40,
      right: 0,
      height: lay.window.height-260,
      width: 190,
      zIndex: 150,
    
    alignItems: 'flex-end',
    justifyContent: 'space-between',

  },
  text: {
    flex: 1,
    textAlignVertical: "center",
    textAlign: "center",
    fontFamily: 'Roboto-Bold',
    marginVertical: 10,
    fontSize: 18,
    color: '#1119',
  },
  textWarning: {
    fontFamily: 'Roboto-Bold',
    height: 40,
    textAlignVertical: "center",
    textAlign: "center",
    marginHorizontal: 30,
    marginVertical: 10,
    paddingHorizontal: 16,
    paddingVertical: 0,
    fontSize: 18,
    backgroundColor: "red",
    borderRadius: 10,
    color: '#fffd',
  }, 
  textInput: {
    height: 40,
    textAlign: "center",
    marginHorizontal: 30,
    marginVertical: 10,
    paddingHorizontal: 16,
    paddingVertical: 7,
    fontSize: 18,
    borderRadius: 16,
    color: tintColor,
    borderColor: tintColor,
    borderWidth: 2,
  },
  tabRowText: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 8,
    fontFamily: 'Roboto-Bold',
    alignItems: "center"
  },
  infoblock: {
    marginTop: 40,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 30,
    borderRadius: 15,
    overflow: 'hidden',
  },
  flex1: {
    flex: 1
  },
  buttonText: {
    textAlign: 'center',
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#999999'
  },
  simpleTextInput: {
    height: 33,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#0005',
    fontSize: 17,
    padding: 6,
  },
  simpleText: {
    color: '#888',
    fontSize: 16,
    padding: 4,
    marginTop: 5,
    marginBottom: 5
  },
  settSlide:{
    height: 200,
    width: lay.window.width-190,
    paddingLeft: 16,
  },
    titleGradient: {
      flex: 1,
      //position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      backgroundColor: 'transparent',
      //height: 200,
    },
    titleTopGradient: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: -2,
      backgroundColor: 'transparent',
      height: 60,
      zIndex: 100,
    },
    volumeBottomGradient: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: -2,
      backgroundColor: 'transparent',
      height: 50,
      zIndex: 100,
    },
    volumeTopGradient45: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      backgroundColor: 'transparent',
      height: 15,
      zIndex: 100,
    },
    volumeBottomGradient45: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'transparent',
      height: 15,
      zIndex: 100,
    },
    title: {
      paddingTop: 10,
      fontSize: 30,
      color: 'white',
    },
    subtitle: {
      paddingTop: 5,
      fontSize: 20,
      color: 'white',
    },
    buttonCamera: {
      position: "absolute",
      width: 48,
      height: 48,
      zIndex: 4,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    registrationText: {
      textAlign: "center",
      paddingHorizontal: 60,
      paddingVertical: 30,
      fontSize: 18,
      height: 'auto',
      marginTop: 80,
    }
}