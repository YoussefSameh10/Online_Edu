import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import InstructorDashboardNav from './InstructorDashboardNav'
import InstructorCourseNav from './InstructorCourseNav'
import InstructorProfileScreen from '../../Screens/InstructorScreens/InstructorProfileScreen'
const InstructorNavigator = createStackNavigator()

export default class InstructorNav extends React.Component{
  render(){
    return(
      <InstructorNavigator.Navigator 
        initialRouteName={'instructorDashboardNav'} 
        headerMode={'screen'}  
      >
        
        <InstructorNavigator.Screen 
          name={'instructorDashboardNav'} 
          component={InstructorDashboardNav} 
          options={{
            headerShown: false
          }}
        />

        <InstructorNavigator.Screen 
          name={'instructorCourseNav'} 
          component={InstructorCourseNav} 
          options={{
            title: 'Image Processing CSE444'
          }}
        />

        <InstructorNavigator.Screen 
          name='instructorProfileScreen' 
          component={InstructorProfileScreen} 
          options={{
            title: 'Profile'
          }}
        />
      </InstructorNavigator.Navigator>
    );
  }
}