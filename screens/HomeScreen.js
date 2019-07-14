import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, AsyncStorage } from 'react-native';
import { Card } from 'native-base';
import { Entypo } from '@expo/vector-icons'; //importing entypo icons form vector icons
import MatIcon from 'react-native-vector-icons/MaterialIcons';

export default class HomeScreen extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      data: []
    }
  }

  //Gives name to the title
  static navigationOptions = {
    title: 'Contacts App'
  }

  //immediately before initial rendering so right before render method
  componentWillMount(){
    let {navigation} = this.props;
    navigation.addListener('willFocus', () =>{
      //callback
      this.getAllcontacts();
    })
  }

  //get all Contacts
  getAllcontacts = async () =>{
    //collects all the Contacts
    await AsyncStorage.getAllKeys()
    .then((keys) =>{
      console.log(keys);
      return AsyncStorage.multiGet(keys)
        .then((result) =>{
          this.setState({ // set the state with  the result
            data: result.sort(function(a,b){
              //sorting the results alphabetically
              //get first letter of first object and compare with b
              if(JSON.parse(a[1]).firstName < JSON.parse(b[1])){return -1}
              if(JSON.parse(a[1]).firstName > JSON.parse(b[1])){return 1}
              return 0;
            })
          });
        })
        .catch((error) =>{
          console.log("Multiget Error -- " + error);
        })
    })
    .catch((error) =>{
      console.log("Loading keys ---" + error);
    })

    //finally display the result which is now the state
    console.log(this.state.data);
  }

  render(){

    let firstMessage = <Text></Text>;
    if(this.state.data && this.state.data.length == 0){
        firstMessage = <Text style={styles.textStyle}>Please Click on The + Button to Add a Contact</Text>;
    }

    return (
      <View style={styles.container}>
        {firstMessage}
        <FlatList
        data={this.state.data}
        renderItem={({item}) =>{
          contact = JSON.parse(item[1]); //get the first name
            return (
              <TouchableOpacity
                onPress={() =>{
                  this.props.navigation.navigate('View', {
                    key: item[0].toString() //pass the key which is the first item
                  });
                }}
              >
                <Card style={styles.contactCard}>
                  <View style={styles.iconContainer}>
                      <MatIcon
                          style={styles.contactIcon}
                          name='person'
                          size={30}
                          color='#fdd835'
                       />
                  </View>
                  <View style={styles.infoContainer}>
                    <Text style={styles.contactInfoText}>{contact.firstName} {contact.lastName}</Text>
                    <Text style={styles.contactInfoText}>{contact.phoneNumber}</Text>
                  </View>
                </Card>
              </TouchableOpacity>
            )
        }}
        keyExtractor={(item,index) =>{
          item[0].toString()
        }}/>

        <TouchableOpacity
          style={styles.floatButton}
          onPress= {() => {
            //navigate to add screen
            this.props.navigation.navigate("Add");
          }}
        >
            <Entypo
                name='plus'
                size={50}
                color='black'
             />
        </TouchableOpacity>
      </View>
    );
 }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: 'center'
  },
  floatButton:{
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#fdd835',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    borderColor: 'black',
    borderWidth: 2,
  },
  textStyle: {
      color: 'white',
      fontSize: 16,
      textAlign: 'center'
  },
  contactCard:{
    flexDirection: 'row',
    borderColor: '#fdd835',
    backgroundColor: 'black',
    marginHorizontal: 50,
  },
  iconContainer: {
    padding: 10,
  },
  infoContainer: {
    padding: 10,
  },
  contactInfoText: {
    fontSize: 16,
    color: 'white',
  }
});
