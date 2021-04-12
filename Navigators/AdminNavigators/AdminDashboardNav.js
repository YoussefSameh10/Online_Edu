import { createDrawerNavigator } from '@react-navigation/drawer'
import React from 'react'
import { View } from 'react-native';
import CustomDrawer from '../../Components/CustomDrawer';
import ProfileAvatar from '../../Components/ProfileAvatar';
import Colors from '../../Constants/colors';
import AdminManageStudentsAccountsScreen from '../../Screens/AdminScreens/AdminManageStudentsAccountsScreen';
import AdminManageInstructorsAccountsScreen from '../../Screens/AdminScreens/AdminManageInstructorsAccountsScreen';
import AdminManageAdminsAccountsScreen from '../../Screens/AdminScreens/AdminManageAdminsAccountsScreen';

const AdminDashboardNavigator = createDrawerNavigator()

export default class AdminDashboardNav extends React.Component{

  render(){
    return(
      <AdminDashboardNavigator.Navigator
        initialRouteName={'adminManageStudentsAccountsScreen'}
        drawerType={'slide'}
        drawerContent={props => <CustomDrawer {...props} />}
      >
        <AdminDashboardNavigator.Screen 
          name={'adminManageStudentsAccountsScreen'}
          component={AdminManageStudentsAccountsScreen}
          options={{
            headerShown: true,
            headerTintColor: Colors.primary_color,
            headerRight: () => (
              <ProfileAvatar navigation={this.props.navigation} userType={'admin'}/>
            ),
            title: 'Students Accounts',
          }}
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

