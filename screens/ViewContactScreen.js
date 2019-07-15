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

  deleteContact = (key) =>{
    Alert.alert(
      'Delete Contact?',
      `${this.state.firstName} ${this.state.lastName}`,
      [
        {
          text: 'Cancel', onPress:() => console.log('Cancel Hit')
        },
        {
          text: 'Delete',
          onPress: async () =>{
            await AsyncStorage.removeItem(key)
            .then( () =>{
              this.props.navigation.goBack();
            })
            .catch((error) =>{
              console.log("Deletion error --" + error );
            });
          }
        },
      ]
    )
  }

  render(){
    return (
      <ScrollView style={styles.cardContainer}>
        <View style={styles.contactIcon}>
          <MatIcon
          name='person'
          size={120}
          color='#fdd835'
            />
        </View>
        <Text style={styles.contactName}>{this.state.firstName} {this.state.lastName}</Text>
        <View style={styles.iconContact}>
          <TouchableOpacity
            onPress={() =>{this.callAction(this.state.phoneNumber)}}
          >
            <MatIcon name='phone' size={50} color='black' />
          </TouchableOpacity>
          <Text style={styles.contactName}>{this.state.phoneNumber}</Text>
          <TouchableOpacity
            onPress={() =>{this.smsAction(this.state.phoneNumber)}}
          >
            <MatIcon name='message' size={50} color='black' />
          </TouchableOpacity>
        </View>
        <View style={styles.contactInfo}>
          <Text style={styles.contactInfoText}>Email: {this.state.email}</Text>
          <MatIcon name='email' size={20} color='#fdd835' />
        </View>
        <View style={styles.contactInfo}>
          <Text style={styles.contactInfoText}>Address: {this.state.address}</Text>
          <MatIcon name='home' size={20} color='#fdd835' />
        </View>
        <View style={styles.contactFooter}>
          <TouchableOpacity
            onPress={() =>{this.deleteContact(this.state.key)}}
          >
              <MatIcon name='delete' size={50} color='#fdd835' />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>{}}
          >
              <MatIcon name='edit' size={50} color='#fdd835' />
          </TouchableOpacity>
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
  contactIcon:{
    marginTop: 30,
    marginBottom: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  contactName:{
    textAlign: 'center',
    backgroundColor: '#fdd835',
    fontSize: 25,
    fontWeight: 'bold'
  },
  contactInfo:{
    paddingHorizontal: 10,
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 3,
    borderColor:'#fdd835',
    justifyContent: 'space-between'
  },
  contactFooter:{
    paddingHorizontal: 10,
    flexDirection: 'row',
    paddingTop:20,
    paddingBottom: 10,
    borderBottomWidth: 3,
    borderColor:'#fdd835',
    justifyContent: 'space-between'
  },
  contactInfoText:{
    fontSize: 20,
    color:'white',
    fontWeight: 'bold'
  },
  iconContact:{
    flexDirection: 'row',
    paddingHorizontal: 20,
    backgroundColor: '#fdd835',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30
  },
});
