import React from 'react'
import { StyleSheet, View, Button, Text, TextInput, ScrollView, KeyboardAvoidingView } from 'react-native'



export default class AdminCreateAdminsAccountsScreen extends React.Component{

  state = {
    isFormValid: false,
    courseName: '',
    courseCode: '',
    instructorCode: ''
  }

  componentDidUpdate(prevProps, prevState){
    if(prevState.courseName !== this.state.courseName || 
      prevState.courseCode !== this.state.courseCode ||
      prevState.instructorCode !== this.state.instructorCode
    ){
      this.validateForm()
    }
  }

  validateForm = () => {
    if(this.state.courseName.length > 0 && 
      this.state.courseCode.length > 0 && 
      this.state.instructorCode.length > 0
    ){
      this.setState({isFormValid: true})
    } else{
      this.setState({isFormValid: false})
    }
  }


  
  handleCourseNameUpdate = courseName => {
    this.setState({courseName})
  }
  handleCourseCodeUpdate = courseCode => {
    this.setState({courseCode})
  }
  handleInstructorCodeUpdate = instructorCode => {
    this.setState({instructorCode})
  }

  render(){
    return(
      <KeyboardAvoidingView style={styles.container}>
        <ScrollView>
          <Text style={styles.title}>
            Create New Course
          </Text>
          <TextInput 
              value={this.state.courseName}
              placeholder='Course Name'
              onChangeText={this.handleCourseNameUpdate}
              style={styles.textInput}
            />
            <TextInput 
              value={this.state.courseCode}
              placeholder='Course Code'
              onChangeText={this.handleCourseCodeUpdate}
              style={styles.textInput}
            />
            
            <TextInput 
              value={this.state.instructorCode}
              placeholder='Instructor Code'
              onChangeText={this.handleInstructorCodeUpdate}
              style={styles.textInput}
            />
            <View style={styles.createButton}>
              <Button 
                title='Create'
                onPress={() => {}}
                disabled={!this.state.isFormValid}
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
  createButton: {marginTop: 20, marginBottom: 40, width: '30%', alignSelf: 'center', backgroundColor: '#0f0'},
})