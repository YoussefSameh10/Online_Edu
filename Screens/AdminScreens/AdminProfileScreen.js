import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native';
import ProfileAvatar from '../../Components/ProfileAvatar'
import Colors from '../../Constants/colors';
import Dialog from "react-native-dialog";
import { StackActions } from '@react-navigation/routers'
import { url } from '../../Constants/numbers';
import { invokeBackBehaviour } from '../../Constants/Functions';
import Toast from 'react-native-simple-toast';
import { BackHandler } from 'react-native';


export default class AdminProfileScreen extends React.Component{
 
  state = {
    dialogVisibility: false,
    adminName: this.props.user.name,
    adminCode: this.props.user.code,
    adminEmail: this.props.user.email,
    adminOldPassword: '',
    adminNewPassword: '',
    adminConfirmPassword: '',
  }

  handleAdminOldPasswordUpdate = adminOldPassword => {
    this.setState({adminOldPassword}, this.validateForm)
  }

  handleAdminNewPasswordUpdate = adminNewPassword => {
    this.setState({adminNewPassword}, this.validateForm)
  }

  handleAdminConfirmPasswordUpdate = adminConfirmPassword => {
    this.setState({adminConfirmPassword}, this.validateForm)
  }

  validateForm = () => {
    if(this.state.adminOldPassword.length > 0 &&
      this.state.adminNewPassword.length > 0 && 
      this.state.adminConfirmPassword.length > 0
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
          oldPassword: this.state.adminOldPassword,
          password: this.state.adminNewPassword,
          confirmPassword: this.state.adminConfirmPassword,
        })
      })
      const result = await response.json()
      this.setState({
        adminOldPassword: '',
        adminNewPassword: '',
        adminConfirmPassword: '',
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
          <Text style={styles.text}>{this.state.adminName}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.title}>Code</Text>
          <Text style={styles.text}>{this.state.adminCode}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.title}>Email</Text>
          <Text style={styles.text}>{this.state.adminEmail}</Text>
        </View>
        <Dialog.Container 
          visible={this.state.dialogVisibility}
          onBackdropPress={() => {this.setState({dialogVisibility: false})}}
        >
          <Dialog.Title>Change Password</Dialog.Title>
          
          <Dialog.Input 
            style={{borderBottomWidth: 1}}
            value={this.state.adminOldPassword}
            onChangeText={this.handleAdminOldPasswordUpdate}
            secureTextEntry={true}
            placeholder='Enter your old password'  
          />

          <Dialog.Input 
            style={{borderBottomWidth: 1}}
            value={this.state.adminNewPassword}
            onChangeText={this.handleAdminNewPasswordUpdate}
            secureTextEntry={true}
            placeholder='Enter your new password'  
          />
          
          <Dialog.Input 
            style={{borderBottomWidth: 1}}
            value={this.state.adminConfirmPassword}
            onChangeText={this.handleAdminConfirmPasswordUpdate}
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