import React from 'react'
import { createDrawerNavigator, } from '@react-navigation/drawer'
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { View } from 'react-native';
import CustomDrawer from '../../Components/CustomDrawer';
import ProfileAvatar from '../../Components/ProfileAvatar';
import Colors from '../../Constants/colors';
import AdminManageInstructorsAccountsScreen from '../../Screens/AdminScreens/AdminManageInstructorsAccountsScreen';
import AdminManageAdminsAccountsScreen from '../../Screens/AdminScreens/AdminManageAdminsAccountsScreen';
import AdminManageStudentsAccountsNav from './AdminManageStudentsAccountsNav';

const AdminDashboardNavigator = createDrawerNavigator()

export default class AdminDashboardNav extends React.Component{

  getHeaderVisibility(route) {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'adminManageStudentsAccountsScreen';
    switch (routeName) {
      case 'adminManageStudentsAccountsScreen':
        return true;
      case 'adminManageStudentInfoScreen':
        return false;
    }
  }


  render(){
    return(
      <AdminDashboardNavigator.Navigator
        initialRouteName={'adminManageStudentsAccountsNav'}
        drawerType={'slide'}
        drawerContent={props => <CustomDrawer {...props} />}
      >
        <AdminDashboardNavigator.Screen 
          name={'adminManageStudentsAccountsNav'}
          component={AdminManageStudentsAccountsNav}
          options={({ route }) => ({
            headerShown: this.getHeaderVisibility(route),
            headerTintColor: Colors.primary_color,
            headerRight: () => (
              <ProfileAvatar navigation={this.props.navigation} userType={'admin'}/>
            ),
            title: 'Students Accounts',
          })}
        />
        <AdminDashboardNavigator.Screen 
          name={'adminManageInstructorsAccountsScreen'}
          component={AdminManageInstructorsAccountsScreen}
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
          name={'adminManageAdminsAccountsScreen'}
          component={AdminManageAdminsAccountsScreen}
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

