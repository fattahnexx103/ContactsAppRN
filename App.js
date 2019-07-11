import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';

import HomeScreen from './screens/HomeScreen';
import EditContactScreen from './screens/EditContactScreen';
import AddContactScreen from './screens/AddContactScreen';
import ViewContactScreen from './screens/ViewContactScreen';

//create createAppNavigator
const MainNavigator = createStackNavigator(
  {
    Home: {screen: HomeScreen},
    Add: {screen: AddContactScreen},
    View: {screen: ViewContactScreen},
    Edit: {screen: EditContactScreen},
  }, {
    defaultNavigationOptions:{
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: '#b83227'
      },
      headerTitleStyle: {
        color: '#fff'
      }
    }
  }
);

const App = createAppContainer(MainNavigator);
export default App;
