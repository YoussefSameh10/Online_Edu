import React from 'react'
import { Icon } from 'react-native-elements'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import StudentCourseOverviewScreen from '../../Screens/StudentScreens/StudentCourseOverviewScreen'
import StudentCourseContentScreen from '../../Screens/StudentScreens/StudentCourseContentScreen'
import StudentCourseQuizzesScreen from '../../Screens/StudentScreens/StudentCourseQuizzesScreen'
import StudentCourseGradesScreen from '../../Screens/StudentScreens/StudentCourseGradesScreen'
import StudentCourseAssignmentsScreen from '../../Screens/StudentScreens/StudentCourseAssignmentsScreen'
import Colors from '../../Constants/colors';

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
          children={() => <StudentCourseOverviewScreen 
            navigation={this.props.navigation} userToken={this.props.userToken}
          />}
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
          children={() => <StudentCourseContentScreen 
            navigation={this.props.navigation} userToken={this.props.userToken}
          />}
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
          children={() => <StudentCourseQuizzesScreen 
            navigation={this.props.navigation} userToken={this.props.userToken}
          />}
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
          children={() => <StudentCourseAssignmentsScreen 
            navigation={this.props.navigation} userToken={this.props.userToken}
          />}
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
          children={() => <StudentCourseGradesScreen 
            navigation={this.props.navigation} userToken={this.props.userToken}
          />}
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
