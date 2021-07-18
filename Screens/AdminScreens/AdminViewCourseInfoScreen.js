import React from 'react'
import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView, FlatList} from 'react-native';
import { Icon } from 'react-native-elements'
import DropDownPicker from 'react-native-dropdown-picker';
import Dialog from "react-native-dialog";
import { url } from '../../Constants/numbers';
import Toast from 'react-native-simple-toast';
import Colors from '../../Constants/colors';
import { compareByStudentName } from '../../Constants/Functions';



export default class AdminViewCourseInfoScreen extends React.Component{
 
  state = {
    isFormValid: true,
    editable: false,
    courseOldCode: this.props.route.params.userCode, 
    courseName: this.props.route.params.userName,
    courseCode: this.props.route.params.userCode,
    courseYear: this.props.route.params.userYear,
    courseID: this.props.route.params.userID,
    instructorCode: '',
    courseScore: this.props.route.params.userScore,
    courseStudents: [],
    deleteDialogVisibility: false,
    codeToBeDeleted: -1,
    studentNameToBeDeleted: '',
    studentIdToBeDeleted: -1,
  }

  componentDidMount(){
    this.getStudents()
  }

  componentDidUpdate(prevProps, prevState){
    if(prevState.courseName !== this.state.courseName || 
      prevState.courseCode !== this.state.courseCode ||
      prevState.courseYear !== this.state.courseYear ||
      prevState.courseScore !== this.state.courseScore 
    ){
      this.validateForm()
    }
  }

  validateForm = () => {
    if(this.state.courseName.length > 0 && 
      this.state.courseCode.length > 0 &&
      +this.state.courseScore
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
  handleCourseScoreUpdate = courseScore => {
    this.setState({courseScore})
  }

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
      const result = await response.json()
      console.log(response)
      if(response.status === 200){
        Toast.show('Course updated successfully')
        this.makeIneditable()
        this.props.route.params.refresh(this.state.courseYear)
        this.props.navigation.goBack()
      }
      else if(response.status === 500){
        if(result.search('code')!==-1){
          Toast.show('This code is taken by another course')
        }
        else{
          Toast.show(result)
        }
      }
      else{
        Toast.show(result)
      }

    } catch(e){
      console.log(e.message)
    }
  }

  getStudents = async() => {
    try{
      const response = await fetch(`${url}/admins/courses/course/students/${this.state.courseCode}`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + this.props.route.params.userToken,        
        },
      })

      const result = await response.json()
      if(response.status === 200){
        this.setState({courseStudents: [...result.sort(compareByStudentName)]})
      }
      else if(response.status === 500){
        Toast.show(result)
      }
      else{
        Toast.show(result)
      }
      
    } catch(e){
      console.log(e.message)
    }
  }

  handleCancel = () => {
    this.setState({deleteDialogVisibility: false})
  };

  handleDelete = async() => {
    this.setState({deleteDialogVisibility: false})
    
    try{
      const response = await fetch(`${url}/admins/students/deleteEnroll`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + this.props.route.params.userToken,        
        },
        body: JSON.stringify({
          course_id: this.state.courseID,
          user_id: this.state.studentIdToBeDeleted
        })
      })

      const result = await response.json()
      if(response.status === 200){
        this.setState({courseStudents: [...this.state.courseStudents.filter(student => student.studentCode !== this.state.codeToBeDeleted)]})
      }
      else if(response.status === 500){
        Toast.show(result)
      }
      else{
        Toast.show(result)
      }
    } catch(e){
      console.log(e.message)
    }
  }


  renderItem = ({item, index}) => (
    <View style={index%2 === 0 ? styles.evenStudentRow : styles.oddStudentRow}>
      <Text style={styles.studentName}>{item.studentName}</Text>
      <Text style={styles.studentCode}>{item.studentCode}</Text>
      <TouchableOpacity 
        onPress={() => {
          this.setState({
            deleteDialogVisibility: true, 
            codeToBeDeleted: item.studentCode,
            studentNameToBeDeleted: item.studentName,
            studentIdToBeDeleted: item.studentID
          })
        }}
      >
        <Icon 
          name='trash-alt'
          type='font-awesome-5' 
        />
    </TouchableOpacity>
    </View>
  )

  render(){

    return(
      <KeyboardAvoidingView 
        style={styles.container} 
        behavior='height' 
        keyboardVerticalOffset={-100}
      >
        <View style={styles.info}>  
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
              value={String(this.state.courseScore)}
              editable={this.state.editable}
              onChangeText={this.handleCourseScoreUpdate}
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
        </View>
        <Dialog.Container visible={this.state.deleteDialogVisibility}>
          <Dialog.Title>Delete</Dialog.Title>
          <Dialog.Description>
            {`Are you sure you want to remove ${this.state.studentNameToBeDeleted} from the course ${this.state.courseName}? You cannot undo this action.`}
          </Dialog.Description>
          <Dialog.Button 
            label="Cancel" 
            onPress={this.handleCancel} 
            style={styles.dialogCancelButton}
          />
          <Dialog.Button 
            label="Delete" 
            onPress={this.handleDelete} 
            style={styles.dialogDeleteButton}
          />
        </Dialog.Container>

        <View style={styles.student}>
          <Text style={styles.title}>Students</Text>
        </View>

        <FlatList
          data={this.state.courseStudents}
          renderItem={this.renderItem}
          keyExtractor={item => item.id}
          style={styles.studentsList}
        />
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16,},
  info: {height: '65%', marginBottom: 16, justifyContent: 'flex-start'},
  picture: {marginBottom: 32},
  row: {flex: 1, flexDirection: 'column', maxHeight: 74, marginBottom: 16, alignItems: 'flex-start',},
  course: {height: 30, alignItems: 'flex-start'},
  title: {flex: 1, fontSize: 18, color: '#666', paddingLeft: 8, maxHeight: 35, marginBottom: 4,},
  text: {flex: 1,width: '90%', fontSize: 16, backgroundColor: '#fff', maxHeight: 35, borderRadius: 20, paddingLeft: 8},
  dropdownBox: {flex: 1, height: 30, width: '90%',},
  saveButton: {marginTop: 30, width: '30%', alignSelf: 'center', backgroundColor: '#0f0'},
  editIcon: {alignSelf: 'flex-end', marginTop: 8, backgroundColor: Colors.primary_color, borderRadius: 40, width: 30, height: 30, justifyContent: 'center'},
  studentsList: {paddingLeft: 8},
  evenStudentRow: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', minHeight: 40, backgroundColor: '#eef'},
  oddStudentRow: {flexDirection: 'row', justifyContent: 'space-between',  alignItems: 'center', minHeight: 40, backgroundColor: '#fff'},
  studentName: {fontSize: 18, flex: 1, padding: 4, minWidth: '33%',},
  studentCode: {fontSize: 18, flex: 0.5, padding: 4, minWidth: '33%',},
  dialogDeleteButton: {color: 'red'},
  dialogCancelButton: {color: Colors.primary_color},

})