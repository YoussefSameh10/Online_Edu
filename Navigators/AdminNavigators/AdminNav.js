import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import AdminDashboardNav from './AdminDashboardNav';
import AdminProfileScreen from '../../Screens/AdminScreens/AdminProfileScreen'
const AdminNavigator = createStackNavigator()

export default class AdminNav extends React.Component{
  render(){
    return(
      <AdminNavigator.Navigator
        initialRouteName={'adminDashboardNav'}
        headerMode={'none'}      
      >
        
        <AdminNavigator.Screen 
          name={'adminDashboardNav'}
          component={AdminDashboardNav}
        />

        <AdminNavigator.Screen 
          name={'adminProfileScreen'}
          component={AdminProfileScreen}
        />

      </AdminNavigator.Navigator>
    );
  }
}