import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import AdminViewStudentsAccountsScreen from '../../Screens/AdminScreens/AdminViewStudentsAccountsScreen'
import AdminViewStudentInfoScreen from '../../Screens/AdminScreens/AdminViewStudentInfoScreen'
import Colors from '../../Constants/colors';
import Toast from 'react-native-simple-toast';
import AdminManageStudentsAccountsNav from './AdminManageStudentsAccountsNav';

const AdminViewStudentsAccountsNavigator = createStackNavigator()

export default class AdminViewStudentsAccountsNav extends React.Component{
  
  getHeaderTitle(route) {
    return route.params.studentName
  }


  render(){
    return(
      <AdminViewStudentsAccountsNavigator.Navigator
        initialRouteName={'adminManageStudentsAccountsNav'}
        headerMode={'screen'}      
      >
        
        <AdminViewStudentsAccountsNavigator.Screen 
          name={'adminManageStudentsAccountsNav'}
          component={AdminManageStudentsAccountsNav}
          options={{
            headerShown: false
          }}
        />

        <AdminViewStudentsAccountsNavigator.Screen 
          name={'adminViewStudentInfoScreen'}
          component={AdminViewStudentInfoScreen}
          options={({ route }) => ({
            headerTintColor: Colors.primary_color,
            headerTitle: this.getHeaderTitle(route)
          })}
        />

      </AdminViewStudentsAccountsNavigator.Navigator>
    );
  }
}