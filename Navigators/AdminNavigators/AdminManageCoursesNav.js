import React from 'react'
import {createBottomTabNavigator, useBottomTabBarHeight} from '@react-navigation/bottom-tabs'
import AdminManageCoursesScreen from '../../Screens/AdminScreens/AdminManageCoursesScreen';
import AdminCreateCoursesScreen from '../../Screens/AdminScreens/AdminCreateCoursesScreen';
import Colors from '../../Constants/colors';
import { Icon } from 'react-native-elements';

const AdminManageCoursesNavigator = createBottomTabNavigator()

export default class AdminManageCoursesNav extends React.Component{
  render(){
    return(
      <AdminManageCoursesNavigator.Navigator
        initialRouteName='adminManageCoursesScreen'
        backBehavior='none'
        tabBarOptions={{
          activeTintColor: Colors.primary_color,
          labelStyle: {fontSize: 13},
          keyboardHidesTabBar: 'true',
        }}
        
        
      >
        
        <AdminManageCoursesNavigator.Screen 
          name='adminManageCoursesScreen'
          children={() => 
            <AdminManageCoursesScreen 
              navigation={this.props.navigation} 
              userToken={this.props.userToken}
            />
          }
          options={{
            title: 'Courses List',
            tabBarIcon: ({color, size}) =>(
              <Icon 
                name='list'
                type='font-awesome-5' 
                color={color} 
                size={size} 
              />
            ),
          }}
        />

        <AdminManageCoursesNavigator.Screen 
          name='adminCreateCoursesScreen'
          children={() => 
            <AdminCreateCoursesScreen 
              navigation={this.props.navigation} 
              userToken={this.props.userToken}
            />
          }
          options={{
            title: 'Create New Course',
            tabBarIcon: ({color, size}) =>(
              <Icon 
                name='plus'
                type='font-awesome-5' 
                color={color} 
                size={size} 
              />
            ),
          }}
        />
      </AdminManageCoursesNavigator.Navigator>
    );
  }
}