import React from 'react'
import { View, StatusBar, Text } from 'react-native'
import {createStackNavigator} from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import Colors from './Constants/colors'
import LoginNav from './Navigators/LoginNav'
import StudentNav from './Navigators/StudentNavigators/StudentNav'
import InstructorNav from './Navigators/InstructorNavigators/InstructorNav'
import AdminNav from './Navigators/AdminNavigators/AdminNav'
import LoginScreen from './Screens/LoginScreen'

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
            initialRouteName={'loginScreen'} 
            headerMode={'none'}  
          >
              <AppNavigator.Screen 
                name={'loginScreen'} 
                component={LoginScreen} 
              />
              <AppNavigator.Screen 
                name={'studentNav'} 
                component={StudentNav} 
              />
              <AppNavigator.Screen 
                name={'instructorNav'}
                component={InstructorNav} 
              />

              <AppNavigator.Screen 
                name={'adminNav'} 
                component={AdminNav} 
              />
          </AppNavigator.Navigator>
        </NavigationContainer>     
      </View>
      
    );
  }
}