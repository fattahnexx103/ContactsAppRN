import React from 'react';
import { StyleSheet, Image, Text, View, ScrollView, TouchableOpacity, Linking, Platform, Alert, AsyncStorage } from 'react-native';

import {Card, CardItem} from 'native-base';
import {Entypo} from '@expo/vector-icons';
import MatIcon from 'react-native-vector-icons/MaterialIcons';

export default class ViewContactScreen extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      firstName: 'zzDum',
      lastName: 'Dum',
      phoneNumber: '123',
      email: 'sdf@f',
      address: '1 1 v',
      key: '3132321'
    }
  }
  //Gives name to the title
  static navigationOptions = {
    title: 'View Contact'
  }

  componentDidMount(){
    let {navigation} = this.props;
    navigation.addListener('willFocus', () =>{
      //get the key from navigation
      let key = this.props.navigation.getParam('key','');

      //use key to populate the state
      this.getContact(key);
    });
  };

  //Platform specific code for opening contact on phone app
  callAction = (phone) =>{
    let phoneNumber = phone;
    if(Platform.OS !== 'android'){
      //ios
      phoneNumber = `telpromt: ${phone}`;
    }else{
      //android
      phoneNumber = `tel:${phone}`;
    }
    Linking.canOpenURL(phoneNumber) //can it open the app using the phoneNumber
    .then((supported) =>{
      if(!supported){
        Alert.alert("Phone number is available");
      }else{
        return Linking.openURL(phoneNumber); //open the app using the phone
      }
    })
    .catch((error) =>{
      console.log("OPEN APP ERR -- " + error);
    })
  }

  //sms on messaging app
  smsAction = (phone) =>{
    let phoneNumber = phone;
    phoneNumber = `sms:${phone}`;

    Linking.canOpenURL(phoneNumber) //can it open the app using the phoneNumber
    .then((supported) =>{
      if(!supported){
        Alert.alert("Phone number is available");
      }else{
        return Linking.openURL(phoneNumber); //open the app using the phone
      }
    })
    .catch((error) =>{
      console.log("OPEN APP ERR -- " + error);
    })
  }

  //get the contact based on key
  getContact = async (key) =>{

      await AsyncStorage.getItem(key)
      .then((contactjsonString) =>{
        let contact = JSON.parse(contactjsonString); //convert string back to json
        contact['key'] = key;
        this.setState(contact); //make contact the state varaible
      })
      .catch((error) =>{
        console.log("Getting contact --" + error);
      })
  }

  editContact = (key) =>{
    this.props.navigation.navigate('Edit',{
      key:key
    });
  }

  render(){
    return (
      <ScrollView style={styles.cardContainer}>
        <View style={styles.contactCard}>
          <MatIcon
          name='person'
          size={300}
          color='#fdd835'
            />
            <Text style={{color: 'white'}}>
              Whats up this is Jim..
              Whats up this is Jim..
              Whats up this is Jim..
              Whats up this is Jim..
            </Text>
        </View>
      </ScrollView>
    );
 }
}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  contactCard:{
    flexDirection: 'row',
    flex: 1,
    backgroundColor: 'orange',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  }
});
