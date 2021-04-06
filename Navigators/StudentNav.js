import React from 'react'
import { View, StatusBar, StyleSheet, Button, Text } from 'react-native'
import {createStackNavigator} from '@react-navigation/stack'
import Colors from '../Constants/colors'
import StudentDashboardNav from './StudentDashboardNav'
import StudentCourseNav from './StudentCourseNav'
import StudentProfileScreen from '../Screens/StudentProfileScreen'

const StudentNavigator = createStackNavigator()

export default class StudentNav extends React.Component{
  render(){
    return(
      <StudentNavigator.Navigator 
        initialRouteName={'studentDashboardNav'} 
        headerMode={'screen'}  
      >
        
        <StudentNavigator.Screen 
          name={'studentDashboardNav'} 
          component={StudentDashboardNav} 
          options={{
            headerShown: false
          }}
        />

        <StudentNavigator.Screen 
          name={'studentCourseNav'} 
          component={StudentCourseNav} 
          options={{
            title: 'Image Processing CSE444'
          }}
        />

        <StudentNavigator.Screen 
          name='studentProfileScreen' 
          component={StudentProfileScreen} 
          options={{
            headerShown: false
          }}
        />
      </StudentNavigator.Navigator>
    );
  }
}