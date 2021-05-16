import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import AdminDashboardNav from './AdminDashboardNav';
import AdminProfileScreen from '../../Screens/AdminScreens/AdminProfileScreen'
import Colors from '../../Constants/colors';

const AdminNavigator = createStackNavigator()

export default class AdminNav extends React.Component{

  state = {
    userToken: this.props.route.params.userToken,
  }

  getHeaderVisibility(route) {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'adminViewStudentsAccountsScreen';
    switch (routeName) {
      case 'adminProfileScreen':
        return true
    }
    return false
  }

  getHeaderTitle(route) {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'adminViewStudentsAccountsScreen';
    switch (routeName) {
      case 'adminProfileScreen':
        return 'Profile'
    }
    return ''
  }
  

  render(){
    return(
      <AdminNavigator.Navigator
        initialRouteName={'adminDashboardNav'}
        headerMode={'screen'}      
      >
        
        <AdminNavigator.Screen 
          name={'adminDashboardNav'}
          //component={AdminDashboardNav}
          children={() => <AdminDashboardNav navigation={this.props.navigation} userToken={this.props.route.params.userToken}/>}
          options={({route}) => ({
            headerShown: this.getHeaderVisibility(route),
            title: this.getHeaderTitle(route)
          })}
          
        />

        <AdminNavigator.Screen 
          name={'adminProfileScreen'}
          component={AdminProfileScreen}
          options={{
            title: 'Profile',
            headerTintColor: Colors.primary_color,
            headerLeft: () => {null}            
          }}
          
        />

      </AdminNavigator.Navigator>
    );
  }
}