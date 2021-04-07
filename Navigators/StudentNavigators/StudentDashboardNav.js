import React from 'react'
import {createDrawerNavigator, } from '@react-navigation/drawer'
import Colors from '../../Constants/colors';
import StudentCoursesScreen from '../../Screens/StudentScreens/StudentCoursesScreen.js';
import StudentCalendarScreen from '../../Screens/StudentScreens/StudentCalendarScreen.js';
import ProfileAvatar from '../../Components/ProfileAvatar';
import CustomDrawer from '../../Components/CustomDrawer';

const StudentDashboardNavigator = createDrawerNavigator();

export default class StudentDashboardNav extends React.Component{

  render(){
    return(
      <StudentDashboardNavigator.Navigator 
        initialRouteName={'studentCoursesScreen'}
        drawerType='slide'
        drawerContent={props => <CustomDrawer {...props}/>}
      >
        <StudentDashboardNavigator.Screen 
          name='studentCoursesScreen' 
          component={StudentCoursesScreen} 
          options={{
            headerShown: true,
            headerTintColor: Colors.primary_color,
            headerRight: () => (
              <ProfileAvatar navigation={this.props.navigation}  userType={'student'}/>
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

