import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import InstructorDashboardNav from './InstructorDashboardNav'
import InstructorCourseNav from './InstructorCourseNav'
import InstructorProfileScreen from '../../Screens/InstructorScreens/InstructorProfileScreen'

const InstructorNavigator = createStackNavigator()

export default class InstructorNav extends React.Component{

  getHeaderVisibility(route) {
    const routeName = getFocusedRouteNameFromRoute(route)
    switch (routeName) {
      case 'instructorProfileScreen':
        return true
    }
    return false
  }

  getHeaderTitle(route) {
    const routeName = getFocusedRouteNameFromRoute(route)
    switch (routeName) {
      case 'instructorProfileScreen':
        return 'Profile'
    }
    return ''
  }

  render(){
    return(
      <InstructorNavigator.Navigator 
        initialRouteName={'instructorDashboardNav'} 
        headerMode={'screen'}  
      >
        
        <InstructorNavigator.Screen 
          name={'instructorDashboardNav'} 
          children={() => <InstructorDashboardNav 
            navigation={this.props.navigation} userToken={this.props.route.params.userToken}
          />}
          options={({route}) => ({
            headerShown: this.getHeaderVisibility(route),
            title: this.getHeaderTitle(route)
          })}
        />

        <InstructorNavigator.Screen 
          name={'instructorCourseNav'} 
          children={() => <InstructorCourseNav 
            navigation={this.props.navigation} userToken={this.props.route.params.userToken}
          />}
          options={{
            title: 'Image Processing CSE444'
          }}
        />

        <InstructorNavigator.Screen 
          name='instructorProfileScreen' 
          children={() => <InstructorProfileScreen 
            navigation={this.props.navigation} userToken={this.props.route.params.userToken}
          />}
          options={{
            title: 'Profile',
            headerLeft: () => {null}
          }}
        />
      </InstructorNavigator.Navigator>
    );
  }
}