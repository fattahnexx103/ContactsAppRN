import React from 'react';
import { StyleSheet, Text, View, KeyBoard, AsyncStorage, Alert, TouchableWithoutFeedBack, ScrollView } from 'react-native';
import {Form, Item, Input, Label, Button} from 'native-base';

export default class AddContactScreen extends React.Component{

  constructor(){
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
      address: ''
    };
  }

  //Gives name to the title
  static navigationOptions = {
    title: 'Contacts App'
  }

    //saving a contact
    saveContact = async () =>{
      if(
        this.state.firstName != '' &&
        this.state.lastName != '' &&
        this.state.phoneNumber != '' &&
        this.state.email != '' &&
        this.state.address != ''
      ){
        //if condition

        //create contact object
        let contact = {
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          phoneNumber: this.state.phoneNumber,
          email: this.state.email,
          address: this.state.address
        };

        //use asyncstorage to store
        await AsyncStorage.setItem(Date.now().toString,
          JSON.stringify(contact)
        ).then(() => {
          this.props.navigation.goBack(); //go back to whatever screen we were on
        }).
        catch(error =>{console.log(error)}) //log the error

      }else{
        //if all the fields are null then 
        Alert.alert("All fields are required !");
      }
    }

  render(){
    return (
      <View style={styles.container}>
        <Text>Add Contact</Text>
      </View>
    );
 }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});
