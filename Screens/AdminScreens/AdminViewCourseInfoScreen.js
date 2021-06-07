import React from 'react'
import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView} from 'react-native';
import { Icon } from 'react-native-elements'
import DropDownPicker from 'react-native-dropdown-picker';
import { url } from '../../Constants/numbers';
import Toast from 'react-native-simple-toast';
import Colors from '../../Constants/colors';



export default class AdminViewCourseInfoScreen extends React.Component{
 
  state = {
    isFormValid: true,
    editable: false,
    courseOldCode: this.props.route.params.userCode, 
    courseName: this.props.route.params.userName,
    courseCode: this.props.route.params.userCode,
    courseYear: this.props.route.params.userYear,
    instructorCode: '',
    score: '100',
  }

  componentDidUpdate(prevProps, prevState){
    if(prevState.courseName !== this.state.courseName || 
      prevState.courseCode !== this.state.courseCode ||
      prevState.courseYear !== this.state.courseYear ||
      prevState.score !== this.state.score 
    ){
      this.validateForm()
    }
  }

  validateForm = () => {
    if(this.state.courseName.length > 0 && 
      this.state.courseCode.length > 0 &&
      this.state.courseYear.length > 0 && 
      +this.state.score
    ){
      this.setState({isFormValid: true})
    } else{
      this.setState({isFormValid: false})
    }
  }


  makeEditable = () => {
    this.setState({editable: true})
  }
  makeIneditable = () => {
    this.setState({editable: false})
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
  handleScoreUpdate = score => {
    this.setState({score})
  }

  /*=============//modify backend in order to sent instructor code in stead of instructor id============*/
  handleSave = async() => {
    try{
      const response = await fetch(`${url}/admins/courses/update`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + this.props.route.params.userToken,        
        },
        body: JSON.stringify({
          old_code: this.state.courseOldCode,
          code: this.state.courseCode,
          name: this.state.courseName,
          year: this.state.courseYear,
          score: this.state.courseScore,
        })
      })

      if(response.status === 200){
        Toast.show('Course Updated Successfully')
        this.makeIneditable()
        this.props.route.params.refresh(this.state.courseYear)
        this.props.navigation.goBack()
      }
      else if(response.status === 404){
        Toast.show('Course Not Found')
      }
      else if(response.status === 403){
        Toast.show('Unauthorized Action')
      }
      else if(response.status === 400){
        Toast.show('Invalid Updates')
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
      <KeyboardAvoidingView 
        style={styles.container} 
        behavior='padding' 
        keyboardVerticalOffset={-100}
      >
        <ScrollView>
          
        <View>
            <TouchableOpacity
              onPress={() => {this.makeEditable()}}
              style={[styles.editIcon, {backgroundColor: this.state.editable ? '#aaa' : Colors.primary_color}]}
              disabled={this.state.editable}
            >
              <Icon 
                name='edit'
                color={'#fff'}  
              />
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <Text style={styles.title}>Course Name</Text>
            <TextInput 
              value={this.state.courseName}
              onChangeText={this.handleCourseNameUpdate}
              editable={this.state.editable}
              style={styles.text}
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.title}>Course Code</Text>
            <TextInput 
              value={this.state.courseCode}
              onChangeText={this.handleCourseCodeUpdate}
              editable={this.state.editable}
              style={styles.text}
            />
          </View>

          {/* <View style={styles.row}>
            <Text style={styles.title}>Instructor Code</Text>
            <TextInput 
              value={this.state.instructorCode}
              onChangeText={this.handleInstructorCodeUpdate}
              editable={this.state.editable}
              style={styles.text}
            />
          </View> */}

          <View style={styles.row}>
            <Text style={styles.title}>Year</Text>
            <DropDownPicker
              items={[
                {label: 'Year 1', value: 'first',},
                {label: 'Year 2', value: 'second', },
                {label: 'Year 3', value: 'third', },
                {label: 'Year 4', value: 'fourth', },
                {label: 'Year 5', value: 'fifth', },
              ]}
              defaultValue={this.state.courseYear}
              value={this.state.courseYear}
              onChangeItem={item => {this.setState({courseYear: item.value})}}
              disabled={!this.state.editable}
              containerStyle={styles.dropdownBox}
              labelStyle={styles.dropdownLabel}
            />
          </View>
          
          <View style={styles.row}>
            <Text style={styles.title}>Score</Text>
            <TextInput 
              value={this.state.score}
              editable={this.state.editable}
              onChangeText={this.handleScoreUpdate}
              style={styles.text}
            />
          </View>
          
          <View style={styles.saveButton}>
            <Button 
              title='Save'
              onPress={this.handleSave}
              disabled={!this.state.editable || !this.state.isFormValid}
            />
          </View>
          </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16,},
  picture: {marginBottom: 32},
  row: {flex: 1, flexDirection: 'column', marginBottom: 16, alignItems: 'flex-start',},
  title: {flex: 1, fontSize: 18, color: '#666', paddingLeft: 8, marginBottom: 4},
  text: {flex: 1,width: '90%', fontSize: 16, backgroundColor: '#fff',height: 35, borderRadius: 20, paddingLeft: 8},
  dropdownBox: {flex: 1, height: 30, width: '90%',},
  saveButton: {marginTop: 30, width: '30%', alignSelf: 'center', backgroundColor: '#0f0'},
  editIcon: {alignSelf: 'flex-end', marginTop: 8, borderRadius: 40, width: 30, height: 30, justifyContent: 'center'}
})