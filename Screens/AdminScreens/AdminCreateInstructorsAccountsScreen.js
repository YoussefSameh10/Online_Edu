import React from 'react'
import { StyleSheet, View, Button, Text, TextInput, ScrollView, KeyboardAvoidingView } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'
import * as DocumentPicker from 'expo-document-picker'
import Toast from 'react-native-simple-toast';

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
    fullName: '',
    code: '',
    year: '',
    department: '',
    grade: '',
    email: '',
    file: {}
  }

  componentDidUpdate(prevProps, prevState){
    if(prevState.fullName !== this.state.fullName || 
      prevState.code !== this.state.code ||
      prevState.year !== this.state.year ||
      prevState.department !== this.state.department ||
      prevState.grade !== this.state.grade ||
      prevState.email !== this.state.email
    ){
      this.validateForm()
    }
  }

  validateForm = () => {
    if(this.state.fullName.length > 0 && 
      this.state.code.length > 0 && 
      this.state.grade.length > 0 && 
      this.state.email.length > 0 &&
      this.state.year !== '' &&
      (this.state.department !== '' || this.state.year === '0')
    ){
      this.setState({isFormValid: true})
    } else{
      this.setState({isFormValid: false})
    }
  }


  
  handlefullNameUpdate = fullName => {
    this.setState({fullName})
  }
  handleCodeUpdate = code => {
    this.setState({code})
  }
  
  handleYearUpdate =item => {
   this.setState({year: item.value})
  }
  handleGradeUpdate = grade => {
    this.setState({grade})
  }
  handleEmailUpdate = email => {
    this.setState({email})
  }

  render(){
    return(
      <KeyboardAvoidingView style={styles.container}>
        <ScrollView>
          <Text style={styles.title}>
            Create Single Account
          </Text>
          <TextInput 
              value={this.state.fullName}
              placeholder='Full Name'
              onChangeText={this.handlefullNameUpdate}
              style={styles.textInput}
            />
            <TextInput 
              value={this.state.code}
              placeholder='Code'
              onChangeText={this.handleCodeUpdate}
              style={styles.textInput}
            />
            <DropDownPicker
              items={[
                {label: 'Year 0', value: '0', },
                {label: 'Year 1', value: '1', },
                {label: 'Year 2', value: '2', },
                {label: 'Year 3', value: '3', },
                {label: 'Year 4', value: '4', },
              ]}
              placeholder='Year'
              value={this.state.year}
              onChangeItem={this.handleYearUpdate}
              containerStyle={styles.dropdownBox}
              placeholderStyle={styles.dropdownBoxPlaceholder}
            />
          <DropDownPicker
            items={[
              {label: 'Electrical', value: 'Electrical',},
              {label: 'Mechanical', value: 'Mechanical', },
              {label: 'Architecture', value: 'Architecture', },
              {label: 'Civil', value: 'Civil', },
              
            ]}
            placeholder='Department'
            value={this.state.year === '0' ? 'None' : this.state.department}
            onChangeItem={item => {this.setState({department: item.value})}}
            disabled={this.state.year === '0'}
            containerStyle={styles.dropdownBox}
            placeholderStyle={styles.dropdownBoxPlaceholder}
          />     
            <TextInput 
              value={this.state.grade}
              placeholder='Grade'
              onChangeText={this.handleGradeUpdate}
              style={styles.textInput}
            />
            <TextInput 
              value={this.state.email}
              placeholder='Email'
              onChangeText={this.handleEmailUpdate}
              style={styles.textInput}
            />
            <View style={styles.createButton}>
              <Button 
                title='Create'
                onPress={() => {}}
                disabled={!this.state.isFormValid}
              />
            </View>

            <Text style={styles.title}>
              OR Upload File
            </Text>
            <Button 
              title='Upload'
              onPress={() => {
                this.setState({file: upload()})
              }}
            />
            
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
  createButton: {marginTop: 20, marginBottom: 40, width: '30%', alignSelf: 'center', backgroundColor: '#0f0'},
})