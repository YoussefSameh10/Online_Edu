import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import StudentCourseOverviewScreen from '../Screens/StudentCourseOverviewScreen'
import StudentCourseContentScreen from '../Screens/StudentCourseContentScreen'
import StudentCourseQuizzesScreen from '../Screens/StudentCourseQuizzesScreen'
import StudentCourseGradesScreen from '../Screens/StudentCourseGradesScreen'
import StudentCourseAssignmentsScreen from '../Screens/StudentCourseAssignmentsScreen'
import Colors from '../Constants/colors';
import { View } from 'react-native';
import { Icon } from 'react-native-elements'

const StudentCourseNavigator = createBottomTabNavigator();

export default class StudentCourseNav extends React.Component{
  render(){
    return(
      <StudentCourseNavigator.Navigator
        initialRouteName='overview'
        backBehavior='none'
        tabBarOptions={{
          activeTintColor: Colors.primary_color,
          labelStyle: {fontSize: 13}
        }}  
      >
        <StudentCourseNavigator.Screen
          name='overview'
          component={StudentCourseOverviewScreen}
          options={{
            tabBarIcon: ({color, size}) =>(
              <Icon 
                name='columns'
                type='font-awesome-5' 
                color={color} 
                size={size} />),
          }}
        />
        <StudentCourseNavigator.Screen
          name='content'
          component={StudentCourseContentScreen}
          options={{
            tabBarIcon: ({color, size}) =>(
              <Icon 
                name='list-alt'
                type='font-awesome-5' 
                color={color} 
                size={size} />)
          }}
        />
        <StudentCourseNavigator.Screen
          name='quizzes'
          component={StudentCourseQuizzesScreen}
          options={{
            tabBarIcon: ({color, size}) =>(
              <Icon 
                name='clipboard-list'
                type='font-awesome-5' 
                color={color} 
                size={size} />)
          }}
        />
        <StudentCourseNavigator.Screen
          name='assignments'
          component={StudentCourseAssignmentsScreen}
          options={{
            tabBarIcon: ({color, size}) =>(
              <Icon 
                name='file-alt'
                type='font-awesome-5' 
                color={color} 
                size={size} />)
          }}
        />
        <StudentCourseNavigator.Screen
          name='grades'
          component={StudentCourseGradesScreen}
          options={{
            tabBarIcon: ({color, size}) =>(
              <Icon 
                name='mix'
                type='font-awesome-5' 
                color={color} 
                size={size} />)
          }}
        />
      </StudentCourseNavigator.Navigator>
    );
  }
}
