import React from 'react'
import { StyleSheet, View, Button, Text, TextInput, ScrollView, KeyboardAvoidingView } from 'react-native'
import * as DocumentPicker from 'expo-document-picker'
import Toast from 'react-native-simple-toast';
import { url } from '../../Constants/numbers';
import Colors from '../../Constants/colors';

async function upload() {
  const file = await DocumentPicker.getDocumentAsync()
  Toast.show(`${file.type}`, Toast.LONG)
  if(file.type === 'success'){
    return file
  }
  else{
    return {}
  }
}

export default class AdminCreateAdminsAccountsScreen extends React.Component{

  state = {
    isFormValid: false,
    adminName: '',
    adminCode: '',
    adminEmail: '',
    file: {}
  }

  componentDidUpdate(prevProps, prevState){
    if(prevState.adminName !== this.state.adminName || 
      prevState.adminCode !== this.state.adminCode ||
      prevState.adminEmail !== this.state.adminEmail
    ){
      this.validateForm()
    }
  }

  validateForm = () => {
    if(this.state.adminName.length > 0 && 
      this.state.adminCode.length > 0 && 
      this.state.adminEmail.length > 0
    ){
      this.setState({isFormValid: true})
    } else{
      this.setState({isFormValid: false})
    }
  }


  
  handleAdminNameUpdate = adminName => {
    this.setState({adminName})
  }
  handleAdminCodeUpdate = adminCode => {
    this.setState({adminCode})
  }
  handleAdminEmailUpdate = adminEmail => {
    this.setState({adminEmail})
  }

  handleCreate = async() => {

    try{
      const response = await fetch(`${url}/users`,{
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: this.state.adminName,
          code: this.state.adminCode,
          email: this.state.adminEmail,
          password: this.state.adminCode,
          role: 'admin'
        })
      })

      if(response.status === 201){
        Toast.show('Admin Created Successfully')
      }
      else{
        Toast.show(`Can't Create Admin`)  
        const result = await response.json()
        Toast.show(result, Toast.LONG)  
      }
    } catch(e){
      console.log(e.message)
    }
  }

  render(){
    return(
      <KeyboardAvoidingView style={styles.container}>
        <ScrollView>
          <Text style={styles.title}>
            Create Single Account
          </Text>
          <TextInput 
              value={this.state.adminName}
              placeholder='Full Name'
              onChangeText={this.handleAdminNameUpdate}
              style={styles.textInput}
            />
            <TextInput 
              value={this.state.adminCode}
              placeholder='Code'
              onChangeText={this.handleAdminCodeUpdate}
              style={styles.textInput}
            />
            
            <TextInput 
              value={this.state.adminEmail}
              placeholder='Email'
              onChangeText={this.handleAdminEmailUpdate}
              style={styles.textInput}
            />
            <View style={styles.createButton}>
              <Button 
                title='Create'
                onPress={this.handleCreate}
                disabled={!this.state.isFormValid}
                // color={Colors.primary_color}
              />
            </View>

            <View style={styles.uploadButton}>
              <Button 
                title='Upload File'
                onPress={() => {
                  this.setState({file: upload()})
                }}
                color={Colors.primary_color}
              />
            </View>
            
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {margin: 16, marginTop: 30},
  title: {alignSelf: 'center', marginBottom: 20, fontSize: 20, fontWeight: 'bold'},
  textInput: {width: '100%', marginBottom: 16, paddingLeft: 8, fontSize: 16, backgroundColor: '#fff',},
  dropdownBox: {width: '100%', height: 30, marginBottom: 16,},
  dropdownBoxPlaceholder: {color: '#777'},
  createButton: {marginTop: 20, width: '25%', alignSelf: 'center',},
  uploadButton: {marginTop: 20, width: '40%', alignSelf: 'center',},

})