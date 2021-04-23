import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import AdminManageAdminsAccountsScreen from '../../Screens/AdminScreens/AdminManageAdminsAccountsScreen';
import AdminCreateAdminsAccountsScreen from '../../Screens/AdminScreens/AdminCreateAdminsAccountsScreen';
import Colors from '../../Constants/colors';
import { Icon } from 'react-native-elements';

const AdminManageAdminsAccountsNavigator = createBottomTabNavigator()

export default class AdminManageAdminsAccountsNav extends React.Component{
  render(){
    return(
      <AdminManageAdminsAccountsNavigator.Navigator
        initialRouteName='adminManageAdminsAccountsScreen'
        backBehavior='history'
        tabBarOptions={{
          activeTintColor: Colors.primary_color,
          labelStyle: {fontSize: 13},
          keyboardHidesTabBar: 'true'
        }}
        
      >
        
        <AdminManageAdminsAccountsNavigator.Screen 
          name='adminManageAdminsAccountsScreen'
          component={AdminManageAdminsAccountsScreen}
          options={{
            title: 'Admins List',
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

        <AdminManageAdminsAccountsNavigator.Screen 
          name='adminCreateAdminsAccountsScreen'
          component={AdminCreateAdminsAccountsScreen}
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
      </AdminManageAdminsAccountsNavigator.Navigator>
    );
  }
}