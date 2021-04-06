import React from 'react'
import {createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList} from '@react-navigation/drawer'
import Colors from '../Constants/colors';
import StudentCoursesScreen from '../Screens/StudentCoursesScreen';
import StudentCalendarScreen from '../Screens/StudentCalendarScreen';
import StudentProfileScreen from '../Screens/StudentProfileScreen';
import ProfileAvatar from '../Components/ProfileAvatar';
import StudentCourseNav from './StudentCourseNav';
import { View, Text } from 'react-native';
import { Image } from 'react-native';
import StudentDrawer from '../Components/StudentDrawer';


const StudentDashboardNavigator = createDrawerNavigator();



export default class StudentDashboardNav extends React.Component{

  render(){
    return(
      <StudentDashboardNavigator.Navigator 
        initialRouteName={'studentCoursesScreen'}
        drawerType='slide'
        drawerContent={props => <StudentDrawer {...props}/>}
      >
        <StudentDashboardNavigator.Screen 
          name='studentCoursesScreen' 
          component={StudentCoursesScreen} 
          options={{
            headerShown: true,
            headerTintColor: Colors.primary_color,
            headerRight: () => (
              <ProfileAvatar navigation={this.props.navigation}/>
            ),
            title: 'Courses',
          }}
        />

        <StudentDashboardNavigator.Screen 
          name='studentCalendarScreen' 
          component={StudentCalendarScreen} 
          options={{
            headerShown: true,
            headerTintColor: Colors.primary_color,
            headerRight: () => (
              <ProfileAvatar navigation={this.props.navigation}/>
            ),
            title: 'Calendar',
          }}
        />

        
      </StudentDashboardNavigator.Navigator>
    );
  }
}

