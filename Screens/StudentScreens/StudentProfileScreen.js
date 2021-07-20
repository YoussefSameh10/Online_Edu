import React from 'react'
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import ProfileAvatar from '../../Components/ProfileAvatar'
import Dialog from "react-native-dialog";
import { Icon } from 'react-native-elements'
import { StackActions } from '@react-navigation/routers'
import Toast from 'react-native-simple-toast';
import Spinner from 'react-native-loading-spinner-overlay'
import { url } from '../../Constants/numbers';
import Colors from '../../Constants/colors';


export default class StudentProfileScreen extends React.Component{
 
  state = {
    dialogVisibility: false,
    studentName: this.props.user.name,
    studentCode: this.props.user.code,
    studentEmail: this.props.user.email,
    studentYear: this.props.user.year,
    studentOldPassword: '',
    studentNewPassword: '',
    studentConfirmPassword: '',
    loading: false,
  }

  handleStudentOldPasswordUpdate = studentOldPassword => {
    this.setState({studentOldPassword}, this.validateForm)
  }

  handleStudentNewPasswordUpdate = studentNewPassword => {
    this.setState({studentNewPassword}, this.validateForm)
  }

  handleStudentConfirmPasswordUpdate = studentConfirmPassword => {
    this.setState({studentConfirmPassword}, this.validateForm)
  }

  validateForm = () => {
    if(this.state.studentOldPassword.length > 0 &&
      this.state.studentNewPassword.length > 0 && 
      this.state.studentConfirmPassword.length > 0
    ){
      this.setState({enableConfirm: true})
    } else{
      this.setState({enableConfirm: false})
    }
  }

  handleChangePasswordConfirm = async() => {
    
    this.setState({
      dialogVisibility: false,
      enableConfirm: false,
      loading: true,
    })

    try{
      const response = await fetch(`${url}/users/me`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + this.props.userToken,        
        },
        body: JSON.stringify({
          oldPassword: this.state.studentOldPassword,
          password: this.state.studentNewPassword,
          confirmPassword: this.state.studentConfirmPassword,
        })
      })
      const result = await response.json()
      this.setState({
        studentOldPassword: '',
        studentNewPassword: '',
        studentConfirmPassword: '',
      })
      if(response.status === 400){
        Toast.show(result)
      }
      else if(response.status === 500){
        Toast.show(result)
      }
      else{
        Toast.show(`Your Password Has Been Changed`)
      }
      this.setState({loading: false})
    } catch(e){
      console.log(e.message)
    }
  }

  handleLogout = async() => {
    try{
      this.setState({loading: true})
      const response = await fetch(`${url}/users/logout`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + this.props.userToken,        
        },
      })

      if(response.status === 500){
        Toast.show(`Can't Logout`)
      }
      else{
        this.props.navigation.dispatch(StackActions.replace('loginScreen'))
      }
      this.setState({loading: false})

    } catch(e){
      console.log(e.message)
    }
  }

  render(){
    return(
      <View style={styles.container}>
        <Spinner visible={this.state.loading} />
        <Text style={styles.title}>Full Name</Text>
        <Text style={styles.text}>{this.state.studentName}</Text>
        <Text style={styles.title}>Code</Text>
        <Text style={styles.text}>{this.state.studentCode}</Text>
        <Text style={styles.title}>Year</Text>
        <Text style={styles.text}>{this.state.studentYear}</Text>
        <Text style={styles.title}>Email</Text>
        <Text style={styles.text}>{this.state.studentEmail}</Text>
        <Dialog.Container 
          visible={this.state.dialogVisibility}
          onBackdropPress={() => {this.setState({dialogVisibility: false})}}
        >
          <Dialog.Title>Change Password</Dialog.Title>
          
          <Dialog.Input 
            style={{borderBottomWidth: 1}}
            value={this.state.studentOldPassword}
            onChangeText={this.handleStudentOldPasswordUpdate}
            secureTextEntry={true}
            placeholder='Enter your old password'  
          />

          <Dialog.Input 
            style={{borderBottomWidth: 1}}
            value={this.state.studentNewPassword}
            onChangeText={this.handleStudentNewPasswordUpdate}
            secureTextEntry={true}
            placeholder='Enter your new password'  
          />
          
          <Dialog.Input 
            style={{borderBottomWidth: 1}}
            value={this.state.studentConfirmPassword}
            onChangeText={this.handleStudentConfirmPasswordUpdate}
            secureTextEntry={true}
            placeholder='Enter the new password again'
          />

          <Dialog.Button 
            label="Cancel" 
            onPress={() => {this.setState({dialogVisibility: false})}}
          />    
          <Dialog.Button 
            label="Confirm" 
            onPress={this.handleChangePasswordConfirm}
            disabled={!this.state.enableConfirm} 
          />

        </Dialog.Container>
        
        <View style={styles.buttonsGroup}>
          <TouchableOpacity
            onPress={() => {this.setState({dialogVisibility: true})}}
            style={styles.button}
          >
            <Icon 
              name='key'
              type='font-awesome'
              color={'#fff'}  
            />
            <Text style={styles.buttonLabel}>Change Password</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.handleLogout}
            style={styles.button}
          >
            <Icon 
              name='sign-out'
              type='font-awesome'
              color={'#fff'}  
            />
            <Text style={styles.buttonLabel}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16,},
  picture: {marginBottom: 32},
  row: {flex: 1, flexDirection: 'column', marginBottom: 24, alignItems: 'flex-start', maxHeight: 50},
  title: {fontSize: 18, color: '#666', paddingLeft: 8, marginBottom: 8},
  text: {width: '100%', fontSize: 16, paddingLeft: 8, marginBottom: 32},
  buttonsGroup: {flex: 1, alignItems: 'flex-end', marginTop: 50},
  button: {width: 50, height: 50, borderRadius: 30, backgroundColor: Colors.primary_color, marginBottom: 16, justifyContent: 'center'},
  buttonLabel: {color: '#fff', fontSize: 7, textAlign: 'center'},
})
