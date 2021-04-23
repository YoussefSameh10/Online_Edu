import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import AdminManageInstructorsAccountsScreen from '../../Screens/AdminScreens/AdminManageInstructorsAccountsScreen';
import AdminCreateInstructorsAccountsScreen from '../../Screens/AdminScreens/AdminCreateInstructorsAccountsScreen';
import Colors from '../../Constants/colors';
import { Icon } from 'react-native-elements';

const AdminManageInstructorsAccountsNavigator = createBottomTabNavigator()

export default class AdminManageInstructorsAccountsNav extends React.Component{
  render(){
    return(
      <AdminManageInstructorsAccountsNavigator.Navigator
        initialRouteName='adminManageInstructorsAccountsScreen'
        backBehavior='history'
        tabBarOptions={{
          activeTintColor: Colors.primary_color,
          labelStyle: {fontSize: 13},
          keyboardHidesTabBar: 'true'
        }}
        
      >
        
        <AdminManageInstructorsAccountsNavigator.Screen 
          name='adminManageInstructorsAccountsScreen'
          component={AdminManageInstructorsAccountsScreen}
          options={{
            title: 'Instructors List',
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

        <AdminManageInstructorsAccountsNavigator.Screen 
          name='adminCreateInstructorsAccountsScreen'
          component={AdminCreateInstructorsAccountsScreen}
          options={{
            title: 'Create New Accounts',
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
      </AdminManageInstructorsAccountsNavigator.Navigator>
    );
  }
}