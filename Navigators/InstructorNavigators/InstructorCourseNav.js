import React from 'react'
import { Icon } from 'react-native-elements'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import InstructorCourseOverviewScreen from '../../Screens/InstructorScreens/InstructorCourseOverviewScreen'
import InstructorCourseContentScreen from '../../Screens/InstructorScreens/InstructorCourseContentScreen'
import InstructorCourseQuizzesScreen from '../../Screens/InstructorScreens/InstructorCourseQuizzesScreen'
import InstructorCourseGradesScreen from '../../Screens/InstructorScreens/InstructorCourseGradesScreen'
import InstructorCourseAssignmentsScreen from '../../Screens/InstructorScreens/InstructorCourseAssignmentsScreen'
import Colors from '../../Constants/colors';

const InstructorCourseNavigator = createBottomTabNavigator();

export default class InstructorCourseNav extends React.Component{
  render(){
    return(
      <InstructorCourseNavigator.Navigator
        initialRouteName='overview'
        backBehavior='none'
        tabBarOptions={{
          activeTintColor: Colors.primary_color,
          labelStyle: {fontSize: 13}
        }}  
      >
        <InstructorCourseNavigator.Screen
          name='overview'
          children={() => <InstructorCourseOverviewScreen 
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
        <InstructorCourseNavigator.Screen
          name='content'
          children={() => <InstructorCourseContentScreen 
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
        <InstructorCourseNavigator.Screen
          name='quizzes'
          children={() => <InstructorCourseQuizzesScreen 
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
        <InstructorCourseNavigator.Screen
          name='assignments'
          children={() => <InstructorCourseAssignmentsScreen 
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
        <InstructorCourseNavigator.Screen
          name='grades'
          children={() => <InstructorCourseGradesScreen 
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
      </InstructorCourseNavigator.Navigator>
    );
  }
}
