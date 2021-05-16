import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import StudentDashboardNav from './StudentDashboardNav'
import StudentCourseNav from './StudentCourseNav'
import StudentProfileScreen from '../../Screens/StudentScreens/StudentProfileScreen'

const StudentNavigator = createStackNavigator()

export default class StudentNav extends React.Component{

  getHeaderVisibility(route) {
    const routeName = getFocusedRouteNameFromRoute(route)
    switch (routeName) {
      case 'studentProfileScreen':
        return true
    }
    return false
  }

  getHeaderTitle(route) {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'studentViewStudentsAccountsScreen';
    switch (routeName) {
      case 'studentProfileScreen':
        return 'Profile'
    }
    return ''
  }

  render(){
    return(
      <StudentNavigator.Navigator 
        initialRouteName={'studentDashboardNav'} 
        headerMode={'screen'}  
      >
        
        <StudentNavigator.Screen 
          name={'studentDashboardNav'} 
          component={StudentDashboardNav} 
          options={({route}) => ({
            headerShown: this.getHeaderVisibility(route),
            title: this.getHeaderTitle(route)
          })}
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
            title: 'Profile',
            headerLeft: () => {null}
          }}
        />
      </StudentNavigator.Navigator>
    );
  }
}