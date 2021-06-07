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

export default class AdminCreateStudentsAccountsScreen extends React.Component{

  state = {
    isFormValid: false,
    studentName: '',
    studentCode: '',
    studentYear: '',
    studentEmail: '',
    file: {}
  }

  componentDidUpdate(prevProps, prevState){
    if(prevState.studentName !== this.state.studentName || 
      prevState.studentCode !== this.state.studentCode ||
      prevState.studentYear !== this.state.studentYear ||
      prevState.studentEmail !== this.state.studentEmail
    ){
      this.validateForm()
    }
  }

  validateForm = () => {
    if(this.state.studentName.length > 0 && 
      this.state.studentCode.length > 0 && 
      this.state.studentEmail.length > 0 &&
      this.state.studentYear !== ''
    ){
      this.setState({isFormValid: true})
    } else{
      this.setState({isFormValid: false})
    }
  }


  
  handleStudentNameUpdate = studentName => {
    this.setState({studentName})
  }
  handleStudentCodeUpdate = studentCode => {
    this.setState({studentCode})
  }
  
  handleStudentYearUpdate =item => {
   this.setState({studentYear: item.value})
  }
  handleGradeUpdate = grade => {
    this.setState({grade})
  }
  handleStudentEmailUpdate = studentEmail => {
    this.setState({studentEmail})
  }

  handleCreate = async() => {

    try{
      const response = await fetch(`${url}/users`,{
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: this.state.studentName,
          code: this.state.studentCode,
          email: this.state.studentEmail,
          password: this.state.studentCode,
          year: this.state.studentYear,
          role: 'student'
        })
      })

      if(response.status === 201){
        Toast.show('Student Created Successfully')
      }
      else{
        Toast.show(`Can't Create Student`)  
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
              value={this.state.studentName}
              placeholder='Full Name'
              onChangeText={this.handleStudentNameUpdate}
              style={styles.textInput}
            />
            <TextInput 
              value={this.state.studentCode}
              placeholder='Code'
              onChangeText={this.handleStudentCodeUpdate}
              style={styles.textInput}
            />
            <DropDownPicker
              items={[
                {label: 'Year 1', value: 'first', },
                {label: 'Year 2', value: 'second', },
                {label: 'Year 3', value: 'third', },
                {label: 'Year 4', value: 'fourth', },
                {label: 'Year 5', value: 'fifth', },
              ]}
              placeholder='Year'
              value={this.state.studentYear}
              onChangeItem={this.handleStudentYearUpdate}
              containerStyle={styles.dropdownBox}
              placeholderStyle={styles.dropdownBoxPlaceholder}
            />
          
            <TextInput 
              value={this.state.studentEmail}
              placeholder='Email'
              onChangeText={this.handleStudentEmailUpdate}
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