import React from 'react'
import { View, StatusBar, StyleSheet, Button, Text } from 'react-native'
import {createStackNavigator} from '@react-navigation/stack'
import Colors from './Constants/colors'
import { NavigationContainer } from '@react-navigation/native'
import StudentDashboardNav from './Navigators/StudentNav'
import LoginNav from './Navigators/LoginNav'
import StudentNav from './Navigators/StudentNav'

const AppNavigator = createStackNavigator()

export default class App extends React.Component {
  
  render(){
    return (
      <View style={{
        flex: 1,
        }}>
        <StatusBar backgroundColor = {Colors.primary_color}/> 
        <NavigationContainer>
          <AppNavigator.Navigator 
            initialRouteName={'studentNav'} 
            headerMode={'none'}  
          >
              <AppNavigator.Screen 
                name={'loginNav'} 
                component={LoginNav} 
              />   
              <AppNavigator.Screen 
                name={'studentNav'} 
                component={StudentNav} 
              />
          </AppNavigator.Navigator>
        </NavigationContainer>     
      </View>
      
    );
  }
}


