import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, AsyncStorage } from 'react-native';
import { Card } from 'native-base';
import { Entypo } from '@expo/vector-icons'; //importing entypo icons form vector icons

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

  render(){

    let firstMessage = <Text></Text>;
    if(this.state.data && this.state.data.length == 0){
        firstMessage = <Text style={styles.textStyle}>Please Click on The + Button to Add a Contact</Text>;
    }

    return (
      <View style={styles.container}>
        {firstMessage}
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
    }
});
