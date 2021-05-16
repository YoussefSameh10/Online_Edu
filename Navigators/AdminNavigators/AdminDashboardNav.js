import React from 'react'
import { createDrawerNavigator, } from '@react-navigation/drawer'
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import CustomDrawer from '../../Components/CustomDrawer';
import ProfileAvatar from '../../Components/ProfileAvatar';
import Colors from '../../Constants/colors';
import AdminViewStudentsAccountsNav from './AdminViewStudentsAccountsNav';
import AdminViewInstructorsAccountsNav from './AdminViewInstructorsAccountsNav';
import AdminViewAdminsAccountsNav from './AdminViewAdminsAccountsNav';
import AdminHomeScreen from '../../Screens/AdminScreens/AdminHomeScreen';
import AdminViewCoursesScreen from '../../Screens/AdminScreens/AdminViewCoursesScreen';
import AdminProfileScreen from '../../Screens/AdminScreens/AdminProfileScreen';

const AdminDashboardNavigator = createDrawerNavigator()

export default class AdminDashboardNav extends React.Component{

  getHeaderVisibility(route) {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'adminViewStudentsAccountsScreen';
    switch (routeName) {
      case 'adminViewStudentInfoScreen':
        return false
      case 'adminViewInstructorInfoScreen':
        return false
      case 'adminViewAdminInfoScreen':
        return false
    }
    return true
  }

  render(){
    return(
      <AdminDashboardNavigator.Navigator
        initialRouteName={'adminViewAdminsAccountsNav'}
        drawerType={'slide'}
        drawerContent={props => <CustomDrawer {...props} />}
      >

        <AdminDashboardNavigator.Screen 
          name={'adminViewAdminsAccountsNav'}
          component={AdminViewAdminsAccountsNav}
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
            title: 'Admins Accounts',
          })}
        />
        
        <AdminDashboardNavigator.Screen 
          name={'adminViewInstructorsAccountsNav'}
          component={AdminViewInstructorsAccountsNav}
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
            title: 'Instructors Accounts',
          })}
        />

        <AdminDashboardNavigator.Screen 
          name={'adminViewStudentsAccountsNav'}
          children={() => 
            <AdminViewStudentsAccountsNav 
              navigation={this.props.navigation} 
              userToken={this.props.userToken}
            />
          }
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
          name={'adminViewCoursesScreen'}
          component={AdminViewCoursesScreen}
          options={{
            headerShown: true,
            headerTintColor: Colors.primary_color,
            headerRight: () => (
              <TouchableOpacity 
                onPress={() => {this.props.navigation.navigate('adminProfileScreen')}}
              >
                <ProfileAvatar size={'small'}/>
              </TouchableOpacity>
            ),
            title: 'Courses',
          }}
        />

        <AdminDashboardNavigator.Screen 
          name={'adminProfileScreen'}
          component={AdminProfileScreen}
          options={{
            headerShown: false,
            headerTintColor: Colors.primary_color,
            headerRight: () => (
              <TouchableOpacity 
                onPress={() => {this.props.navigation.navigate('adminProfileScreen')}}
              >
                <ProfileAvatar size={'small'}/>
              </TouchableOpacity>
            ),
            title: 'Profile',
          }}
        />

      </AdminDashboardNavigator.Navigator>
    );
  }
}

