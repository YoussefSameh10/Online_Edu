import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import AdminViewStudentsAccountsScreen from '../../Screens/AdminScreens/AdminViewStudentsAccountsScreen';
import AdminManageStudentsAccountsScreen from '../../Screens/AdminScreens/AdminManageStudentsAccountsScreen';
import Colors from '../../Constants/colors';
import { Icon } from 'react-native-elements';

const AdminManageStudentsAccountsNavigator = createBottomTabNavigator()

export default class AdminManageStudentsAccountsNav extends React.Component{
  render(){
    return(
      <AdminManageStudentsAccountsNavigator.Navigator
        backBehavior='history'
        tabBarOptions={{
          activeTintColor: Colors.primary_color,
          labelStyle: {fontSize: 13},
        }}
      >
        
        <AdminManageStudentsAccountsNavigator.Screen 
          name='adminViewStudentsAccountsScreen'
          component={AdminViewStudentsAccountsScreen}
          options={{
            title: 'Students List',
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

        <AdminManageStudentsAccountsNavigator.Screen 
          name='adminManageStudentsAccountsScreen'
          component={AdminManageStudentsAccountsScreen}
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
      </AdminManageStudentsAccountsNavigator.Navigator>
    );
  }
}