import React from 'react'
import { StyleSheet, View, Button, Text, TextInput, ScrollView, KeyboardAvoidingView } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'
import Toast from 'react-native-simple-toast'
import { url } from '../../Constants/numbers'



export default class AdminCreateCoursesScreen extends React.Component{

  state = {
    isFormValid: false,
    courseName: '',
    courseCode: '',
    courseYear: '',
    courseScore: '',
    instructorCode: ''
  }

  componentDidUpdate(prevProps, prevState){
    if(prevState.courseName !== this.state.courseName || 
      prevState.courseCode !== this.state.courseCode ||
      prevState.courseYear !== this.state.courseYear ||
      prevState.courseScore !== this.state.courseScore ||
      prevState.instructorCode !== this.state.instructorCode
    ){
      this.validateForm()
    }
  }

  validateForm = () => {
    if(this.state.courseName.length > 0 && 
      this.state.courseCode.length > 0 && 
      +this.state.courseScore && 
      this.state.courseYear !== '' && 
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
  handleCourseYearUpdate = courseYear => {
    this.setState({courseYear})
  }
  handleCourseScoreUpdate = courseScore => {
    this.setState({courseScore})
  }
  handleInstructorCodeUpdate = instructorCode => {
    this.setState({instructorCode})
  }

  handleCreate = async() => {
    try{
      const response = await fetch(`${url}/admins/addCourse`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + this.props.userToken,        
        },
        body: JSON.stringify({
          code: this.state.courseCode,
          name: this.state.courseName,
          year: this.state.courseYear,
          score: this.state.courseScore,
          instructor_code: this.state.instructorCode,
        })
      })
      if(response.status === 201){
        Toast.show('Course Created Successfully')
        this.enrollCourseToYear()
      }
      if(response.status === 404){
        Toast.show('Instructor Not Found')
      }
      else if(response.status === 403){
        Toast.show('Unauthorized action')
      }
      else if(response.status === 500){
        Toast.show('Server Error')
      }
    } catch(e){
      console.log(e.message)
    }  }

  enrollCourseToYear = async() => {
    try{
      const response = await fetch(`${url}/admins/enrollMultiple`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + this.props.userToken,        
        },
        body: JSON.stringify({
          course_code: this.state.courseCode,
          year: this.state.courseYear,
        })
      })
      if(response.status === 201){
        Toast.show('Course Added Successfully')
      }
      if(response.status === 404){
        Toast.show('There are no students in this year')
      }
      else if(response.status === 403){
        Toast.show('Unauthorized action')
      }
      else if(response.status === 500){
        Toast.show('Server Error')
      }
    } catch(e){
      console.log(e.message)
    }
  }

  render(){
    return(
      <KeyboardAvoidingView style={styles.container}>
        <ScrollView >
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
            value={this.state.courseScore}
            placeholder='Course Score'
            onChangeText={this.handleCourseScoreUpdate}
            style={styles.textInput}
          />
          
          <TextInput 
            value={this.state.instructorCode}
            placeholder='Instructor Code'
            onChangeText={this.handleInstructorCodeUpdate}
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
            value={this.state.courseYear}
            onChangeItem={item => this.handleCourseYearUpdate(item.value)}
            containerStyle={styles.dropdownBox}
            placeholderStyle={styles.dropdownBoxPlaceholder}
            dropDownStyle={styles.dropdownMenu}
            
          />

          <View style={styles.createButton}>
            <Button 
              title='Create'
              onPress={this.handleCreate}
              disabled={!this.state.isFormValid}
            />
          </View>           
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {flex: 1, margin: 16},
  title: {alignSelf: 'center', marginBottom: 20, fontSize: 20, fontWeight: 'bold'},
  textInput: {width: '100%', marginBottom: 16, paddingLeft: 8, fontSize: 16, backgroundColor: '#fff',},
  dropdownBox: {width: '100%', height: 30, marginBottom: 16,},
  dropdownMenu: {height: 100,},
  dropdownBoxPlaceholder: {color: '#777'},
  createButton: {marginTop: 20, marginBottom: 40, width: '30%', alignSelf: 'center', backgroundColor: '#0f0'},
})