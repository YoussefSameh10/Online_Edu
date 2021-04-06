import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import LoginScreen from '../Screens/LoginScreen'
import LoadingScreen from '../Screens/LoadingScreen'

const LoginNavigator = createStackNavigator();

export default class LoginNav extends React.Component{

    render(){
        return(
            <LoginNavigator.Navigator 
                initialRouteName={'loginScreen'} 
                headerMode={'none'}>
                <LoginNavigator.Screen 
                    name={'loginScreen'} 
                    component={LoginScreen} 
                />
                <LoginNavigator.Screen 
                    name={'loadingScreen'} 
                    component={LoadingScreen} 
                />
            </LoginNavigator.Navigator>
        );
    }
}