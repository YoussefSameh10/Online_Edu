import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native';
import ProfileAvatar from '../../Components/ProfileAvatar'
import Dialog from "react-native-dialog";
import { StackActions } from '@react-navigation/routers'
import Toast from 'react-native-simple-toast';
import { url } from '../../Constants/numbers';


export default class StudentProfileScreen extends React.Component{
 
  state = {
    dialogVisibility: false,
    studentName: this.props.user.name,
    studentCode: this.props.user.code,
    studentEmail: this.props.user.email,
    studentYear: this.props.user.year,
    studentPassword: '',
    studentConfirmPassword: '',
  }

  handleStudentPasswordUpdate = studentPassword => {
    this.setState({studentPassword}, this.validateForm)
  }

  handleStudentConfirmPasswordUpdate = studentConfirmPassword => {
    this.setState({studentConfirmPassword}, this.validateForm)
  }

  validateForm = () => {
    if(this.state.studentPassword.length > 0 && 
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
      studentPassword: '',
      studentConfirmPassword: '',
    })

    try{
      const response = await fetch(`${url}/users/me`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + this.props.userToken,        
        },
        body: JSON.stringify({
          password: this.state.studentPassword,
          confirmPassword: this.state.studentConfirmPassword,
        })
      })

      console.log(response)
      if(response.status === 400){
        Toast.show(`Passwords Don't Match`)
      }
      else if(response.status === 500){
        Toast.show('This Is Invalid Password')
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
          <Text style={styles.text}>{this.state.studentName}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.title}>Code</Text>
          <Text style={styles.text}>{this.state.studentCode}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.title}>Year</Text>
          <Text style={styles.text}>{this.state.studentYear}</Text>
        </View>
        {/* <View style={styles.row}>
          <Text style={styles.title}>Grade:</Text>
          <Text style={styles.text}>Good</Text>
        </View> */}
        <View style={styles.row}>
          <Text style={styles.title}>Email</Text>
          <Text style={styles.text}>{this.state.studentEmail}</Text>
        </View>
        <Dialog.Container visible={this.state.dialogVisibility}>
          <Dialog.Title>Change Password</Dialog.Title>
          
          <Dialog.Input 
            style={{borderBottomWidth: 1}}
            value={this.state.studentPassword}
            onChangeText={this.handleStudentPasswordUpdate}
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
  container: {flex: 1, padding: 16,},
  picture: {marginBottom: 32},
  row: {flex: 1, flexDirection: 'column', marginBottom: 24, alignItems: 'flex-start', maxHeight: 50},
  title: {flex: 1, fontSize: 18, color: '#666', paddingLeft: 8,},
  text: {flex: 1,width: '100%', fontSize: 16, paddingLeft: 8},
  buttonsGroup: {alignItems: 'center', flex: 1, },
  button: {marginBottom: 16}
})
