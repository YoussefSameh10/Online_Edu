import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import AdminManageStudentsAccountsScreen from '../../Screens/AdminScreens/AdminManageStudentsAccountsScreen'
import AdminManageStudentInfoScreen from '../../Screens/AdminScreens/AdminManageStudentInfoScreen'
import Colors from '../../Constants/colors';
import Toast from 'react-native-simple-toast';

const AdminManageStudentsAccountsNavigator = createStackNavigator()

export default class AdminManageStudentsAccountsNav extends React.Component{
  
  getHeaderTitle(route) {
    return route.params.studentName
  }


  render(){
    return(
      <AdminManageStudentsAccountsNavigator.Navigator
        initialRouteName={'adminManageStudentsAccountsScreen'}
        headerMode={'screen'}      
      >
        
        <AdminManageStudentsAccountsNavigator.Screen 
          name={'adminManageStudentsAccountsScreen'}
          component={AdminManageStudentsAccountsScreen}
          options={{
            headerShown: false
          }}
        />

        <AdminManageStudentsAccountsNavigator.Screen 
          name={'adminManageStudentInfoScreen'}
          component={AdminManageStudentInfoScreen}
          options={({ route }) => ({
            headerTintColor: Colors.primary_color,
            headerTitle: this.getHeaderTitle(route)
          })}
        />

      </AdminManageStudentsAccountsNavigator.Navigator>
    );
  }
}