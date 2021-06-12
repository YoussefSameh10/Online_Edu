import React from 'react'
import {createBottomTabNavigator, useBottomTabBarHeight} from '@react-navigation/bottom-tabs'
import AdminManageAdminsAccountsScreen from '../../Screens/AdminScreens/AdminManageAdminsAccountsScreen';
import AdminCreateAdminsAccountsScreen from '../../Screens/AdminScreens/AdminCreateAdminsAccountsScreen';
import Colors from '../../Constants/colors';
import { Icon } from 'react-native-elements';

const AdminManageAdminsAccountsNavigator = createBottomTabNavigator()

export default class AdminManageAdminsAccountsNav extends React.Component{
  render(){
    return(
      <AdminManageAdminsAccountsNavigator.Navigator
        initialRouteName='adminManageAdminsAccountsScreen'
        backBehavior='none'
        tabBarOptions={{
          activeTintColor: Colors.primary_color,
          labelStyle: {fontSize: 13},
          keyboardHidesTabBar: 'true'
        }}
        
      >
        
        <AdminManageAdminsAccountsNavigator.Screen 
          name='adminManageAdminsAccountsScreen'
          children={() => 
            <AdminManageAdminsAccountsScreen 
              navigation={this.props.navigation} 
              userToken={this.props.userToken}
            />
          }
          options={{
            title: 'Admins List',
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

        <AdminManageAdminsAccountsNavigator.Screen 
          name='adminCreateAdminsAccountsScreen'
          children={() => 
            <AdminCreateAdminsAccountsScreen 
              navigation={this.props.navigation} 
              userToken={this.props.userToken}
            />
          }
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
      </AdminManageAdminsAccountsNavigator.Navigator>
    );
  }
}