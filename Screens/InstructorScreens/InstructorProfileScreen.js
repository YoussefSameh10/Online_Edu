import React from 'react'
import { View, Text, StyleSheet, Button, ScrollView } from 'react-native';
import ProfileAvatar from '../../Components/ProfileAvatar'
import Dialog from "react-native-dialog";
import { StackActions } from '@react-navigation/routers';
import { url } from '../../Constants/numbers';
import Toast from 'react-native-simple-toast';

export default class InstructorProfileScreen extends React.Component{
 
  state = {
    dialogVisibility: false,
    enableConfirm: false,
    instructorName: this.props.user.name,
    instructorCode: this.props.user.code,
    instructorEmail: this.props.user.email,
    instructorOldPassword: '',
    instructorNewPassword: '',
    instructorConfirmPassword: '',
  }

  handleInstructorOldPasswordUpdate = instructorOldPassword => {
    this.setState({instructorOldPassword}, this.validateForm)
  }

  handleInstructorNewPasswordUpdate = instructorNewPassword => {
    this.setState({instructorNewPassword}, this.validateForm)
  }

  handleInstructorConfirmPasswordUpdate = instructorConfirmPassword => {
    this.setState({instructorConfirmPassword}, this.validateForm)
  }

  validateForm = () => {
    if(this.state.instructorOldPassword.length > 0 &&
      this.state.instructorNewPassword.length > 0 && 
      this.state.instructorConfirmPassword.length > 0
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
    })

    try{
      const response = await fetch(`${url}/users/me`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + this.props.userToken,        
        },
        body: JSON.stringify({
          oldPassword: this.state.instructorOldPassword,
          password: this.state.instructorNewPassword,
          confirmPassword: this.state.instructorConfirmPassword,
        })
      })
      const result = await response.json()
      this.setState({
        instructorOldPassword: '',
        instructorNewPassword: '',
        instructorConfirmPassword: '',
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
    } catch(e){
      console.log(e.message)
    }
  }

  
  handleLogout = async() => {
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
      this.props.navigation.dispatch(StackActions.replace('loginNav'))
    }
  }

  render(){
    return(
      <View style={styles.container}>
        {/* <View style={styles.picture}>
          <ProfileAvatar size={'large'}/>
        </View> */}
        <View style={styles.row}>
          <Text style={styles.title}>Full Name</Text>
          <Text style={styles.text}>{this.state.instructorName}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.title}>Code</Text>
          <Text style={styles.text}>{this.state.instructorCode}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.title}>Email</Text>
          <Text style={styles.text}>{this.state.instructorEmail}</Text>
        </View>
        <Dialog.Container 
          visible={this.state.dialogVisibility}
          onBackdropPress={() => {this.setState({dialogVisibility: false})}}

        >
          <Dialog.Title>Change Password</Dialog.Title>
          <Dialog.Input 
            style={{borderBottomWidth: 1}}
            value={this.state.instructorOldPassword}
            onChangeText={this.handleInstructorOldPasswordUpdate}
            secureTextEntry={true}
            placeholder='Enter your old password'  
          />
          <Dialog.Input 
            style={{borderBottomWidth: 1}}
            value={this.state.instructorNewPassword}
            onChangeText={this.handleInstructorNewPasswordUpdate}
            secureTextEntry={true}
            placeholder='Enter your new password'  
          />
          
          <Dialog.Input 
            style={{borderBottomWidth: 1}}
            value={this.state.instructorConfirmPassword}
            onChangeText={this.handleInstructorConfirmPasswordUpdate}
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
          <View style={styles.button}>
            <Button 
              onPress={() => {this.setState({dialogVisibility: true})}}
              title='Change Password'
            />
          </View>
          <View style={styles.button}>
            <Button 
              onPress={this.handleLogout}
              title='Logout'
              //color={Colors.primary_color}  
            />
          </View>
          
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16, justifyContent: 'space-between',},
  picture: {marginBottom: 32},
  row: {flex: 1, flexDirection: 'column', marginBottom: 24, alignItems: 'flex-start', maxHeight: 50},
  title: {flex: 1, fontSize: 18, color: '#666', paddingLeft: 8,},
  text: {flex: 1,width: '100%', fontSize: 16, paddingLeft: 8},
  buttonsGroup: {alignItems: 'center', flex: 1, },
  button: {marginBottom: 16}
})
