import React from 'react';
import { StyleSheet, Text, View, Alert, ScrollView, TouchableWithoutFeedback, AsyncStorage, Keyboard } from 'react-native';
import {Form, Item, Input, Label, Button } from 'native-base';

export default class EditContactScreen extends React.Component{

  constructor(props){
    super(props)
    this.state={
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
      address: ''
    }
  }

  componentDidMount(){
    let {navigation} = this.props
    navigation.addListener('willFocus', () =>{
      let key = this.props.navigation.getParam('key', '');

    //populate state with key
    this.getContact(key);
    })
  }

  getContact = async (key) =>{
    await AsyncStorage.getItem(key)
    .then(
      (contactjsonString) =>{
        let contact = JSON.parse(contactjsonString);
        contact['key'] = key; //set the key in the contact obj with our key
        this.setState(contact);
      }
    )
    .catch((error) =>{
      console.log("GET USER --- " + error);
    })
  }

  updateContact = async (key) =>{
    if(this.state.firstName !== '' &&
      this.state.lastName !== '' &&
      this.state.phoneNumber !== '' &&
      this.state.email !== '' &&
      this.state.address !== ''
    ){
      //if condition
      let contact = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        phoneNumber: this.state.phoneNumber,
        email: this.state.email,
        address: this.state.address
      }
      await AsyncStorage.mergeItem(key, JSON.stringify(contact))
      .then(() =>{
        this.props.navigation.goBack();
      })
      .catch((error) =>{
        console.log('UPDATING ERROR' + error);
      })
    }
  }

  //Gives name to the title
  static navigationOptions = {
    title: 'Edit Contact'
  }

  render(){
    return (
      <TouchableWithoutFeedback
        onPress={ () =>{
          Keyboard.dismiss
      }}>
        <ScrollView style={styles.container}>
          <Form style={styles.inputForm}>
            <Item style={styles.itemStyle}>
              <Label>First Name</Label>
              <Input
                style={styles.inputStyle}
                autoCorrect={false}
                autoCapitalize='none'
                keyboardType='default'
                onChangeText={(firstName) =>{
                  this.setState({firstName: firstName})
                }}
                value={this.state.firstName}
               />
            </Item>
            <Item style={styles.itemStyle}>
              <Label>Last Name</Label>
              <Input
                style={styles.inputStyle}
                autoCorrect={false}
                autoCapitalize='none'
                keyboardType='default'
                onChangeText={(lastName) =>{
                  this.setState({lastName: lastName})
                }}
                value={this.state.lastName}
               />
            </Item>
            <Item style={styles.itemStyle}>
              <Label>Phone Number:</Label>
              <Input
                style={styles.inputStyle}
                autoCorrect={false}
                autoCapitalize='none'
                keyboardType='decimal-pad'
                onChangeText={(phoneNumber) =>{
                  this.setState({phoneNumber: phoneNumber})
                }}
                value={this.state.phoneNumber}
               />
            </Item>
            <Item style={styles.itemStyle}>
              <Label>Email:</Label>
              <Input
                style={styles.inputStyle}
                autoCorrect={false}
                autoCapitalize='none'
                keyboardType='default'
                onChangeText={(email) =>{
                  this.setState({email: email})
                }}
                value={this.state.email}
               />
            </Item>
            <Item style={styles.itemStyle}>
              <Label>Address:</Label>
              <Input
                style={styles.inputStyle}
                autoCorrect={false}
                autoCapitalize='none'
                keyboardType='default'
                onChangeText={(address) =>{
                  this.setState({address: address})
                }}
                value={this.state.address}
               />
            </Item>
          </Form>
          <Button
            style={styles.buttonSave}
            full
            onPress={() =>{
              this.updateContact(this.state.key);
            }}
          >
            <Text style={styles.buttonText}>Update Contact</Text>
          </Button>
          <View style={{height: 500}}/>
        </ScrollView>
      </TouchableWithoutFeedback>
    );
 }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',

  },
  inputForm: {
    marginTop: 20,
    marginRight:50,
    marginLeft: 35,
  },
  inputStyle: {
    color: 'white',
  },
  itemStyle: {
    marginTop: 20
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: 'bold'
  },
  buttonSave:{
    backgroundColor: '#43BE31',
    marginTop: 60,
    marginHorizontal: 50
  }
});
