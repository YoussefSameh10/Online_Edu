import React from 'react'
import { StyleSheet, Text, Transformation, Image, View, TextInput, Button, KeyboardAvoidingView, ActivityIndicator, ScrollView } from 'react-native'
import TypeWriter from 'react-native-typewriter'
import Toast from 'react-native-simple-toast'
import Colors from '../Constants/colors'
import { Icon } from 'react-native-elements'
import LoadingScreen from './LoadingScreen'
import { StackActions } from '@react-navigation/routers'
import { NavigationActions } from 'react-navigation'
import { TouchableOpacity } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay';
import { url } from '../Constants/numbers'

export default class LoginScreen extends React.Component{
  state = {
    username: 'admin1@gmail.com',
    password: 'adminadmin1',
    userToken: null,
    user: {},
    typing: 1,
    isFormValid: true,
    loading: false,
    visible: false,
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
    this.setState({loading: !this.state.loading})
  }

  // validate = (text) => {
  //   let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  //   if (reg.test(text) === false) {
  //     Toast.show("Email is Not Correct")
  //     this.setState({ username: text })
  //     return false;
  //   }
  //   else {
  //     this.setState({ username: text })
  //     Toast.show("Email is Correct");
  //   }
  // }

  login = async () => {
      
    this.setState({loading: true})
    try{
      const response = await fetch(`${url}/users/login`, {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          email: this.state.username,
          password: this.state.password,
        })
      })
      
      const result = await response.json()
      if(response.status === 400){
        Toast.show(result)
        this.props.navigation.dispatch(StackActions.replace('loginScreen'))
      }
      else{
        this.setState({userToken: result.token, user: result.user}, 
          this.props.navigation.dispatch(StackActions.replace(`${result.user.role}Nav`,
            {
              userToken: result.token,
              user: result.user,
            }
          ))
        )
      }
    } catch (e) {
      console.log(e.message)
    }

  }

  render(){
    
    return(
      <KeyboardAvoidingView 
        behavior='height'
        style={styles.container}
      >
        <Spinner visible={this.state.loading}/>
        <Image
          source={require('../assets/login_img1.png')}
          style={styles.img}
          resizeMode= 'cover'
        />
        <ScrollView style={styles.scroller} contentContainerStyle={styles.scrollerContent}>
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
            autoCompleteType='email'
            // onChangeText={this.validate}
            style={styles.usernameInput}
          />
          
          <View style={styles.passwordBox}>
            <TextInput 
              placeholder={'Password'}
              value={this.state.password}
              onChangeText={this.handlePasswordUpdate}
              secureTextEntry={!this.state.visible}
              style={styles.passwordInput}
            />
            <TouchableOpacity onPress={() => {this.setState({visible: !this.state.visible})}}>
              <Icon 
                name={this.state.visible ? 'eye-slash' : 'eye'}
                type='font-awesome'
                color={Colors.primary_color}  
                style={styles.showIcon}
              />
            </TouchableOpacity>
          </View>
          
          <View style={styles.loginButton}>
            <Button 
              title='Log In'
              onPress={this.login}
              disabled={!this.state.isFormValid}
              color={Colors.primary_color}
            />
          </View>
        </ScrollView>
          
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
    scroller: {alignSelf: 'center', width: '100%'},
    scrollerContent: {alignItems: 'center'}, 
    loginButton: {width: '30%', alignSelf: 'center'},
    img: {
      width: '100%',
      height: 120,
      marginBottom: 30,
    },
  
    typewriter: {
        fontSize: 32,
        color: Colors.secondary_color,
        fontWeight: 'bold',
        marginBottom: 40,
    },

    usernameInput: {
      marginBottom: 30,
      width: '80%',
      borderColor: '#000',
      borderBottomWidth:1,
      padding: 8,
    },
    passwordBox: {
      justifyContent: 'flex-start',
      alignItems: 'center',
      flexDirection: 'row',
      width: '80%',
      marginBottom: 50
    },
    showIcon: {
      marginBottom: 11,
      borderBottomWidth: 1
    },
    passwordInput: {
      marginBottom: 30,
      width: '93%',
      borderColor: '#000',
      borderBottomWidth: 1,
      padding: 8
    },

  });