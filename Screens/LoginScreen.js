import React from 'react'
import { StyleSheet, Text, Transformation, Image, View, TextInput, Button, KeyboardAvoidingView, ActivityIndicator } from 'react-native'
import TypeWriter from 'react-native-typewriter'
import Toast from 'react-native-simple-toast'
import Colors from '../Constants/colors'
import LoadingScreen from './LoadingScreen'
import { StackActions } from '@react-navigation/routers'
import { NavigationActions } from 'react-navigation'

export default class LoginScreen extends React.Component{
  state = {
    username: '',
    password: '',
    typing: 1,
    isFormValid: false,
    loading: false
  }

  componentDidUpdate(prevProps, prevState){
    if(prevState.username !== this.state.username || prevState.password !== this.state.password){
      this.validateForm()
    }
  }

  toggleTyping = () => {this.setState({typing: this.state.typing*-1})}

  handleUsernameUpdate = username => {
    this.setState({username})
  }
  handlePasswordUpdate = password => {
    this.setState({password})
  }

  validateForm = () => {
    if(this.state.username.length > 0 && this.state.password.length > 0){
      this.setState({isFormValid: true})
    } else{
      this.setState({isFormValid: false})
    }
  }

  toggleLoading = () => {
    console.log(this.state.loading)
    this.setState({loading: !this.state.loading})
    console.log(this.state.loading)
  }

  

  onSubmit = () => {
    this.setState({loading: true})
    this.props.navigation.dispatch(
      StackActions.replace('loadingScreen',
        {username: this.state.username, password: this.state.password})
    );
    // this.props.navigation.navigate('loadingScreen', 
    //   {username: this.state.username, password: this.state.password})
    //this.authenticateUser()
  }

  render(){
    
    return(
      <KeyboardAvoidingView 
        behavior='height'
        style={styles.container}
      >

        <Image 
          source={require('../assets/login_img1.png')}
          style={styles.img}
          resizeMode= 'cover'
        />
        
        <TypeWriter 
          typing={this.state.typing}
          //onTypingEnd={this.toggleTyping}
          maxDelay={100}
          style={styles.typewriter}
        >
            WELCOME BACK
        </TypeWriter>

        <TextInput 
          placeholder={'Username'}
          value={this.state.username}
          onChangeText={this.handleUsernameUpdate}
          style={styles.usernameBoxStyle}
        />

        <TextInput 
          placeholder={'Password'}
          value={this.state.password}
          onChangeText={this.handlePasswordUpdate}
          secureTextEntry={true}
          style={styles.passwordBoxStyle}
        />

        <Button 
          title='Log In'
          onPress={this.onSubmit}
          disabled={!this.state.isFormValid}
          color={Colors.primary_color}
        />
      
      </KeyboardAvoidingView>
    );
    
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      backgroundColor: '#fff',
    },
    
    img: {
      
      width: '100%',
      height: 150,
      marginBottom: 70,
    },
  
    typewriter: {
        fontSize: 32,
        color: Colors.secondary_color,
        fontWeight: 'bold',
        marginBottom: 40,
    },

    usernameBoxStyle: {
      marginBottom: 30,
      width: '80%',
      borderColor: '#000',
      borderBottomWidth:1,
    },
  
    passwordBoxStyle: {
      marginBottom: 30,
      width: '80%',
      borderColor: '#000',
      borderBottomWidth: 1,
    },

  });