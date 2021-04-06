import React from 'react'
import {View, ActivityIndicator, StyleSheet, Text} from 'react-native'
import Colors from '../Constants/colors';
import Toast from 'react-native-simple-toast'
import { StackActions } from '@react-navigation/routers'



export default class LoadingScreen extends React.Component{
     
  
  componentDidMount(){
    //Just for simulation
    setTimeout(() => {this.authenticateUser()}, 200)
    
  }

  authenticateUser = () => {
      
    if(this.props.route.params.username !== 'asdf'){
      Toast.show('Incorrect username or password')
      this.props.navigation.dispatch(
        StackActions.replace('loginScreen')
      );
    } 
    else if(this.props.route.params.password !== '123456'){
      Toast.show('Incorrect password')
      this.props.navigation.dispatch(
        StackActions.replace('loginScreen')
      );
    }
    //Actions will differ based on whether it is student, instructor or admin
    else{
      Toast.show('Logged in successfully')
      this.props.navigation.dispatch(
        StackActions.replace('studentNav')
      );
    }
  }

  render(){
    
    return(
      <View style={styles.container}>
        <ActivityIndicator color={'#fff'} size='large' />
      </View>
    );
  }
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primary_color,
        justifyContent: 'center',
        alignContent: 'center'    
        
    }
})