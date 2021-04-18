import React from 'react'
import { createDrawerNavigator, } from '@react-navigation/drawer'
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { View, TouchableOpacity } from 'react-native';
import CustomDrawer from '../../Components/CustomDrawer';
import ProfileAvatar from '../../Components/ProfileAvatar';
import Colors from '../../Constants/colors';
import AdminViewInstructorsAccountsScreen from '../../Screens/AdminScreens/AdminViewInstructorsAccountsScreen';
import AdminViewAdminsAccountsScreen from '../../Screens/AdminScreens/AdminViewAdminsAccountsScreen';
import AdminViewStudentsAccountsNav from './AdminViewStudentsAccountsNav';
import AdminHomeScreen from '../../Screens/AdminScreens/AdminHomeScreen';

const AdminDashboardNavigator = createDrawerNavigator()

export default class AdminDashboardNav extends React.Component{

  getHeaderVisibility(route) {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'adminViewStudentsAccountsScreen';
    switch (routeName) {
      case 'adminViewStudentInfoScreen':
        return false
    }
    return true
  }


  render(){
    return(
      <AdminDashboardNavigator.Navigator
        initialRouteName={'adminViewStudentsAccountsNav'}
        drawerType={'slide'}
        drawerContent={props => <CustomDrawer {...props} />}
      >

        <AdminDashboardNavigator.Screen 
          name={'adminHomeScreen'}
          component={AdminHomeScreen}
          options={({ route }) => ({
            headerShown: this.getHeaderVisibility(route),
            headerTintColor: Colors.primary_color,
            headerRight: () => (
              <TouchableOpacity 
                onPress={() => {this.props.navigation.navigate('adminProfileScreen')}}
              >
                <ProfileAvatar size={'small'}/>
              </TouchableOpacity>
            ),
            title: 'Home',
          })}
        />

        <AdminDashboardNavigator.Screen 
          name={'adminViewStudentsAccountsNav'}
          component={AdminViewStudentsAccountsNav}
          options={({ route }) => ({
            headerShown: this.getHeaderVisibility(route),
            headerTintColor: Colors.primary_color,
            headerRight: () => (
              <TouchableOpacity 
                onPress={() => {this.props.navigation.navigate('adminProfileScreen')}}
              >
                <ProfileAvatar size={'small'}/>
              </TouchableOpacity>
            ),
            title: 'Students Accounts',
          })}
        />
        <AdminDashboardNavigator.Screen 
          name={'adminViewInstructorsAccountsScreen'}
          component={AdminViewInstructorsAccountsScreen}
          options={{
            headerShown: true,
            headerTintColor: Colors.primary_color,
            headerRight: () => (
              <ProfileAvatar navigation={this.props.navigation} userType={'admin'}/>
            ),
            title: 'Instructors Accounts',
          }}
        />

        <AdminDashboardNavigator.Screen 
          name={'adminViewAdminsAccountsScreen'}
          component={AdminViewAdminsAccountsScreen}
          options={{
            headerShown: true,
            headerTintColor: Colors.primary_color,
            headerRight: () => (
              <ProfileAvatar navigation={this.props.navigation} userType={'admin'}/>
            ),
            title: 'Admins Accounts',
          }}
        />

      </AdminDashboardNavigator.Navigator>
    );
  }
}

