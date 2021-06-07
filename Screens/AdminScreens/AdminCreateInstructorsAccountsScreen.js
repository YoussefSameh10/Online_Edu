import React from 'react'
import { StyleSheet, View, Button, Text, TextInput, ScrollView, KeyboardAvoidingView } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'
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

export default class AdminCreateInstructorsAccountsScreen extends React.Component{

  state = {
    isFormValid: false,
    instructorName: '',
    instructorCode: '',
    instructorEmail: '',
    file: {}
  }

  componentDidUpdate(prevProps, prevState){
    if(prevState.instructorName !== this.state.instructorName || 
      prevState.instructorCode !== this.state.instructorCode ||
      prevState.department !== this.state.department ||
      prevState.instructorEmail !== this.state.instructorEmail
    ){
      this.validateForm()
    }
  }

  validateForm = () => {
    if(this.state.instructorName.length > 0 && 
      this.state.instructorCode.length > 0 && 
      this.state.instructorEmail.length > 0 &&
      this.state.department !== ''
    ){
      this.setState({isFormValid: true})
    } else{
      this.setState({isFormValid: false})
    }
  }


  
  handleInstructorNameUpdate = instructorName => {
    this.setState({instructorName})
  }
  handleInstructorCodeUpdate = instructorCode => {
    this.setState({instructorCode})
  }
  
  handleDepartmentUpdate =item => {
   this.setState({department: item.value})
  }
  handleInstructorEmailUpdate = instructorEmail => {
    this.setState({instructorEmail})
  }

  handleCreate = async() => {

    try{
      const response = await fetch(`${url}/users`,{
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: this.state.instructorName,
          code: this.state.instructorCode,
          email: this.state.instructorEmail,
          password: this.state.instructorCode,
          role: 'instructor'
        })
      })

      if(response.status === 201){
        Toast.show('Instructor Created Successfully')
      }
      else{
        Toast.show(`Can't Create Instructor`)  
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
              value={this.state.instructorName}
              placeholder='Full Name'
              onChangeText={this.handleInstructorNameUpdate}
              style={styles.textInput}
            />
            <TextInput 
              value={this.state.instructorCode}
              placeholder='Code'
              onChangeText={this.handleInstructorCodeUpdate}
              style={styles.textInput}
            />   
            
            <TextInput 
              value={this.state.instructorEmail}
              placeholder='Email'
              onChangeText={this.handleInstructorEmailUpdate}
              style={styles.textInput}
            />
            <View style={styles.createButton}>
              <Button 
                title='Create'
                onPress={this.handleCreate}
                disabled={!this.state.isFormValid}
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
  container: {margin: 16},
  title: {alignSelf: 'center', marginBottom: 20, fontSize: 20, fontWeight: 'bold'},
  textInput: {width: '100%', marginBottom: 16, paddingLeft: 8, fontSize: 16, backgroundColor: '#fff',},
  dropdownBox: {width: '100%', height: 30, marginBottom: 16,},
  dropdownBoxPlaceholder: {color: '#777'},
  createButton: {marginTop: 20, width: '25%', alignSelf: 'center',},  
  uploadButton: {marginTop: 20, width: '40%', alignSelf: 'center',},
})