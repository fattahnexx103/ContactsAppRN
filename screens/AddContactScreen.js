import React from 'react';
import { StyleSheet, Text, View, Keyboard, AsyncStorage, Alert, TouchableWithoutFeedback, ScrollView } from 'react-native';
import {Form, Item, Input, Label, Button} from 'native-base';

export default class AddContactScreen extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
      address: ''
    }
  }

  //Gives name to the title
  static navigationOptions = {
    title: 'Contacts App'
  };

    //saving a contact
    saveContact = async () =>{
      if(
        this.state.firstName !== '' &&
        this.state.lastName !== '' &&
        this.state.phoneNumber !== '' &&
        this.state.email !== '' &&
        this.state.address !== ''
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
        await AsyncStorage.setItem(Date.now().toString(),
          JSON.stringify(contact)
        ).then(() => {
          this.props.navigation.goBack(); //go back to whatever screen we were on
        }).
        catch((error) =>{
          console.log(error);
        }) //log the error

      }else{
        //if all the fields are null then
        Alert.alert("All fields are required !");
      }
    }

  render(){
    return (
        <TouchableWithoutFeedback
          onPress={() =>{
            Keyboard.dismiss;
          }}>
            <ScrollView style={styles.container}>
              <Form style={styles.inputForm}>
                <Item style={styles.itemStyle}>
                  <Label>First Name: </Label>
                  <Input
                    style={styles.inputStyle}
                    autocorrect={false}
                    autoCapitalize ='none'
                    keyboardType ='default'
                    onChangeText = {
                      (firstName) => {
                        this.setState({firstName: firstName})
                      }
                    }
                  />
                </Item>
                <Item style={styles.itemStyle}>
                  <Label>Last Name: </Label>
                  <Input
                    style={styles.inputStyle}
                    autocorrect={false}
                    autoCapitalize ='none'
                    keyboardType ='default'
                    onChangeText = {
                      (lastName) => {
                        this.setState({lastName: lastName})
                      }
                    }
                  />
                </Item>
                <Item style={styles.itemStyle}>
                  <Label>Phone Number: </Label>
                  <Input
                    style={styles.inputStyle}
                    autocorrect={false}
                    autoCapitalize ='none'
                    keyboardType ='decimal-pad'
                    onChangeText = {
                      (phoneNumber) => {
                        this.setState({phoneNumber: phoneNumber})
                      }
                    }
                  />
                </Item>
                <Item style={styles.itemStyle}>
                  <Label>Email: </Label>
                  <Input
                    style={styles.inputStyle}
                    autocorrect={false}
                    autoCapitalize ='none'
                    keyboardType ='default'
                    onChangeText = {
                      (email) => {
                        this.setState({email: email})
                      }
                    }
                  />
                </Item>
                <Item style={styles.itemStyle}>
                  <Label>Address: </Label>
                  <Input
                    style={styles.inputStyle}
                    autocorrect={false}
                    autoCapitalize ='none'
                    keyboardType ='default'
                    onChangeText = {
                      (address) => {
                        this.setState({address: address})
                      }
                    }
                  />
                </Item>
              </Form>
              <Button
                style={styles.buttonSave}
                full
                onPress={() =>{
                  this.saveContact();
                }}
              >
                <Text style={styles.buttonText}>Save Contact</Text>
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
