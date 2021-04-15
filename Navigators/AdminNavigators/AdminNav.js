import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import AdminDashboardNav from './AdminDashboardNav';
import AdminProfileScreen from '../../Screens/AdminScreens/AdminProfileScreen'
import Colors from '../../Constants/colors';

const AdminNavigator = createStackNavigator()

export default class AdminNav extends React.Component{
  render(){
    return(
      <AdminNavigator.Navigator
        initialRouteName={'adminDashboardNav'}
        headerMode={'screen'}      
      >
        
        <AdminNavigator.Screen 
          name={'adminDashboardNav'}
          component={AdminDashboardNav}
          options={{
            headerShown: false
          }}
        />

        <AdminNavigator.Screen 
          name={'adminProfileScreen'}
          component={AdminProfileScreen}
          options={{
            title: 'Profile',
            headerTintColor: Colors.primary_color
          }}
        />

      </AdminNavigator.Navigator>
    );
  }
}